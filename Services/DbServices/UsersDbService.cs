using System.Collections.Generic;
using System.Threading.Tasks;
using FutbotReact.Helpers;
using FutbotReact.Models.Auth;
using MongoDB.Driver;
using utbotReact.Services;

namespace FutbotReact.Services.DbServices
{
    public class UsersDbService : BaseDbService
    {
        private readonly HashPassword _hasher;
        private readonly IMongoCollection<User> _collection;
        private readonly LoggerDbService _logger;

        public UsersDbService()
        {
            _collection = _db.GetCollection<User>(DatabaseCollections.Users);

        }

        public UsersDbService(HashPassword hasher,
            LoggerDbService logger) : this()
        {
            _hasher = hasher;
            _logger = logger;
        }

        public async Task Add(User user)
        {
            user.Username = user.Username.ToUpper();
            user.Password = _hasher.Hash(user.Password);
            await _collection.InsertOneAsync(user);
        }

        internal async Task UpdateEaAccounts(User user)
            => await _collection.UpdateOneAsync(
                Builders<User>.Filter.Eq(u => u.Username, user.Username.ToUpper()),
                Builders<User>.Update.Set(u => u.EaAccounts, user.EaAccounts)
            );

        public async Task<List<User>> GetAll()
            => await (await _collection.FindAsync(_ => true)).ToListAsync();

        public async Task Delete(string username)
            => await _collection.DeleteOneAsync(u => u.Username == username.ToUpper());

        public async Task<bool> Login(User user)
        {
            var dbUser = await (await _collection.FindAsync(u => u.Username == user.Username.ToUpper())).FirstOrDefaultAsync();
            var isSuccessful = _hasher.VerifyPassword(dbUser.Password, user.Password);
            await _logger.Log(user, isSuccessful);
            return isSuccessful;
        }

        public async Task<User> FindByUsernameAsync(string username)
            => await (await _collection.FindAsync(u => u.Username == username.ToUpper())).FirstOrDefaultAsync();

        public async Task UpdateRefreshToken(User user)
            => await _collection.UpdateOneAsync(
                Builders<User>.Filter.Eq(u => u.Username, user.Username.ToUpper()),
                Builders<User>.Update.Set(u => u.RefreshTokens, user.RefreshTokens)
            );
    }
}