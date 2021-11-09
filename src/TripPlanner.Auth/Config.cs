// Copyright (c) Brock Allen & Dominick Baier. All rights reserved.
// Licensed under the Apache License, Version 2.0. See LICENSE in the project root for license information.


using IdentityServer4;
using IdentityServer4.Models;
using IdentityServer4.Test;
using System.Collections.Generic;
using TripPlanner.Auth.Configuration;

namespace IdentityServer
{
    public static class Config
    {
        private const string API_CODE_NAME = "trip_planner";

        public static IEnumerable<IdentityResource> Ids =>
            new IdentityResource[]
            { 
                new IdentityResources.OpenId(),
                new IdentityResources.Profile(),
                new IdentityResources.Email()
            };

        public static IEnumerable<TestUser> Users => 
            new List<TestUser>{};

        public static IEnumerable<ApiResource> Apis =>
            new List<ApiResource>
            {
                new ApiResource(API_CODE_NAME, "API")
            };

        public static IEnumerable<Client> GetClients(IdentityClientsConfiguration config)
        {
            return new List<Client>
            {
                new Client
                    {
                        ClientId = "SpaClient",
                        ClientName = "Trip Planner App",
                        AllowedGrantTypes = GrantTypes.Implicit,
                        AllowAccessTokensViaBrowser = true,
                        AccessTokenType = AccessTokenType.Jwt,
                        AlwaysSendClientClaims = true,
                        AlwaysIncludeUserClaimsInIdToken = true,
                        RequireConsent = false,

                        RedirectUris = config.SpaClient.RedirectUris,
                        PostLogoutRedirectUris = config.SpaClient.PostLogoutRedirectUris,
                        AllowedCorsOrigins = config.SpaClient.AllowedCorsOrigins,

                        AllowedScopes =
                        {
                            IdentityServerConstants.StandardScopes.OpenId,
                            IdentityServerConstants.StandardScopes.Profile,
                            IdentityServerConstants.StandardScopes.Email,
                            API_CODE_NAME
                        }
                    }
            };
        }
    }
}