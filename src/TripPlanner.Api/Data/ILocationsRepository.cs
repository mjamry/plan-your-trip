using System.Collections.Generic;
using trip_planner.Data.Models;
namespace trip_planner.Data
{
    public interface ILocationsRepository
    {
        IEnumerable<Location> GetLocations(int planId);
        Location GetLocation(int id);
        Location CreateLocation(Location location, int planId);
        Location UpdateLocation(Location location);
        Location DeleteLocation(Location location);
    }
}