using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using PlannerApp.Models.Generic;
using PlannerApp.Services.Abstractions;

namespace PlannerApp.Controllers
{
    [Authorize]
    [ApiController]
    [Route("api/[controller]")]
    public class ResponsiblesController : ControllerBase
    {
        private IResponsiblesService _responsiblesService;
        public ResponsiblesController(IResponsiblesService responsiblesService)
        {
            _responsiblesService = responsiblesService;
        }

        [Authorize(Roles = Role.AllRoles)]
        [HttpGet("getResponsibles")]
        public IActionResult GetResponsibles(int userId)
        {
            var responsibles = _responsiblesService.GetResponsiblesFor(userId);

            return Ok(responsibles);
        }
    }
}
