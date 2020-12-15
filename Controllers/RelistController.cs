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
        public IActionResult RelistAll()
        {
            var user = HttpContext.Items["User"] as User;
            ChromeInstances.Instance.Add(user.Username);
            var chromeDriver = ChromeInstances.Instance.ChromeDrivers[user.Username];
            new RelistService(chromeDriver).RelistAll();
            return Ok();
        }

        [HttpPost("relistplayer")]
        public IActionResult RelistPlayer(SellPlayerDTO sellPlayerDTO)
        {
            var user = HttpContext.Items["User"] as User;
            ChromeInstances.Instance.Add(user.Username);
            var chromeDriver = ChromeInstances.Instance.ChromeDrivers[user.Username];
            new RelistService(chromeDriver).RelistPlayer(sellPlayerDTO);
            return Ok();
        }
    }
}