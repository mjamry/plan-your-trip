﻿using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;

namespace TripPlanner.App.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class SettingsController : ControllerBase
    {
        private readonly IConfiguration _config;

        public SettingsController(IConfiguration configuration)
        {
            _config = configuration;
        }

        [HttpGet]
        public IActionResult Get()
        {
            return Ok(_config.GetSection(nameof(Settings)).Get<Settings>());
        }
    }

    internal class Settings
    {
        public string ApiUrl { get; set; }
        public string AuthUrl { get; set; }
        public string AppUrl { get; set; }
    }
}
