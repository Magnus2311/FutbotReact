using MongoDB.Bson.Serialization.Attributes;

namespace FutbotReact.Models
{
    [BsonIgnoreExtraElements]
    public class PlayerToBuy
    {
        public PlayerToBuy(string eaAccountUsername,
            string name,
            int rating,
            bool isBin,
            int maxActiveBids,
            int maxPrice)
        {
            EaAccountUsername = eaAccountUsername;
            Name = name;
            Rating = rating;
            IsBin = isBin;
            MaxActiveBids = maxActiveBids;
            MaxPrice = maxPrice;
        }

        public string EaAccountUsername { get; set; }
        public string Name { get; set; }
        public int Rating { get; set; }
        public bool IsBin { get; set; }
        public int MaxActiveBids { get; set; }
        public int MaxPrice { get; set; }
    }
}