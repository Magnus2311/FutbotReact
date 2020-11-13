using System;
using System.Collections.Generic;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;
using FutbotReact.Models.Auth;
using Microsoft.IdentityModel.Tokens;

namespace FutbotReact.Helpers.Extensions
{
    public static class UsersExtensions
    {
        public static JwtSecurityToken GenerateJwtToken(this User user, AppSettings appSettings)
        {
            var authClaims = new List<Claim>
                {
                    new Claim(ClaimTypes.Name, user.Username),
                    new Claim(JwtRegisteredClaimNames.Jti, Guid.NewGuid().ToString()),
                };

            var authSigningKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(appSettings.Secret));

            return new JwtSecurityToken(
                issuer: appSettings.ValidIssuer,
                audience: appSettings.ValidAudience,
                expires: DateTime.Now.AddHours(1),
                claims: authClaims,
                signingCredentials: new SigningCredentials(authSigningKey, SecurityAlgorithms.HmacSha256)
                );
        }

        public static JwtSecurityToken GenerateRefreshToken(this User user, AppSettings appSettings)
        {
            var authClaims = new List<Claim>
                {
                    new Claim(ClaimTypes.Name, user.Username),
                    new Claim(JwtRegisteredClaimNames.Jti, Guid.NewGuid().ToString()),
                };

            var authSigningKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(appSettings.Secret));

            return new JwtSecurityToken(
                issuer: appSettings.ValidIssuer,
                audience: appSettings.ValidAudience,
                expires: DateTime.Now.AddYears(1),
                claims: authClaims,
                signingCredentials: new SigningCredentials(authSigningKey, SecurityAlgorithms.HmacSha256)
                );
        }
    }
}