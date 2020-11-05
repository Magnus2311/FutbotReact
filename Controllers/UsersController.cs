using System.Threading.Tasks;
using FutbotReact.Models;
using FutbotReact.Services.DbServices;
using Microsoft.AspNetCore.Mvc;

namespace FutbotReact.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class UsersController : ControllerBase
    {
        private readonly UsersDbService _dbService;
        private readonly LoggerDbService _logger;

        public UsersController(UsersDbService dbService,
            LoggerDbService logger)
        {
            _dbService = dbService;
            _logger = logger;
        }

        public string Get() => "Opa opa";

        [HttpPost("add")]
        public async Task Add(User user)
            => await _dbService.Add(user);

        [HttpDelete("delete")]
        public async Task Delete(string username)
            => await _dbService.Delete(username);

        [HttpPost("login")]
        public async Task<bool> Login(User user)
            => await _dbService.Login(user);
    }
}
