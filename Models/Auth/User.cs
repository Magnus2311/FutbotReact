using System;
using System.Collections.Generic;
using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;

namespace FutbotReact.Models.Auth
{
    public class User
    {
        [BsonId]
        [BsonRepresentation(BsonType.ObjectId)]
        public string Id { get; set; }
        [BsonElement("username")]
        public string Username { get; set; }
        [BsonElement("password")]
        public string Password { get; set; }
        [BsonElement("isConfirmed")]
        public bool IsConfirmed { get; set; }
        [BsonElement("createdDate")]
        public DateTime CreatedDate { get; set; }
        [BsonElement("eaAccounts")]
        public List<EaAccount> EaAccounts { get; set; } = new List<EaAccount>();
        [BsonElement("refreshToken")]
        public List<string> RefreshTokens { get; set; } = new List<string>();
        [BsonElement("roles")]
        public List<string> Roles { get; set; } = new List<string>();
    }
}