using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using FutbotReact.Helpers;
using FutbotReact.Models;
using FutbotReact.Models.DTOs;
using FutbotReact.Models.Mappings;
using MongoDB.Driver;

namespace FutbotReact.Services.DbServices
{
    public class ActivePlayersDbService : BaseDbService
    {
        public IEnumerable<PlayerToBuyWithPlayer> GetActivePlayersToBuy(string eaAccountUsername)
        {
            var players = _db.GetCollection<Player>(DatabaseCollections.Players);
            var playersToBuy = _db.GetCollection<PlayerToBuy>(DatabaseCollections.PlayersToBuy);

            var res = new List<PlayerToBuyWithPlayer>();

            var currPtbs = playersToBuy.AsQueryable().Where(ptb => ptb.EaAccountUsername == eaAccountUsername);

            foreach (var ptb in currPtbs)
            {
                var currPlayer = players.AsQueryable().FirstOrDefault(p => p.Id == ptb.Player);

                res.Add(new PlayerToBuyWithPlayer
                {
                    EaAccountUsername = eaAccountUsername,
                    Id = ptb.Id,
                    IsBin = ptb.IsBin,
                    MaxActiveBids = ptb.MaxActiveBids,
                    MaxPrice = ptb.MaxPrice,
                    Player = currPlayer
                });
            }

            return res;
        }

        public async Task AddPlayerToBuy(PlayerToBuy playerToBuy)
            => await _db.GetCollection<PlayerToBuy>("playersToBuy").UpdateOneAsync(
                Builders<PlayerToBuy>.Filter.Eq(ptb => ptb.Player, playerToBuy.Player),
                Builders<PlayerToBuy>.Update
                    .Set(ptb => ptb.EaAccountUsername, playerToBuy.EaAccountUsername)
                    .Set(pbt => pbt.IsBin, playerToBuy.IsBin)
                    .Set(pbt => pbt.MaxActiveBids, playerToBuy.MaxActiveBids)
                    .Set(pbt => pbt.MaxPrice, playerToBuy.MaxPrice)
                    .Set(pbt => pbt.Player, playerToBuy.Player),
                new UpdateOptions { IsUpsert = true }
            );
    }
}