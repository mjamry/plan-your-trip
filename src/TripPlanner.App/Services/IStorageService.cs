namespace TripPlanner.App.Services
{
    public interface IStorageService
    {
        string GenerateSasToken(string storedPolicyName = null);
    }
}