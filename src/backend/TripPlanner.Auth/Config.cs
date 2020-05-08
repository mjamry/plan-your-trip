// Copyright (c) Brock Allen & Dominick Baier. All rights reserved.
// Licensed under the Apache License, Version 2.0. See LICENSE in the project root for license information.


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
                new IdentityResources.OpenId()
            };

        public static IEnumerable<TestUser> Users => 
            new List<TestUser>
            {
                new TestUser{
                    SubjectId = "123",
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
                    AllowedScopes = { API_CODE_NAME }
                },
                new Client
                {
                    ClientId = "swagger_ui",
                    ClientName = "Swagger UI",
                    AllowedGrantTypes = GrantTypes.Implicit,
                    AllowAccessTokensViaBrowser = true,

                    RedirectUris = { "http://localhost:50001/swagger/o2c.html" },
                    PostLogoutRedirectUris = { "http://localhost:50001/swagger/" },

                    AllowedScopes =
                    {
                        API_CODE_NAME
                    }
                }
            };
        
    }
}