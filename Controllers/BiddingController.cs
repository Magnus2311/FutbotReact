using FutbotReact.Helpers;
using FutbotReact.Helpers.Attributes;
using FutbotReact.Models.DTOs;
using FutbotReact.Services.SeleniumServices;
using Microsoft.AspNetCore.Mvc;

namespace FutbotReact.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class BiddingController : ControllerBase
    {
        [Authorize]
        public IActionResult Post(BidPlayerDTO bidPlayer)
        {
            var chromeDriver = ChromeInstances.Instance.Add(bidPlayer.Username);
            new BidService(chromeDriver).BidPlayer(bidPlayer);
            return Ok();
        }
    }
}