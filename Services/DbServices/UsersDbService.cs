using System.Threading.Tasks;
using FutbotReact.Helpers;
using FutbotReact.Models;
using MongoDB.Driver;
using utbotReact.Services;

namespace FutbotReact.Services.DbServices
{
    public class UsersDbService : BaseDbService
    {
        private readonly HashPassword _hasher;
        private readonly IMongoCollection<User> _collection;

        public UsersDbService(HashPassword hasher)
        {
            _hasher = hasher;
            _collection = _db.GetCollection<User>(DatabaseCollections.Users);
        }

        public async Task Add(User user)
        {
            user.Username = user.Username.ToUpper();
            user.Password = _hasher.Hash(user.Password);
            await _collection.InsertOneAsync(user);
        }

        public async Task Delete(string username)
            => await _collection.DeleteOneAsync(u => u.Username == username.ToUpper());
    }
}