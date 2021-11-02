using System.ComponentModel.DataAnnotations.Schema;

namespace trip_planner.Data.Models
{
    public class ListLocations
    {
        [ForeignKey ("ListLocations_LocationId")]
        public int LocationId { get; set; }
        public Location Location { get; set; }

        [ForeignKey ("ListLocations_ListId")]
        public int ListId { get; set; }
        public List List { get; set; }

        public bool Owner { get; set; }
    }
}