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
using Microsoft.OpenApi.Models;
using Swashbuckle.AspNetCore.SwaggerGen;
using trip_planner.Data;
using trip_planner.Data.Contexts;
using trip_planner.Data.Models;

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
            services.AddCors(options =>
            {
                options.AddPolicy(MyOriginsPolicy,
                    builder =>
                    {
                        builder.AllowAnyOrigin().AllowAnyHeader();
                    });
            });

            services.AddAuthentication("Bearer")
                .AddJwtBearer("Bearer", options =>
                {
                    options.Authority = "http://localhost:50000";
                    options.RequireHttpsMetadata = false;

                    options.Audience = API_CODE_NAME;
                });

            //Swagger
            services.AddSwaggerGen(options => {
                options.SwaggerDoc("v1", new OpenApiInfo { Title = API_NAME, Version = API_VERSION});

                options.AddSecurityDefinition("oauth2", new OpenApiSecurityScheme
                {
                    Type = SecuritySchemeType.OAuth2,
                    Flows = new OpenApiOAuthFlows{
                        Implicit = new OpenApiOAuthFlow{
                            AuthorizationUrl = new Uri("http://localhost:50000/connect/authorize"),
                            Scopes = new Dictionary<string, string>(){
                                { API_CODE_NAME, API_NAME }
                            }
                        }
                    }
                });

                options.OperationFilter<AuthorizationHeaderParameterOperationFilter>();
            });

            string dataConnectionString = Configuration["ConnectionStrings:DataConnection"];
            services.AddDbContext<TripPlannerContext>(options => options.UseMySql (dataConnectionString));
            string diagnosticsConnectionString = Configuration["ConnectionStrings:DiagnosticsConnection"];
            services.AddDbContext<DiagnosticsContext>(options => options.UseMySql(diagnosticsConnectionString));
            
            //register types
            services.AddScoped<ILocationsRepository, LocationsRepository>();
            services.AddScoped<IDiagnosticsRepository, DiagnosticsRepository>();
            services.AddScoped<IListsRepository, ListsRepository>();
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

            app.UseSwagger();
            app.UseSwaggerUI(options => {
                options.SwaggerEndpoint("/swagger/v1/swagger.json", API_NAME + " " + API_VERSION);

                options.OAuthClientId("swagger_ui");
                options.OAuthAppName("Swagger API");

                options.RoutePrefix = string.Empty;
            });

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