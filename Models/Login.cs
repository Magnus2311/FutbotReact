namespace FutbotReact.Models
{
    public class Login
    {
        public Login(User user)
        {
            Date = DateTime.Now;
        }
        
        [BsonId]
        [BsonRepresentation(BsonType.ObjectId)]
        public string Id { get; set; }
        [BsonElement("userId")]
        public string UserId { get; set; }
        [BsonElement("date")]
        public DateTime Date { get; set; }
    }
}