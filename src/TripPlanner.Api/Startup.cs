using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using System.Linq;
using trip_planner.Configuration;
using trip_planner.Data;
using trip_planner.Data.Contexts;
using trip_planner.Data.Models;
using TripPlanner.Api.Common;

namespace trip_planner
{
    public class Startup
    {
        private const string API_NAME = "Trip Planner API";
        private const string API_CODE_NAME = "trip_planner";
        private const string API_VERSION = "0.1";
        public Startup (IConfiguration configuration)
        {
            Configuration = configuration;
        }

        public IConfiguration Configuration { get; }
        readonly string DefaultOriginsPolicy = "_defaultOriginPolicy";

        // This method gets called by the runtime. Use this method to add services to the container.
        public void ConfigureServices (IServiceCollection services)
        {
            services.AddControllers();
            services.AddHttpContextAccessor();

            var corsConfig = Configuration.GetSection("CorsConfig").Get<CorsConfiguration>();
            services.AddCors(options =>
            {
                options.AddPolicy(DefaultOriginsPolicy,
                    builder =>
                    {
                        builder.WithOrigins(corsConfig.Origins.ToArray())
                            .AllowAnyHeader()
                            .AllowAnyMethod();
                    });
            });

            services.AddAuthentication("Bearer")
                .AddJwtBearer("Bearer", options =>
                {
                    options.Authority = Configuration["IdentityConfig:Authority"];
                    options.RequireHttpsMetadata = false;

                    options.Audience = API_CODE_NAME;
                });

            string dataConnectionString = Configuration["ConnectionStrings:Data"];
            services.AddDbContext<TripPlannerContext>(options => options.UseSqlServer(dataConnectionString));
            string diagnosticsConnectionString = Configuration["ConnectionStrings:Diagnostics"];
            services.AddDbContext<DiagnosticsContext>(options => options.UseSqlServer(diagnosticsConnectionString));

            //register types
            services.AddScoped<ILocationsRepository, LocationsRepository>();
            services.AddScoped<IDiagnosticsRepository, DiagnosticsRepository>();
            services.AddScoped<IPlanRepository, PlanRepository>();
            services.AddScoped<IUserDataRepository, UserDataRepository>();
            services.AddScoped<ICurrentUser, CurrentUser>();
        }

        // This method gets called by the runtime. Use this method to configure the HTTP request pipeline.
        public void Configure (IApplicationBuilder app, IWebHostEnvironment env)
        {
            if (env.IsDevelopment())
            {
                app.UseDeveloperExceptionPage();
            }

            app.UseCors(DefaultOriginsPolicy);
            app.UseHttpsRedirection();

            app.UseRouting();

            app.UseAuthentication();
            app.UseAuthorization();

            app.UseEndpoints(endpoints =>
            {
                endpoints.MapControllers();
            });
        }
    }
}