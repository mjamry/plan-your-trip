using System.ComponentModel.DataAnnotations;

namespace trip_planner.Data.Models
{
    public class Coordinate
    {
        public Coordinate () {}
        public Coordinate (double lat, double lon)
        {
            Lat = lat;
            Lon = lon;
        }

        [Key]
        public int Id { get; set; }

        [Required]
        public double Lat { get; set; }

        [Required]
        public double Lon { get; set; }
    }
}