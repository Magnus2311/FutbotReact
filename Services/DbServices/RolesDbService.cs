using System.Threading.Tasks;
using FutbotReact.Helpers;
using FutbotReact.Models.Admin;
using MongoDB.Driver;

namespace FutbotReact.Services.DbServices
{
    public class RolesDbService : BaseDbService
    {
        private readonly IMongoCollection<Role> _rolesCollection;

        public RolesDbService()
        {
            _rolesCollection = _db.GetCollection<Role>(DatabaseCollections.Roles);
        }

        public async Task Add(Role role)
            => await _rolesCollection.InsertOneAsync(role);
    }
}