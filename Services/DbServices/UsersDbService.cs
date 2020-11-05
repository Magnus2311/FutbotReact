using System.Threading.Tasks;
using FutbotReact.Helpers;
using FutbotReact.Models;
using Microsoft.AspNetCore.Mvc;
using MongoDB.Driver;
using utbotReact.Services;

namespace FutbotReact.Services.DbServices
{
    public class UsersDbService : BaseDbService
    {
        private readonly HashPassword _hasher;
        private readonly IMongoCollection<User> _collection;
        private readonly LoggerDbService _logger;

        public UsersDbService(HashPassword hasher,
            LoggerDbService logger)
        {
            _hasher = hasher;
            _collection = _db.GetCollection<User>(DatabaseCollections.Users);
            _logger = logger;
        }

        [Route("Add")]
        public async Task Add(User user)
        {
            user.Username = user.Username.ToUpper();
            user.Password = _hasher.Hash(user.Password);
            await _collection.InsertOneAsync(user);
        }

        public async Task Delete(string username)
            => await _collection.DeleteOneAsync(u => u.Username == username.ToUpper());

        [Route("Login")]
        public async Task<bool> Login(User user)
        {
            var dbUser = await (await _collection.FindAsync<User>(u => u.Username == user.Username.ToUpper())).FirstOrDefaultAsync(); ;
            var isSuccessful = _hasher.VerifyPassword(dbUser.Password, user.Password);
            await _logger.Log(user, isSuccessful);
            return isSuccessful;
        }
    }
}