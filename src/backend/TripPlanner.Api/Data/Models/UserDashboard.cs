namespace trip_planner.Data.Models
{
    public class UserDashboard{
        public UserDashboard(int listsCount, int locationsCount)
        {
            ListsCount = listsCount;
            LocationsCount = locationsCount;
        }

        public int ListsCount { get; }
        public int LocationsCount { get; }
    }
}