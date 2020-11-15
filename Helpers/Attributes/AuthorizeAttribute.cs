using System;
using System.Diagnostics;
using System.IdentityModel.Tokens.Jwt;
using System.Linq;
using System.Security.Principal;
using System.Text;
using System.Threading.Tasks;
using FutbotReact.Helpers.Extensions;
using FutbotReact.Services.DbServices;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.Filters;
using Microsoft.IdentityModel.Tokens;

namespace FutbotReact.Helpers.Attributes
{
    [AttributeUsage(AttributeTargets.Class | AttributeTargets.Method)]
    public class AuthorizeAttribute : Attribute, IAuthorizationFilter
    {
        private readonly UsersDbService _dbService;
        private AuthorizationFilterContext _context;
        private string accessSecToken;

        public AuthorizeAttribute()
        {
            _dbService = new UsersDbService();
        }

        public async void OnAuthorization(AuthorizationFilterContext context)
        {
            _context = context;
            context.HttpContext.Request.Cookies.TryGetValue("access_token", out string accessToken);
            if (accessToken != null && ValidateToken(accessToken))
                return;

            context.HttpContext.Request.Cookies.TryGetValue("refresh_token", out string token);
            if (ValidateToken(token))
            {
                var handler = new JwtSecurityTokenHandler();
                var username = (handler.ReadToken(token) as JwtSecurityToken).Claims.FirstOrDefault(claim => claim.Type == "name").Value;
                var user = await _dbService.FindByUsernameAsync(username);
                if (user.RefreshTokens.Any(rt => rt == token))
                {
                    var jwtToken = user.GenerateJwtToken();
                    accessSecToken = user.GenerateJwtToken();
                    context.HttpContext.Response.OnStarting(OnStartingCallback);
                    return;
                }
            }

            context.Result = new JsonResult(new { message = "Unauthorized" }) { StatusCode = StatusCodes.Status401Unauthorized };
        }

        private Task OnStartingCallback()
        {
            var cookieOptions = new CookieOptions()
            {
                Expires = DateTimeOffset.UtcNow.AddHours(1)
            };
            _context.HttpContext.Response.Cookies.Append("access_token", accessSecToken, cookieOptions);
            return Task.FromResult(0);
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
                ValidIssuer = AppSettings.ValidIssuer,
                ValidAudience = AppSettings.ValidAudience,
                IssuerSigningKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(AppSettings.Secret)) // The same key as the one that generate the token
            };
        }
        private void SetAccessToken(string accessToken, AuthorizationFilterContext context)
        {
            var cookieOptions = new CookieOptions
            {
                Expires = DateTime.Now.AddHours(1),
            };
            context.HttpContext.Response.Cookies.Append("access_token", accessToken, cookieOptions);
        }
    }
}