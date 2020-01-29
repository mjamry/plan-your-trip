using System;
using System.Collections.Generic;
using trip_planner.Data.Contexts;
using trip_planner.Data.Models.Diagnostics;

namespace trip_planner.Data
{
    public interface IDiagnosticsRepository
    {
        IEnumerable<Log> GetLogs(string level);
        IEnumerable<Log> GetLogs(DateTime startTime, DateTime endTime);
        IEnumerable<Log> GetLogs(int userId);
        Log CreateLog(Log log);
    }

    public class DiagnosticsRepository : IDiagnosticsRepository
    {
        private readonly DiagnosticsContext _context;
        public DiagnosticsRepository(DiagnosticsContext context)
        {
            _context = context;

        }
        public Log CreateLog(Log log)
        {
            _context.Logs.Add(log);
            _context.SaveChanges();
            return log;
        }

        public IEnumerable<Log> GetLogs(string level)
        {
            return _context.Logs;
        }

        public IEnumerable<Log> GetLogs(DateTime startTime, DateTime endTime)
        {
            return _context.Logs;
        }

        public IEnumerable<Log> GetLogs(int userId)
        {
            return _context.Logs;
        }
    }
}