using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
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
        readonly string MyOriginsPolicy = "_myOriginPolicy";

        // This method gets called by the runtime. Use this method to add services to the container.
        public void ConfigureServices (IServiceCollection services)
        {
            services.AddControllers();
            services.AddHttpContextAccessor();
            services.AddCors(options =>
            {
                options.AddPolicy(MyOriginsPolicy,
                    builder =>
                    {
                        builder.WithOrigins("http://localhost:3000")
                            .AllowAnyHeader()
                            .AllowAnyMethod();
                    });
            });

            services.AddAuthentication("Bearer")
                .AddJwtBearer("Bearer", options =>
                {
                    options.Authority = "http://localhost:50000";
                    options.RequireHttpsMetadata = false;

                    options.Audience = API_CODE_NAME;
                });

            string dataConnectionString = Configuration["ConnectionStrings:DataConnection"];
            services.AddDbContext<TripPlannerContext>(options => options.UseMySql (dataConnectionString));
            string diagnosticsConnectionString = Configuration["ConnectionStrings:DiagnosticsConnection"];
            services.AddDbContext<DiagnosticsContext>(options => options.UseMySql(diagnosticsConnectionString));
            
            //register types
            services.AddScoped<ILocationsRepository, LocationsRepository>();
            services.AddScoped<IDiagnosticsRepository, DiagnosticsRepository>();
            services.AddScoped<IListsRepository, ListsRepository>();
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

            app.UseCors(MyOriginsPolicy);
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