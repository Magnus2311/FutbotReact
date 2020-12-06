using System.Linq;
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
using OpenQA.Selenium;

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
            ChromeInstances.Instance.Add(user.Username);
            var chromeDriver = ChromeInstances.Instance.ChromeDrivers[user.Username];
            try
            {
                loginStatus = new LoginService(chromeDriver).Start(new Models.DTOs.LoginDTO { Username = eaAccount.Username, Password = eaAccount.Password });
            }
            catch (ElementClickInterceptedException)
            {
                loginStatus = LoginStatus.Logged;
            }

            if (!user.EaAccounts.Any(ea => ea.Username == eaAccount.Username))
            {
                user.EaAccounts.Add(eaAccount);
                await _dbService.UpdateEaAccounts(user);
            }

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

        [HttpPost("resendsecuritycode")]
        [Authorize]
        public IActionResult ResendSecurityCode()
        {
            var user = HttpContext.Items["User"] as User;
            var chromeDriver = ChromeInstances.Instance.ChromeDrivers[user.Username];
            new LoginService(chromeDriver).ResendSecurityCode();
            return Ok();
        }
    }
}