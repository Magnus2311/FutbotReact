using System.Linq.Expressions;
using System.Threading.Tasks;
using FutbotReact.Helpers;
using FutbotReact.Helpers.Attributes;
using FutbotReact.Helpers.Enums;
using FutbotReact.Models;
using FutbotReact.Models.Auth;
using FutbotReact.Services.DbServices;
using FutbotReact.Services.SeleniumServices;
using Microsoft.AspNetCore.Mvc;

namespace FutbotReact.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class EaAccountsController : ControllerBase
    {
        private readonly UsersDbService _dbService;

        public EaAccountsController(UsersDbService dbService)
        {
            _dbService = dbService;
        }

        [HttpPost("add")]
        [Authorize]
        public async Task<IActionResult> Add(EaAccount eaAccount)
        {
            LoginStatus loginStatus = LoginStatus.Unknown;
            var user = HttpContext.Items["User"] as User;
            if (ChromeInstances.Instance.Add(user.Username))
            {
                var chromeDriver = ChromeInstances.Instance.ChromeDrivers[user.Username];
                loginStatus = new LoginService(chromeDriver).Start(new Models.DTOs.LoginDTO { Username = eaAccount.Username, Password = eaAccount.Password });
            }

            user.EaAccounts.Add(eaAccount);
            await _dbService.UpdateEaAccounts(user);

            return Ok(loginStatus);
        }

        [HttpPost("securitycode")]
        [Authorize]
        public async Task<IActionResult> SubmitSecurityCode(string securityCode)
        {
            LoginStatus loginStatus = LoginStatus.Unknown;
            var user = HttpContext.Items["User"] as User;
            var chromeDriver = ChromeInstances.Instance.ChromeDrivers[user.Username];
            loginStatus = new LoginService(chromeDriver).SubmitSecurityCode(securityCode);
            return Ok(loginStatus);
        }
    }
}