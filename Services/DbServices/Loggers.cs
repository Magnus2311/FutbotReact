using System;
using System.Threading.Tasks;
using FutbotReact.Helpers;
using FutbotReact.Models;
using MongoDB.Driver;

namespace FutbotReact.Services.DbServices
{
    public class LoggerDbService : BaseDbService
    {
        private readonly IMongoCollection<Error> _collection;

        public LoggerDbService()
        {
            _collection = _db.GetCollection<Error>(DatabaseCollections.Errors);
        }

        public async Task Log(Exception ex)
            => await _collection.InsertOneAsync(new Error(ex));
    }
}