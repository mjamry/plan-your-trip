using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using System;

namespace TripPlanner.Auth
{
    public static class IHostExtensions
    {
        public static IHost MigrateDatabase(this IHost host, Serilog.ILogger log)
        {
            try
            {
                using var scope = host.Services.CreateScope();
                log.Information("Migrating identity server database");
                var idsrvContext = scope.ServiceProvider.GetService<ApplicationDbContext>();
                idsrvContext.Database.Migrate();

                log.Information("Migrations applied");
            }
            catch(Exception ex)
            {
                log.Fatal("Database migration error", ex);
            }

            return host;
        }
    }
}
