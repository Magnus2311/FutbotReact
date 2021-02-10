using System.Collections.Generic;
using System.Threading.Tasks;
using FutbotReact.Helpers;
using FutbotReact.Models.DTOs;
using MongoDB.Driver;

namespace FutbotReact.Services.DbServices
{
    public class PlayersDbService : BaseDbService
    {
        private readonly IMongoCollection<Player> _playersCollection;

        public PlayersDbService()
            => _playersCollection = _db.GetCollection<Player>(DatabaseCollections.Players);

        public async Task<List<Player>> GetAll()
            => await (await _playersCollection.FindAsync(Builders<Player>.Filter.Empty)).ToListAsync();
    }
}