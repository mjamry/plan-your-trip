using System;
using System.Collections.Generic;
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
}