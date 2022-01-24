using System.Collections.Generic;
using System.Linq;
using Microsoft.EntityFrameworkCore;
using trip_planner.Data.Contexts;
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

    public class LocationsRepository : ILocationsRepository
    {
        private TripPlannerContext _context;
        public LocationsRepository(TripPlannerContext context)
        {
            _context = context;
        }

        public IEnumerable<Location> GetLocations(int planId)
        {
            var ids = _context.PlanLocations.Where(l => l.PlanId == planId).Include(l => l.Location).Select(l => l.LocationId);
            return _context.Locations.Where(l => ids.Contains(l.Id)).Include(l => l.Coordinates);
        }

        public Location GetLocation(int id)
        {
            return _context.Locations.Where(l => l.Id == id).Include(l => l.Coordinates).FirstOrDefault();
        }

        public Location CreateLocation(Location location, int planId)
        {
            _context.Coordinates.Add(location.Coordinates);

            _context.Locations.Add(location);
            var plan = _context.Plan.Where(l => l.Id == planId).FirstOrDefault();

            _context.PlanLocations.Add(new PlanLocations(){
                Plan = plan,
                Location = location
            });

            _context.SaveChanges();
            return location;
        }

        public Location UpdateLocation(Location location)
        {
            var dbLocation = GetLocation(location.Id);
            if(dbLocation != null){
                dbLocation.Name = location.Name;
                dbLocation.Description = location.Description;
                dbLocation.Rating = location.Rating;
                dbLocation.Image = location.Image;
                dbLocation.Coordinates.Lat = location.Coordinates.Lat;
                dbLocation.Coordinates.Lon = location.Coordinates.Lon;

                _context.SaveChanges();
            }

            return dbLocation;
        }

        public Location DeleteLocation(Location location)
        {
            var dbLocation = GetLocation(location.Id);
            if(dbLocation != null){
                _context.Locations.Remove(dbLocation);
                _context.SaveChanges();
            }

            return dbLocation;
        }
    }
}