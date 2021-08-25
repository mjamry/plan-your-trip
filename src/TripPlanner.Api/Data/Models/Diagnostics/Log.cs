namespace trip_planner.Data.Models.Diagnostics
{
    public class Log
    {
        public int Id {get; set;}
        public System.DateTime TimeStamp { get; set; }
        public string Level { get; set; }
        public string Message { get; set; }

        public string Data {get; set;}

        public int UserId {get;set;}
    }
}