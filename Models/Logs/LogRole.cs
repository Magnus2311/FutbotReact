using System;
using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;

namespace FutbotReact.Models.Logs
{
    public class LogRole
    {
        [BsonId]
        [BsonRepresentation(BsonType.ObjectId)]
        public string Id { get; set; }
        [BsonElement("username")]
        public string Username { get; set; }
        [BsonElement("date")]
        public DateTime Date { get; set; } = DateTime.Now;
        [BsonElement("roleName")]
        public string RoleName { get; set; }
        [BsonElement("information")]
        public string Information { get; set; }
        [BsonElement("ip")]
        public string IP { get; set; }
    }
}