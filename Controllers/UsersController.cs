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
        private readonly Logger _logger;

        public UsersController(UsersDbService dbService
            Logger logger)
        {
            _dbService = dbService;
            _logger = logger;
        }

        public string Get() => "Opa opa";

        [HttpPost]
        public async Task Add(User user)
            => await _dbService.Add(user);

        [HttpDelete]
        public async Task Delete(string username)
            => await _dbService.Delete(username);

        [HttpPost]
        public async Task Login(User user) 
            => await _logger.Log(user);
    }
}
