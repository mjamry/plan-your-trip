using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.HttpsPolicy;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using Microsoft.Extensions.Logging;

using trip_planner.Data;
using trip_planner.Data.Contexts;
using trip_planner.Data.Models;

namespace trip_planner
{
    public class Startup
    {
        public Startup (IConfiguration configuration)
        {
            Configuration = configuration;
        }

        public IConfiguration Configuration { get; }
        readonly string MyOriginsPolicy = "_myOriginPolicy";

        // This method gets called by the runtime. Use this method to add services to the container.
        public void ConfigureServices (IServiceCollection services)
        {
            services.AddControllers ();
            services.AddCors (options =>
            {
                options.AddPolicy (MyOriginsPolicy,
                    builder =>
                    {
                        builder.AllowAnyOrigin ().AllowAnyHeader ();
                    });
            });

            string dataConnectionString = Configuration["ConnectionStrings:DataConnection"];
            services.AddDbContext<TripPlannerContext> (options => options.UseMySql (dataConnectionString));
            string diagnosticsConnectionString = Configuration["ConnectionStrings:DiagnosticsConnection"];
            services.AddDbContext<DiagnosticsContext> (options => options.UseMySql(diagnosticsConnectionString));
            
            //register types
            services.AddScoped<ILocationsRepository, LocationsRepository>();
            services.AddScoped<IDiagnosticsRepository, DiagnosticsRepository>();
            services.AddScoped<IListsRepository, ListsRepository>();
        }

        // This method gets called by the runtime. Use this method to configure the HTTP request pipeline.
        public void Configure (IApplicationBuilder app, IWebHostEnvironment env)
        {
            if (env.IsDevelopment ())
            {
                app.UseDeveloperExceptionPage ();
            }

            app.UseCors (MyOriginsPolicy);
            app.UseHttpsRedirection ();

            app.UseRouting ();

            app.UseAuthorization ();

            app.UseEndpoints (endpoints =>
            {
                endpoints.MapControllers ();
            });
        }
    }
}