using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.Hosting;
using System;
using TripPlanner.App.Controllers;

namespace TripPlanner.App
{
    public static class CspConfig
    {
        public static IApplicationBuilder UseCsp(this IApplicationBuilder app, IWebHostEnvironment env, IConfiguration conf)
        {
            var config = conf.GetSection(nameof(Settings)).Get<Settings>();
            var cspHeader = "Content-Security-Policy";
            var cspValue = "default-src 'self'; " +
                "style-src 'self' 'unsafe-inline' https://unpkg.com/leaflet@1.4.0/dist/ https://fonts.googleapis.com/; " +
                $"connect-src 'self' {config.AuthUrl} {config.ApiUrl} {config.StorageUrl} https://*.wikipedia.org/ https://*.wikimedia.org blob:; " +
                "script-src 'self' www.google.com/ www.gstatic.com 'unsafe-eval' 'unsafe-inline'; " +
                $"img-src 'self' {config.StorageUrl} https://*.wikimedia.org https://a.basemaps.cartocdn.com/ https://b.basemaps.cartocdn.com/ https://c.basemaps.cartocdn.com/ https://unpkg.com/leaflet@1.4.0/dist/ data:; " +
                $"frame-src www.google.com {config.AuthUrl} blob:;" +
                "font-src https://fonts.googleapis.com/ https://fonts.gstatic.com/;";

            if (env.IsDevelopment())
            {
                cspHeader += "-Report-Only";
            }

            return app.Use(async (context, next) =>
            {
                context.Response.Headers.Add(cspHeader, cspValue);

                await next();
            });
        }
    }
}
