using System.Threading.Tasks;
using FutbotReact.Services.DbServices;
using Microsoft.AspNetCore.Mvc;

namespace FutbotReact.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class PlayersController : ControllerBase
    {
        private readonly PlayersDbService _playersDbService;

        public PlayersController(PlayersDbService playersDbService)
            => _playersDbService = playersDbService;

        [HttpGet("getall")]
        public async Task<IActionResult> GetAll()
        {
            var a = await _playersDbService.GetAll();
            return Ok(a);
        }
    }
}