using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using System.Collections.Generic;
using System.Linq;

namespace TripPlanner.Auth.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    // TODO do not allow to access from other clients
    // [Authorize]
    public class UsersController : ControllerBase
    {
        private readonly UserManager<IdentityUser> _userManager;

        public UsersController(UserManager<IdentityUser> userManager)
        {
            _userManager = userManager;
        }

        [HttpGet]
        public IEnumerable<UserDto> GetUsers()
        {
            var users = _userManager.Users
                .Where(u => u.EmailConfirmed == true)
                .Select(u => new UserDto() { Id = u.Id, Name = u.UserName, Email = u.Email });

            return users;
        }
    }
}
