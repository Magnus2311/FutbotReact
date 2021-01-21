using System;
using System.Threading.Tasks;
using FutbotReact.Helpers;
using FutbotReact.Models;
using FutbotReact.Models.Auth;
using FutbotReact.Models.Logs;
using MongoDB.Driver;

namespace FutbotReact.Services.DbServices
{
    public class LoggerDbService : BaseDbService
    {
        private readonly IMongoCollection<Error> _errors;
        private readonly IMongoCollection<Login> _logins;
        private readonly IMongoCollection<ScheduledStart> _scheduledStarts;
        private readonly IMongoCollection<LogRole> _roles;

        public LoggerDbService()
        {
            _errors = _db.GetCollection<Error>(DatabaseCollections.Errors);
            _logins = _db.GetCollection<Login>(DatabaseCollections.Logins);
            _scheduledStarts = _db.GetCollection<ScheduledStart>(DatabaseCollections.ScheduledStarts);
            _roles = _db.GetCollection<LogRole>(DatabaseCollections.RolesLogs);
        }

        public async Task Log(Exception ex)
            => await _errors.InsertOneAsync(new Error(ex));

        public async Task Log(User user, bool isSuccessful)
            => await _logins.InsertOneAsync(new Login(user, isSuccessful));

        public async void Log(string information)
            => await _scheduledStarts.InsertOneAsync(new ScheduledStart { Information = information });

        public async void Log(string username, string information, string roleName, string ip)
            => await _roles.InsertOneAsync(new LogRole { Username = username, Information = information, RoleName = roleName, IP = ip });
    }
}