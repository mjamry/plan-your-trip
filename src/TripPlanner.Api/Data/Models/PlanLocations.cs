using System.ComponentModel.DataAnnotations.Schema;

namespace trip_planner.Data.Models
{
    public class PlanLocations
    {
        [ForeignKey ("ListLocations_LocationId")]
        public int LocationId { get; set; }
        public Location Location { get; set; }

        [ForeignKey ("ListLocations_ListId")]
        public int PlanId { get; set; }
        public Plan Plan { get; set; }

        public bool Owner { get; set; }
    }
}