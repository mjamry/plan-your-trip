using System.Linq;
using System;
using System.Collections.Generic;
using trip_planner.Data.Contexts;
using trip_planner.Data.Models.Diagnostics;

namespace trip_planner.Data
{
    public interface IDiagnosticsRepository
    {
        IEnumerable<Log> GetLogs(int userId, string level);
        IEnumerable<Log> GetLogs(int userId, DateTime startTime, DateTime endTime);
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

        public IEnumerable<Log> GetLogs(int userId, string level)
        {
            return GetLogs(userId).Where(l => l.Level == level);
        }

        public IEnumerable<Log> GetLogs(int userId, DateTime startTime, DateTime endTime)
        {
            return _context.Logs.Where(l => l.TimeStamp >= startTime && l.TimeStamp <= endTime);
        }

        public IEnumerable<Log> GetLogs(int userId)
        {
            return _context.Logs.Where(l => l.UserId == userId);
        }
    }
}