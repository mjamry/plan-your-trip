using Microsoft.EntityFrameworkCore;
using trip_planner.Data.Models.Diagnostics;

namespace trip_planner.Data.Contexts
{
    public class DiagnosticsContext : DbContext
    {
        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<Log>()
                .HasNoKey();
        }
        public DiagnosticsContext(DbContextOptions<DiagnosticsContext> options) : base(options){}
        public DbSet<Log> Logs {get;set;}
    }
}