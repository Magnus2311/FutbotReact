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

        public UsersController(UsersDbService dbService) =>
            _dbService = dbService;

        public string Get() => "Opa opa";

        [HttpPost]
        public async Task Add(User user)
            => await _dbService.Add(user);

        [HttpDelete]
        public async Task Delete(string username)
            => await _dbService.Delete(username);
    }
}
