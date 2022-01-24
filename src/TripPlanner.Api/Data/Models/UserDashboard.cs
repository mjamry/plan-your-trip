namespace trip_planner.Data.Models
{
    public class UserDashboard{
        public UserDashboard(int plansCount, int locationsCount)
        {
            PlansCount = plansCount;
            LocationsCount = locationsCount;
        }

        public int PlansCount { get; }
        public int LocationsCount { get; }
    }
}