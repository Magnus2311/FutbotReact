using System.Threading.Tasks;
using FutbotReact.Helpers.Attributes;
using FutbotReact.Models;
using FutbotReact.Models.Auth;
using FutbotReact.Services.DbServices;
using Microsoft.AspNetCore.Mvc;

namespace FutbotReact.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class EaAccountsController : ControllerBase
    {
        private readonly UsersDbService _dbService;

        public EaAccountsController(UsersDbService dbService)
        {
            _dbService = dbService;
        }

        [HttpPost("add")]
        [Authorize]
        public async Task<IActionResult> Add(EaAccount eaAccount)
        {
            var user = HttpContext.Items["User"] as User;
            user.EaAccounts.Add(eaAccount);
            await _dbService.UpdateEaAccounts(user);

            return Ok();
        }
    }
}