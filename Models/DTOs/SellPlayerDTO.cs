using FutbotReact.Helpers.Enums;

namespace FutbotReact.Models
{
    public class SellPlayerDTO
    {
        public string Username { get; set; }
        public string Name { get; set; }
        public int BidPrice { get; set; }
        public int BinPrice { get; set; }
        public int Duration { get; set; }
    }
}