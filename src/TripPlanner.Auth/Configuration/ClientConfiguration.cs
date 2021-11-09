using System.Collections.Generic;

namespace TripPlanner.Auth
{
    public class ClientConfiguration
    {
        public ICollection<string> RedirectUris { get; set; }

        public ICollection<string> PostLogoutRedirectUris { get; set; }

        public ICollection<string> AllowedCorsOrigins { get; set; }
    }
}
