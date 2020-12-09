using FutbotReact.Helpers;
using FutbotReact.Helpers.Attributes;
using FutbotReact.Models;
using FutbotReact.Models.Auth;
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
            var user = HttpContext.Items["User"] as User;
            ChromeInstances.Instance.Add(user.Username);
            var chromeDriver = ChromeInstances.Instance.ChromeDrivers[user.Username];
            new SellingService(chromeDriver).Sell(sellPlayer);
            return Ok();
        }
    }
}