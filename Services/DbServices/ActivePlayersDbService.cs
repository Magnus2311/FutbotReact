using System.Collections.Generic;
using System.Threading.Tasks;
using FutbotReact.Models;
using MongoDB.Driver;
using MongoDB.Driver.Linq;

namespace FutbotReact.Services.DbServices
{
    public class ActivePlayersDbService : BaseDbService
    {
        public IEnumerable<PlayerToBuy> GetActivePlayersToBuy(string eaAccountUsername)
            => _db.GetCollection<PlayerToBuy>("PlayersToBuy").AsQueryable()
                .Where(ptb => ptb.EaAccountUsername.ToUpper() == eaAccountUsername.ToUpper());

        public async Task AddPlayerToBuy(PlayerToBuy playerToBuy)
            => await _db.GetCollection<PlayerToBuy>("playersToBuy").UpdateOneAsync(
                Builders<PlayerToBuy>.Filter.Eq(ptb => ptb.Name, playerToBuy.Name.ToUpper()),
                Builders<PlayerToBuy>.Update
                    .Set(ptb => ptb.EaAccountUsername, playerToBuy.EaAccountUsername)
                    .Set(pbt => pbt.IsBin, playerToBuy.IsBin)
                    .Set(pbt => pbt.MaxActiveBids, playerToBuy.MaxActiveBids)
                    .Set(pbt => pbt.MaxPrice, playerToBuy.MaxPrice)
                    .Set(pbt => pbt.Name, playerToBuy.Name.ToUpper())
                    .Set(pbt => pbt.Rating, playerToBuy.Rating),
                new UpdateOptions { IsUpsert = true }
            );
    }
}