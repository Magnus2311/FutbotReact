using System;
using System.Text.Json.Serialization;

namespace FutbotReact.Models.Auth
{
    internal class LoginToken
    {
        [JsonPropertyName("access_token")]
        public string AccessToken { get; set; }
        [JsonPropertyName("expires_in")]
        public DateTime ExpiresIn { get; set; }
        [JsonPropertyName("refresh_token")]
        public string RefreshToken { get; set; }
    }

}