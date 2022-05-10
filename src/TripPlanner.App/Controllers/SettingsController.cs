using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;
using TripPlanner.App.Services;

namespace TripPlanner.App.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class SettingsController : ControllerBase
    {
        private readonly IConfiguration _config;
        private readonly IStorageService _storageService;

        public SettingsController(IConfiguration configuration, IStorageService storageService)
        {
            _config = configuration;
            _storageService = storageService;
        }

        [HttpGet]
        public IActionResult Get()
        {
            var settings = _config.GetSection(nameof(Settings)).Get<Settings>();
            settings.StorageToken = _storageService.GenerateSasToken();

            return Ok(new FrontendSettings(settings));
        }
    }
}
