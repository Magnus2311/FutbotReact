using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;

namespace FutbotReact.Models
{
    public class PlayerToBuy
    {
        [BsonId]
        [BsonRepresentation(BsonType.ObjectId)]
        public string Id { get; set; }
        [BsonElement("eaAccountUsername")]
        public string EaAccountUsername { get; set; }
        [BsonRepresentation(BsonType.ObjectId)]
        public string Player { get; set; }
        [BsonElement("isBin")]
        public bool IsBin { get; set; }
        [BsonElement("maxActiveBids")]
        public int MaxActiveBids { get; set; }
        [BsonElement("maxPrice")]
        public int MaxPrice { get; set; }
    }
}