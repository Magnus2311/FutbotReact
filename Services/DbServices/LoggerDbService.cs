using System;
using System.Threading.Tasks;
using FutbotReact.Helpers;
using FutbotReact.Models;
using MongoDB.Driver;

namespace FutbotReact.Services.DbServices
{
    public class LoggerDbService : BaseDbService
    {
        private readonly IMongoCollection<Error> _errors;
        private readonly IMongoCollection<Login> _logins;

        public LoggerDbService()
        {
            _errors = _db.GetCollection<Error>(DatabaseCollections.Errors);
            _logins = _db.GetCollection<Login>(DatabaseCollections.Logins);
        }

        public async Task Log(Exception ex)
            => await _errors.InsertOneAsync(new Error(ex));

        public async Task Log(User user, bool isSuccessful)
            => await _logins.InsertOneAsync(new Login(user, isSuccessful));
    }
}