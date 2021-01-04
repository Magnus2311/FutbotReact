using FutbotReact.Helpers;
using FutbotReact.Helpers.Attributes;
using FutbotReact.Models;
using FutbotReact.Services.SeleniumServices;
using Microsoft.AspNetCore.Mvc;

namespace FutbotReact.Controllers
{
    [ApiController]
    [Authorize]
    [Route("api/[controller]")]
    public class SellingController : ControllerBase
    {
        [HttpPost]
        public IActionResult SellPlayer(SellPlayerDTO sellPlayer)
        {
            var chromeDriver = ChromeInstances.Instance.Add(sellPlayer.Username);
            new SellingService(chromeDriver).Sell(sellPlayer);
            return Ok();
        }
    }
}