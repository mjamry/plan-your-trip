using System;
using System.Collections.Generic;
using System.Linq;
using trip_planner.Data.Contexts;
using Microsoft.EntityFrameworkCore;

namespace trip_planner.Data.Models
{
    public interface IUserDataRepository{
        UserDashboard UserDashboard(Guid userId);
    }

    public class UserDataRepository : IUserDataRepository
    {
        private readonly TripPlannerContext _context;

        public UserDataRepository(TripPlannerContext context)
        {
            _context = context;
        }
        public UserDashboard UserDashboard(Guid userId)
        {
            var userPlans = _context.UserPlans.Where(u => u.UserId == userId).Include(l => l.Plan).Select(l => l.PlanId);
            var userLocations = _context.PlanLocations.Where(l => userPlans.Contains(l.PlanId)).Select(l => l.LocationId);
            return new UserDashboard(userPlans.Count(), userLocations.Count());
        }
    }
}