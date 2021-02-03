using System;
using System.Linq;
using System.Threading.Tasks;
using FutbotReact.Helpers.Attributes;
using FutbotReact.Helpers.Extensions;
using FutbotReact.Models.Auth;
using FutbotReact.Services.DbServices;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace FutbotReact.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class UsersController : ControllerBase
    {
        private readonly UsersDbService _dbService;
        private readonly LoggerDbService _logger;

        public UsersController(UsersDbService dbService,
            LoggerDbService logger)
        {
            _dbService = dbService;
            _logger = logger;
        }

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
                var token = user.GenerateJwtToken();
                var refreshToken = user.GenerateJwtToken(true);
                user.RefreshTokens.Add(refreshToken);
                await _dbService.UpdateRefreshToken(user);
                SetRefreshTokenInCookie(refreshToken);

                return Ok(new AuthenticateResponse(user, token.ToString()));
            }
            return Unauthorized();
        }

        [HttpGet("getUsername")]
        [Authorize]
        public IActionResult GetUserName() => Ok(HttpContext.Items["User"] as User);

        [HttpGet("getAll")]
        [Authorize]
        public async Task<IActionResult> GetAll() => Ok(await _dbService.GetAll());

        [HttpPost("logout")]
        [Authorize]
        public async Task<IActionResult> Logout()
        {
            var user = HttpContext.Items["User"] as User;
            var refreshToken = HttpContext.Request.Cookies.FirstOrDefault(c => c.Key == "refresh_token").Value;
            user.RefreshTokens.Remove(refreshToken);
            await _dbService.UpdateRefreshToken(user);
            HttpContext.Response.Cookies.Delete("access_token");
            HttpContext.Response.Cookies.Delete("refresh_token");
            return Ok();
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
    }
}
