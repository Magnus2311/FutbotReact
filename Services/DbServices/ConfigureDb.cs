using FutbotReact.Helpers;
using FutbotReact.Models;
using MongoDB.Driver;

namespace FutbotReact.Services.DbServices
{
    public class ConfigureDb : BaseDbService
    {
        public async void Start()
        {
            var options = new CreateIndexOptions() { Unique = true };
            var field = new StringFieldDefinition<User>("Username");
            var indexDefinition = new IndexKeysDefinitionBuilder<User>().Ascending(field);

            var indexModel = new CreateIndexModel<User>(indexDefinition, options);
            await _db.GetCollection<User>(DatabaseCollections.Users).Indexes.CreateOneAsync(indexModel);
        }
    }
}