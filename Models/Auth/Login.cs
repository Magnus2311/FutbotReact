using System;
using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;

namespace FutbotReact.Models.Auth
{
    public class Login
    {
        public Login(User user)
        {
            Date = DateTime.Now;
        }

        public Login(User user, bool isSuccessful)
            : this(user)
        {
            IsSuccessful = isSuccessful;
        }

        [BsonId]
        [BsonRepresentation(BsonType.ObjectId)]
        public string Id { get; set; }
        [BsonElement("userId")]
        public string UserId { get; set; }
        [BsonElement("date")]
        public DateTime Date { get; set; }
        [BsonElement("isSuccessful")]
        public bool IsSuccessful { get; set; }
    }
}