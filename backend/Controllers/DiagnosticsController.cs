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
            return _repo.GetLogs(0);
        }

        [HttpGet]
        [Route("logs/{userId}")]
        public IEnumerable<Log> GetLogs(int userId)
        {
            return _repo.GetLogs(userId);
        }

        [HttpGet]
        [Route("logs/{userId}/{level}")]
        public IEnumerable<Log> GetLogs(int userId, string level)
        {
            return _repo.GetLogs(userId, level);
        }

        [HttpGet]
        [Route("logs/{userId}/{start}/{end}")]
        public IEnumerable<Log> GetLogs(int userId, DateTime start, DateTime end)
        {
            return _repo.GetLogs(userId, start, end);
        }

        [HttpPost]
        [Route("logs/create")]
        public Log Create([FromBody] Log log)
        {
            return _repo.CreateLog(log);
        }

    }
}