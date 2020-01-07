using System.Collections.Generic;

using Microsoft.EntityFrameworkCore;

using trip_planner.Data.Contexts;
using trip_planner.Data.Models;
namespace trip_planner.Data
{
    public interface ILocationsRepository
    {
        IEnumerable<Location> GetLocations ();
        Location CreateLocation (Location location);
    }

    public class LocationsRepository : ILocationsRepository
    {
        private TripPlannerContext _context;
        public LocationsRepository (TripPlannerContext context)
        {
            _context = context;
        }

        public IEnumerable<Location> GetLocations ()
        {
            return _context.Locations.Include (l => l.Coordinates);
        }

        public Location CreateLocation (Location location)
        {
            _context.Locations.Add (location);

            _context.SaveChanges ();
            return location;
        }
    }
}