using System;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace trip_planner.Data.Models
{
    public interface IUserDataRepository
    {
        Task<IEnumerable<UserDto>> GetUsersToShareWith(Guid currentUserId);
        UserDashboard UserDashboard(Guid userId);
    }
}