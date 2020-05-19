// Copyright (c) Brock Allen & Dominick Baier. All rights reserved.
// Licensed under the Apache License, Version 2.0. See LICENSE in the project root for license information.


using IdentityServer4;
using IdentityServer4.Models;
using IdentityServer4.Test;
using System.Collections.Generic;

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
            new List<TestUser>
            {
                new TestUser{
                    SubjectId = "anonymous",
                    Username = "test",
                    Password = "test_pass"
                }
            };

        public static IEnumerable<ApiResource> Apis =>
            new List<ApiResource>
            {
                new ApiResource(API_CODE_NAME, "API")
            };

        public static IEnumerable<Client> Clients =>
            new List<Client>
            {
                new Client
                {
                    ClientId = "client",
                    AllowedGrantTypes = GrantTypes.ClientCredentials,
                    ClientSecrets =
                    {
                        new Secret("secret".Sha256())
                    },
                    AllowedScopes = { API_CODE_NAME },
                    AllowedCorsOrigins = {"http://localhost:3000"}
                },
                new Client
                    {
                        ClientId = "js",
                        ClientName = "JavaScript Client",
                        AllowedGrantTypes = GrantTypes.Implicit,
                        AllowAccessTokensViaBrowser = true,
                        RequireConsent = false,
                        
                        RedirectUris =           { "http://localhost:3000/callback.html" },
                        PostLogoutRedirectUris = { "http://localhost:3000/index.html" },
                        AllowedCorsOrigins =     { "http://localhost:3000" },
                        
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