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
            throw new System.Exception("Should be passed ea account username");
            var chromeDriver = ChromeInstances.Instance.Add(user.Username);
            new RelistService(chromeDriver).RelistAll();
            return Ok();
        }

        [HttpPost("relistplayer")]
        public IActionResult RelistPlayer(SellPlayerDTO sellPlayerDTO)
        {
            var chromeDriver = ChromeInstances.Instance.Add(sellPlayerDTO.Username);
            new RelistService(chromeDriver).RelistPlayer(sellPlayerDTO);
            return Ok();
        }
    }
}