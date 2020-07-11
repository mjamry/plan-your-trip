using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using trip_planner.Data.Models;
using TripPlanner.Api.Common;

namespace trip_planner.Controllers
{
    [ApiController]
    [Route("[controller]")]
    [Authorize]
    public class UserDataController : ControllerBase
    {
        private IUserDataRepository _repo;
        private readonly ICurrentUser _user;

        public UserDataController(IUserDataRepository repo, ICurrentUser user)
        {
            _repo = repo;
            _user = user;
        }

        [HttpGet]
        [Route("{dashboard}")]
        public IActionResult Get()
        {
            var dashboard = _repo.UserDashboard(_user.Id);

            return Ok(dashboard);
        }
    }
}