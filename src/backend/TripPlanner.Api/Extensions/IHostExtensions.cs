using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using System;
using trip_planner.Data.Contexts;

namespace trip_planner
{
    public static class IHostExtensions
    {
        public static IHost MigrateDatabase(this IHost host, Serilog.ILogger log)
        {
            try
            {
                using var scope = host.Services.CreateScope();
                log.Information("Migrating data database");
                var dataContext = scope.ServiceProvider.GetService<TripPlannerContext>();
                dataContext.Database.Migrate();

                log.Information("Migarting diagnostics database");
                var diagnosticsContext = scope.ServiceProvider.GetService<DiagnosticsContext>();
                diagnosticsContext.Database.Migrate();

                log.Information("All migartions applied");
            }
            catch (Exception ex)
            {
                log.Fatal("Database migration error", ex);
            }
            return host;
        } 
    }
}
