using System;
using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;

namespace FutbotReact.Models
{
    public class Error
    {
        public Error(Exception ex)
        {
            ErrorStr = ex.ToString();
            Date = DateTime.Now;
        }

        [BsonId]
        [BsonRepresentation(BsonType.ObjectId)]
        public string Id { get; set; }
        [BsonElement("errorStr")]
        public string ErrorStr { get; set; }
        [BsonElement("date")]
        public DateTime Date { get; set; }
    }
}