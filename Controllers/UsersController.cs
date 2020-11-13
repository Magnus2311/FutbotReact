using System;
using System.IdentityModel.Tokens.Jwt;
using System.Linq;
using System.Security.Cryptography;
using System.Text.Json;
using System.Text.Json.Serialization;
using System.Text.RegularExpressions;
using System.Threading.Tasks;
using FutbotReact.Helpers;
using FutbotReact.Helpers.Extensions;
using FutbotReact.Models.Auth;
using FutbotReact.Services.DbServices;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.Options;

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
                var refreshToken = user.GenerateRefreshToken(_appSettings);
                user.RefreshTokens.Add(refreshToken);
                await _dbService.UpdateRefreshToken(user);
                SetRefreshTokenInCookie(refreshToken);

                return Ok(new AuthenticateResponse(user, token.ToString()));
            }
            return Unauthorized();
        }

        [HttpGet("getAccessToken")]
        [Authorize]
        public async Task<IActionResult> GetAccessToken()
        {
            HttpContext.Request.Cookies.TryGetValue("refresh_token", out string token);
            var handler = new JwtSecurityTokenHandler();
            var newToken = token.Replace("\\", "");
            var jsonToken = new System.IdentityModel.Tokens.Jwt.JwtSecurityToken(newToken);
            var tokenS = handler.ReadToken(token) as JwtSecurityToken;
            var username = tokenS.Claims.FirstOrDefault(claim => claim.Type == "name").Value;
            return Ok();
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

        private void SetRefreshTokenInCookie(JwtSecurityToken refreshToken)
        {
            var cookieOptions = new CookieOptions
            {
                HttpOnly = true,
                Expires = refreshToken.ValidTo,
            };
            Response.Cookies.Append("refresh_token", refreshToken.ToString(), cookieOptions);
        }
    }
}
