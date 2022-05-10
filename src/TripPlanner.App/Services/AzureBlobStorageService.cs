using Azure.Storage;
using Azure.Storage.Sas;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.Logging;
using System;

namespace TripPlanner.App.Services
{
    public class AzureBlobStorageService : IStorageService 
    {
        private const int TokenValidityInHours = 1;
        private readonly ILogger<AzureBlobStorageService> _logger;
        private Settings _settings;
        public AzureBlobStorageService(IConfiguration config, ILogger<AzureBlobStorageService> logger)
        {
            _settings = config.GetSection(nameof(Settings)).Get<Settings>();
            _logger = logger;
        }

        public string GenerateSasToken(string storedPolicyName = null)
        {
            if(string.IsNullOrEmpty(_settings.StorageAccessKey) 
                || string.IsNullOrEmpty(_settings.StorageName)
                || string.IsNullOrEmpty(_settings.StorageUrl))
            {
                _logger.LogError("Missing storage configuration");
                return null;
            }

            var keyCredential = new StorageSharedKeyCredential(_settings.StorageName, _settings.StorageAccessKey);
            
            AccountSasBuilder sasBuilder = new AccountSasBuilder()
            {
                Services = AccountSasServices.Blobs,
                ResourceTypes = AccountSasResourceTypes.Object,
                ExpiresOn = DateTimeOffset.UtcNow.AddHours(TokenValidityInHours),
                Protocol = SasProtocol.HttpsAndHttp
            };

            sasBuilder.SetPermissions(AccountSasPermissions.Read
                | AccountSasPermissions.Write);

            string sasToken = sasBuilder.ToSasQueryParameters(keyCredential).ToString();

            return sasToken;
        }
    }
}
