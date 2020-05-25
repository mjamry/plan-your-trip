using System;
namespace TripPlanner.Api.Common
{
    public interface ICurrentUser
    {
        Guid Id { get; }
        string Name { get; }
        string Email { get; }
    }
}