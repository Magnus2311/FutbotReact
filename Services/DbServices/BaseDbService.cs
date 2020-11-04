using MongoDB.Driver;

namespace FutbotReact.Services.DbServices
{
    public abstract class BaseDbService
    {
        protected readonly MongoClient _client;
        protected readonly IMongoDatabase _db;

        public BaseDbService()
        {
            _client = new MongoClient("mongodb+srv://FidoDidoo100:A123123123a@fbcluster.rdkdn.mongodb.net/futbot?retryWrites=true&w=majority");
            _db = _client.GetDatabase("futbot");
        }
    }
}