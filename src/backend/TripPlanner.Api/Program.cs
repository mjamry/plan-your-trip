using System;
using Microsoft.AspNetCore.Hosting;
using Microsoft.Extensions.Hosting;
using Serilog;
using Serilog.Sinks.SystemConsole.Themes;
using Microsoft.Extensions.DependencyInjection;
using trip_planner.Data.Contexts;
using Microsoft.EntityFrameworkCore;

namespace trip_planner
{
    public class Program
    {
        public static int Main(string[] args)
        {
            Log.Logger = new LoggerConfiguration()
                .MinimumLevel.Error()
                .Enrich.FromLogContext()
                .WriteTo.Console(outputTemplate: "[{Timestamp:HH:mm:ss} {Level}] {SourceContext}{NewLine}{Message:lj}{NewLine}{Exception}{NewLine}", theme: AnsiConsoleTheme.Code)
                .CreateLogger();

            try
            {
                Log.Information("Starting API");
                var host = CreateHostBuilder(args).Build();

                using(var scope = host.Services.CreateScope())
                {
                    Log.Information("Migrating data database");
                    var dataContext = scope.ServiceProvider.GetService<TripPlannerContext>();
                    dataContext.Database.Migrate();

                    Log.Information("Migarting diagnostics database");
                    var diagnosticsContext = scope.ServiceProvider.GetService<DiagnosticsContext>();
                    diagnosticsContext.Database.Migrate();

                    Log.Information("All migartions applied");
                }

                host.Run();
                return 0;
            }
            catch (Exception ex)
            {
                Log.Fatal(ex, "Host terminated unexpectedly.");
                return 1;
            }
            finally
            {
                Log.CloseAndFlush();
            }
        }

        public static IHostBuilder CreateHostBuilder(string[] args) =>
            Host.CreateDefaultBuilder(args)
                .UseSerilog()
                .ConfigureWebHostDefaults(webBuilder =>
                {
                    webBuilder.UseStartup<Startup>();
                });
    }
}
