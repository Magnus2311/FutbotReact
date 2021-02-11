using System.Collections.Generic;
using FutbotReact.Models.DTOs;
using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;

namespace FutbotReact.Models.Mappings
{
    public class PlayerToBuyWithPlayer
    {
        [BsonId]
        [BsonRepresentation(BsonType.ObjectId)]
        public string Id { get; set; }
        public string EaAccountUsername { get; set; }
        public Player Player { get; set; }
        public bool IsBin { get; set; }
        public int MaxActiveBids { get; set; }
        public int MaxPrice { get; set; }
    }
}