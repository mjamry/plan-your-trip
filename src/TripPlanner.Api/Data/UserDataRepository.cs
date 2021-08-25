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
            var userLists = _context.UserLists.Where(u => u.UserId == userId).Include(l => l.List).Select(l => l.ListId);
            var userLocations = _context.ListLocations.Where(l => userLists.Contains(l.ListId)).Select(l => l.LocationId);
            return new UserDashboard(userLists.Count(), userLocations.Count());
        }
    }
}