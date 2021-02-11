using System.Linq;
using System.Threading.Tasks;
using FutbotReact.Helpers;
using FutbotReact.Helpers.Attributes;
using FutbotReact.Models;
using FutbotReact.Models.Auth;
using FutbotReact.Models.DTOs;
using FutbotReact.Models.Mappings;
using FutbotReact.Services.DbServices;
using FutbotReact.Services.SeleniumServices;
using Microsoft.AspNetCore.Mvc;

namespace FutbotReact.Controllers
{
    [Authorize]
    [ApiController]
    [Route("api/[controller]")]
    public class BiddingController : ControllerBase
    {
        private readonly UsersDbService _usersDbService;
        private readonly ActivePlayersDbService _activePlayersDbService;

        public BiddingController(UsersDbService usersDbService,
            ActivePlayersDbService activePlayersDbService)
        {
            _usersDbService = usersDbService;
            _activePlayersDbService = activePlayersDbService;
        }

        public async Task<IActionResult> Post(BidPlayerDTO bidPlayer)
        {
            var user = Request.HttpContext.Items["User"] as User;
            var eaAccount = user.EaAccounts.FirstOrDefault(ea => ea.Username == bidPlayer.Username);

            var playerToBuy = new PlayerToBuy
            {
                EaAccountUsername = bidPlayer.Username,
                Player = bidPlayer.Player.Id,
                IsBin = false,
                MaxActiveBids = bidPlayer.MaxActiveBids,
                MaxPrice = bidPlayer.MaxPrice,


            };
            await _activePlayersDbService.AddPlayerToBuy(playerToBuy);

            var chromeDriver = ChromeInstances.Instance.Add(bidPlayer.Username);
            new BidService(chromeDriver).BidPlayer(bidPlayer, eaAccount);
            return Ok();
        }
    }
}