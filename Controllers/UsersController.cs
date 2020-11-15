using System;
using System.IdentityModel.Tokens.Jwt;
using System.Linq;
using System.Security.Cryptography;
using System.Security.Principal;
using System.Text;
using System.Threading.Tasks;
using FutbotReact.Helpers;
using FutbotReact.Helpers.Extensions;
using FutbotReact.Models.Auth;
using FutbotReact.Services.DbServices;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Options;
using Microsoft.IdentityModel.Tokens;

namespace FutbotReact.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class UsersController : ControllerBase
    {
        private readonly UsersDbService _dbService;
        private readonly LoggerDbService _logger;
        private readonly AppSettings _appSettings;

        public UsersController(UsersDbService dbService,
            LoggerDbService logger,
            IOptions<AppSettings> appSettings)
        {
            _dbService = dbService;
            _logger = logger;
            _appSettings = appSettings.Value;
        }

        public string Get() => "Opa opa";

        [HttpPost("add")]
        public async Task Add(User user)
            => await _dbService.Add(user);

        [HttpDelete("delete")]
        public async Task Delete(string username)
            => await _dbService.Delete(username);

        [HttpPost("login")]
        public async Task<IActionResult> Login(User user)
        {
            var isSuccessful = await _dbService.Login(user);
            if (isSuccessful)
            {
                var token = user.GenerateJwtToken(_appSettings);
                var refreshToken = user.GenerateJwtToken(_appSettings, true);
                user.RefreshTokens.Add(refreshToken);
                await _dbService.UpdateRefreshToken(user);
                SetRefreshTokenInCookie(refreshToken);

                return Ok(new AuthenticateResponse(user, token.ToString()));
            }
            return Unauthorized();
        }

        [HttpGet("getAccessToken")]
        public async Task<IActionResult> GetAccessToken()
        {
            HttpContext.Request.Cookies.TryGetValue("refresh_token", out string tokenStr);
            ValidateToken(tokenStr);
            var handler = new JwtSecurityTokenHandler();
            var newToken = tokenStr.Replace("\\", "");
            var jsonToken = new System.IdentityModel.Tokens.Jwt.JwtSecurityToken(newToken);
            var tokenS = handler.ReadToken(tokenStr) as JwtSecurityToken;
            var username = tokenS.Claims.FirstOrDefault(claim => claim.Type == "name").Value;
            var user = await _dbService.FindByUsernameAsync(username);
            var token = user.GenerateJwtToken(_appSettings);
            return Ok(new AuthenticateResponse(user, token));
        }

        private static RefreshToken CreateRefreshToken(string username)
        {
            var randomNumber = new byte[32];
            using var generator = new RNGCryptoServiceProvider();
            generator.GetBytes(randomNumber);
            return new RefreshToken
            {
                Token = Convert.ToBase64String(randomNumber),
                Expires = DateTime.UtcNow.AddMonths(1),
                Created = DateTime.UtcNow,
                Username = username
            };
        }

        private void SetRefreshTokenInCookie(string refreshToken)
        {
            var cookieOptions = new CookieOptions
            {
                HttpOnly = true,
                Expires = DateTime.Now.AddYears(1),
            };
            Response.Cookies.Append("refresh_token", refreshToken, cookieOptions);
        }

        private bool ValidateToken(string authToken)
        {
            var tokenHandler = new JwtSecurityTokenHandler();
            var validationParameters = GetValidationParameters();

            SecurityToken validatedToken;
            IPrincipal principal = tokenHandler.ValidateToken(authToken, validationParameters, out validatedToken);
            return true;
        }

        private TokenValidationParameters GetValidationParameters()
        {
            return new TokenValidationParameters()
            {
                ValidateLifetime = true, 
                ValidateAudience = true,
                ValidateIssuer = true,   
                ValidIssuer = _appSettings.ValidIssuer,
                ValidAudience = _appSettings.ValidAudience,
                IssuerSigningKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(_appSettings.Secret)) // The same key as the one that generate the token
            };
        }
    }
}
