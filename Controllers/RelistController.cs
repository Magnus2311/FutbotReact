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
    public class RelistController : ControllerBase
    {
        [HttpGet]
        public IActionResult RelistAll(string eaAccountUsername)
        {
            var user = Request.HttpContext.Items["User"] as User;
            var eaAccount = user.EaAccounts.FirstOrDefault(ea => ea.Username == eaAccountUsername);

            var chromeDriver = ChromeInstances.Instance.Add(user.Username);
            new RelistService(chromeDriver).RelistAll(eaAccount);
            return Ok();
        }

        [HttpPost("relistplayer")]
        public IActionResult RelistPlayer(SellPlayerDTO sellPlayerDTO)
        {
            var user = Request.HttpContext.Items["User"] as User;
            var eaAccount = user.EaAccounts.FirstOrDefault(ea => ea.Username == sellPlayerDTO.Username);

            var chromeDriver = ChromeInstances.Instance.Add(sellPlayerDTO.Username);
            new RelistService(chromeDriver).RelistPlayer(sellPlayerDTO, eaAccount);
            return Ok();
        }
    }
}