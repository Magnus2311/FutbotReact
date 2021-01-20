using System;
using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;

namespace FutbotReact.Models.Auth
{
    public class ScheduledStart
    {
        [BsonId]
        [BsonRepresentation(BsonType.ObjectId)]
        public string Id { get; set; }
        [BsonElement("information")]
        public string Information { get; set; }
        [BsonElement("date")]
        public DateTime Date { get; set; } = DateTime.Now;
    }
}