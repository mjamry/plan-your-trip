using Microsoft.EntityFrameworkCore;
using trip_planner.Data.Models;

namespace trip_planner.Data.Contexts
{
    public class TripPlannerContext : DbContext
    {

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<UserLists>()
                .HasKey(ul => new { ul.UserId, ul.ListId });

            modelBuilder.Entity<ListLocations>()
                .HasKey(ll => new { ll.LocationId, ll.ListId });
        }

        public TripPlannerContext(DbContextOptions<TripPlannerContext> options) : base(options) { }

        public DbSet<Location> Locations { get; set; }

        public DbSet<User> Users { get; set; }

        public DbSet<List> Lists { get; set; }

        public DbSet<Coordinate> Coordinates { get; set; }

        public DbSet<ListLocations> ListLocations { get; set; }

        public DbSet<UserLists> UserLists { get; set; }
    }
}