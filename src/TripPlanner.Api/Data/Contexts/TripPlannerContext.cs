using Microsoft.EntityFrameworkCore;
using trip_planner.Data.Models;

namespace trip_planner.Data.Contexts
{
    public class TripPlannerContext : DbContext
    {

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<UserPlans>()
                .HasKey(up => new { up.UserId, up.PlanId, up.Owner });

            modelBuilder.Entity<PlanLocations>()
                .HasKey(pl => new { pl.LocationId, pl.PlanId });
        }

        public TripPlannerContext(DbContextOptions<TripPlannerContext> options) : base(options) { }

        public DbSet<Location> Locations { get; set; }

        public DbSet<Plan> Plan { get; set; }

        public DbSet<Coordinate> Coordinates { get; set; }

        public DbSet<PlanLocations> PlanLocations { get; set; }

        public DbSet<UserPlans> UserPlans { get; set; }
    }
}