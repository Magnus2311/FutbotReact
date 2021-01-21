using System.Threading.Tasks;
using FutbotReact.Helpers.Attributes;
using FutbotReact.Models.Admin;
using FutbotReact.Services.DbServices;
using Microsoft.AspNetCore.Mvc;

namespace FutbotReact.Controllers
{
    [ApiController]
    [Authorize]
    [Route("api/[controller]")]
    public class RolesController : ControllerBase
    {
        private readonly LoggerDbService _logger;
        private readonly RolesDbService _roleDbService;

        public RolesController(LoggerDbService logger,
            RolesDbService roleDbService)
        {
            _logger = logger;
            _roleDbService = roleDbService;
        }

        [HttpPost("add")]
        public async Task<IActionResult> Add(Role role)
        {
            _logger.Log(HttpContext.User.Identity.Name, "Role is added", role.Name, Request.HttpContext.Connection.RemoteIpAddress.ToString());
            await _roleDbService.Add(role);
            return Ok();
        }
    }
}