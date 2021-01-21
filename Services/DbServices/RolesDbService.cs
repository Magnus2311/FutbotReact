using System.Collections.Generic;
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
        public async Task Update(Role role)
            => await _rolesCollection.UpdateManyAsync(Builders<Role>.Filter.Eq(r => r.Id, role.Id),
                Builders<Role>.Update.Set(r => r.Name, role.Name).Set(r => r.Permissions, role.Permissions)
            );
        public async Task<IEnumerable<Role>> GetAll()
            => await (await _rolesCollection.FindAsync(Builders<Role>.Filter.Empty)).ToListAsync();
    }
}