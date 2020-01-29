namespace trip_planner.Data.Models.Diagnostics
{
    public class Log
    {
        public Log(System.DateTime timeStamp, string level, string message)
        {
            this.TimeStamp = timeStamp;
            this.Level = level;
            this.Message = message;

        }
        public System.DateTime TimeStamp { get; set; }
        public string Level { get; set; }
        public string Message { get; set; }

        public string Data {get; set;}

        public int UserId => 0;
    }
}