using System.Collections.Generic;
using System.Linq;
using Microsoft.EntityFrameworkCore;
using trip_planner.Data.Contexts;
using trip_planner.Data.Models;
namespace trip_planner.Data
{
    public interface ILocationsRepository
    {
        IEnumerable<Location> GetLocations();
        Location GetLocation(int id);
        Location CreateLocation(Location location);
        Location UpdateLocation(Location location);
        bool RemoveLocation(Location location);
    }

    public class LocationsRepository : ILocationsRepository
    {
        private TripPlannerContext _context;
        public LocationsRepository(TripPlannerContext context)
        {
            _context = context;
        }

        public IEnumerable<Location> GetLocations()
        {
            return _context.Locations.Include(l => l.Coordinates);
        }

        public Location GetLocation(int id)
        {
            return _context.Locations.Where(l => l.Id == id).Include(l => l.Coordinates).FirstOrDefault();
        }

        public Location CreateLocation(Location location)
        {
            _context.Coordinates.Add(location.Coordinates);

            _context.Locations.Add(location);

            _context.SaveChanges();
            return location;
        }

        public Location UpdateLocation(Location location)
        {
            throw new System.NotImplementedException();
        }

        public bool RemoveLocation(Location location)
        {
            _context.Locations.Remove(location);

            _context.SaveChanges();
            //TODO: handle errors
            return true;
        }
    }
}