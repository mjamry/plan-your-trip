using System.Collections.Generic;
using System.Threading.Tasks;
using trip_planner.Data.Models;

namespace trip_planner.Data
{
    public interface IUserService
    {
        Task<IEnumerable<UserDto>> GetUsers();
    }
}