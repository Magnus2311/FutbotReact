namespace FutbotReact.Models.DTOs
{
    public class BidPlayerDTO
    {
        public string Username { get; set; }
        public Player Player { get; set; }
        public int MaxPrice { get; set; }
        public int MaxActiveBids { get; set; }
        public bool IsBin { get; set; }
    }
}
