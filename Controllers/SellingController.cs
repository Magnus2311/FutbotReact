using System.Linq;
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
            var user = Request.HttpContext.Items["User"] as User;
            var eaAccount = user.EaAccounts.FirstOrDefault(ea => ea.Username == sellPlayer.Username);

            var chromeDriver = ChromeInstances.Instance.Add(sellPlayer.Username);
            new SellingService(chromeDriver).Sell(sellPlayer, eaAccount);
            return Ok();
        }
    }
}