namespace TripPlanner.App
{
    public class Settings
    {
        public string ApiUrl { get; set; }
        public string AuthUrl { get; set; }
        public string AppUrl { get; set; }
        public string StorageName { get; set; }
        public string StorageUrl { get; set; }
        public string StorageContainerName { get; set; }
        public string StorageAccessKey { get; set; }
        public string StorageToken { get; set; }
        public bool IsDevelopment { get;set; }
    }

    public class FrontendSettings
    {
        public FrontendSettings(Settings settings)
        {
            ApiUrl = settings.ApiUrl;
            AuthUrl = settings.AuthUrl;
            AppUrl = settings.AppUrl;
            StorageContainerName = settings.StorageContainerName;
            StorageToken = settings.StorageToken;
            StorageUrl = settings.StorageUrl;
        }

        public string ApiUrl { get; set; }
        public string AuthUrl { get; set; }
        public string AppUrl { get; set; }
        public string StorageUrl { get; set; }
        public string StorageContainerName { get; set; }
        public string StorageToken { get; set; }
    }
}
