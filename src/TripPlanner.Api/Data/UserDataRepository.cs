using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using trip_planner.Data.Contexts;

namespace trip_planner.Data.Models
{
    public class UserDataRepository : IUserDataRepository
    {
        private readonly TripPlannerContext _context;
        private readonly IUserService _userService;

        public UserDataRepository(TripPlannerContext context, IUserService userService)
        {
            _context = context;
            _userService = userService;
        }

        public UserDashboard UserDashboard(Guid userId)
        {
            var userPlans = _context.UserPlans.Where(u => u.UserId == userId).Include(l => l.Plan).Select(l => l.PlanId);
            var userLocations = _context.PlanLocations.Where(l => userPlans.Contains(l.PlanId)).Select(l => l.LocationId);
            return new UserDashboard(userPlans.Count(), userLocations.Count());
        }

        public async Task<IEnumerable<UserDto>> GetUsersToShareWith(Guid currentUserId)
        {
            var allUsers = await _userService.GetUsers();
            return allUsers.Where(u => u.Id != currentUserId);
        }
    }
}