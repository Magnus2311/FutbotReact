using System;
using System.Collections.Generic;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Security.Cryptography;
using System.Text;
using System.Threading.Tasks;
using FutbotReact.Helpers.Extensions;
using FutbotReact.Models.Auth;
using FutbotReact.Services.DbServices;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;
using Microsoft.IdentityModel.Tokens;

namespace FutbotReact.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class UsersController : ControllerBase
    {
        private readonly UsersDbService _dbService;
        private readonly LoggerDbService _logger;
        private readonly IConfiguration _configuration;

        public UsersController(UsersDbService dbService,
            LoggerDbService logger,
            IConfiguration configuration)
        {
            _dbService = dbService;
            _logger = logger;
            _configuration = configuration;
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
                var token = user.GenerateJwtToken(_configuration);
                var refreshToken = CreateRefreshToken();
                user.RefreshToken = refreshToken;
                await _dbService.UpdateRefreshToken(user);
                SetRefreshTokenInCookie(refreshToken);

                return Ok(new LoginToken
                {
                    AccessToken = new JwtSecurityTokenHandler().WriteToken(token),
                    ExpiresIn = token.ValidTo
                });
            }
            return Unauthorized();
        }

        [HttpGet("getToken")]
        public async Task<Authentication> GetTokenAsync(User model)
        {
            var authenticationModel = new Authentication();
            var user = await _dbService.FindByUsernameAsync(model.Username);
            if (user == null)
            {
                authenticationModel.IsAuthenticated = false;
                authenticationModel.Message = $"No Accounts Registered with {model.Username}.";
                return authenticationModel;
            }
            if (await _dbService.Login(model))
            {
                authenticationModel.IsAuthenticated = true;
                JwtSecurityToken jwtSecurityToken = user.GenerateJwtToken(_configuration);
                authenticationModel.Token = new JwtSecurityTokenHandler().WriteToken(jwtSecurityToken);
                authenticationModel.Username = user.Username;

                if (user.RefreshToken.IsActive)
                {
                    var activeRefreshToken = user.RefreshToken;
                    authenticationModel.RefreshToken = activeRefreshToken.Token;
                    authenticationModel.RefreshTokenExpiration = activeRefreshToken.Expires;
                }
                else
                {
                    var refreshToken = CreateRefreshToken();
                    authenticationModel.RefreshToken = refreshToken.Token;
                    authenticationModel.RefreshTokenExpiration = refreshToken.Expires;
                    user.RefreshToken = refreshToken;
                    await _dbService.UpdateRefreshToken(user);
                }
                return authenticationModel;
            }
            authenticationModel.IsAuthenticated = false;
            authenticationModel.Message = $"Incorrect Credentials for user {user.Username}.";
            return authenticationModel;
        }

        private RefreshToken CreateRefreshToken()
        {
            var randomNumber = new byte[32];
            using (var generator = new RNGCryptoServiceProvider())
            {
                generator.GetBytes(randomNumber);
                return new RefreshToken
                {
                    Token = Convert.ToBase64String(randomNumber),
                    Expires = DateTime.UtcNow.AddMonths(1),
                    Created = DateTime.UtcNow
                };
            }
        }

        private void SetRefreshTokenInCookie(RefreshToken refreshToken)
        {
            var cookieOptions = new CookieOptions
            {
                HttpOnly = true,
                Expires = refreshToken.Expires,
            };
            Response.Cookies.Append("refresh_token", refreshToken.Token, cookieOptions);
        }
    }
}
