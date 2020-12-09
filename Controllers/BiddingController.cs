using FutbotReact.Helpers;
using FutbotReact.Helpers.Attributes;
using FutbotReact.Models.Auth;
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
            var user = HttpContext.Items["User"] as User;
            ChromeInstances.Instance.Add(user.Username);
            var chromeDriver = ChromeInstances.Instance.ChromeDrivers[user.Username];
            new BidService(chromeDriver).BidPlayer(bidPlayer);
            return Ok();
        }
    }
}