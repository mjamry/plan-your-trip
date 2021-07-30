using System;
using System.Security.Claims;
using IdentityModel;
using Microsoft.AspNetCore.Http;
using Microsoft.Extensions.Logging;
using Serilog;

namespace TripPlanner.Api.Common
{
    public class CurrentUser : ICurrentUser
    {
        public CurrentUser(IHttpContextAccessor contextAccessor, ILogger<CurrentUser> logger)
        {
            var userSubject = contextAccessor.HttpContext?.User.FindFirstValue(ClaimTypes.NameIdentifier);
            Id = new Guid(userSubject);
            Name = contextAccessor.HttpContext?.User.Identity.Name;
            Email = contextAccessor.HttpContext?.User.FindFirstValue(ClaimTypes.Email);
        }

        public Guid Id { get; }

        public string Name { get; }

        public string Email { get; }
    }
}