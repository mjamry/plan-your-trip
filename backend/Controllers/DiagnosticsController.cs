using System;
using System.Collections.Generic;
using Microsoft.AspNetCore.Mvc;
using trip_planner.Data;
using trip_planner.Data.Models.Diagnostics;

namespace trip_planner.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class DiagnosticsController : ControllerBase
    {
        private IDiagnosticsRepository _repo;

        public DiagnosticsController(IDiagnosticsRepository repo)
        {
            _repo = repo;
        }

        [HttpGet]
        [Route("logs")]
        public IEnumerable<Log> GetLogs()
        {
            return _repo.GetLogs("level");
        }

        [HttpPost]
        [Route("logs/create")]
        public Log Create([FromBody] Log log)
        {
            return _repo.CreateLog(log);
        }

    }
}