using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;

namespace FutbotReact.Models.DTOs
{
    public class Player
    {
        [BsonId]
        [BsonRepresentation(BsonType.ObjectId)]
        public string Id { get; set; }
        [BsonElement("name")]
        public string Name { get; set; }
        [BsonElement("rating")]
        public int Rating { get; set; }
    }
}