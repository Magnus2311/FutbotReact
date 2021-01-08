using System.Threading.Tasks;
using FutbotReact.Helpers.Attributes;
using FutbotReact.Services.DbServices;
using Microsoft.AspNetCore.Mvc;

namespace FutbotReact.Controllers
{
    [Authorize]
    [ApiController]
    [Route("api/[controller]")]
    public class ActivePlayersController : ControllerBase
    {
        private readonly ActivePlayersDbService _playersDbService;

        public ActivePlayersController(ActivePlayersDbService playersDbService)
        {
            _playersDbService = playersDbService;
        }

        [HttpGet]
        public IActionResult OnGet(string eaAccountUsername)
            => Ok(_playersDbService.GetActivePlayersToBuy(eaAccountUsername));
    }
}