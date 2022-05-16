using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.Hosting;
using TripPlanner.App.Services;

namespace TripPlanner.App.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class SettingsController : ControllerBase
    {
        private readonly IConfiguration _config;
        private readonly IStorageService _storageService;
        private readonly IWebHostEnvironment _env;

        public SettingsController(
            IConfiguration configuration,
            IStorageService storageService,
            IWebHostEnvironment env)
        {
            _config = configuration;
            _storageService = storageService;
            _env = env;
        }

        [HttpGet]
        public IActionResult Get()
        {
            var settings = _config.GetSection(nameof(Settings)).Get<Settings>();
            settings.StorageToken = _storageService.GenerateSasToken();
            settings.IsDevelopment = _env.IsDevelopment();

            return Ok(new FrontendSettings(settings));
        }
    }
}
