using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace trip_planner.Data.Models
{
    public class Location
    {
        public Location () {}
        public Location (string name, string description, int attractivness, Coordinate coordinates, string image)
        {
            Name = name;
            Description = description;
            Attractivness = attractivness;
            Coordinates = coordinates;
            Image = image;
        }

        [Key]
        public int Id { get; set; }

        [Required]
        [MaxLength (60)]
        public string Name { get; set; }

        public string Description { get; set; }

        public int Attractivness { get; set; }

        [ForeignKey ("CoordinatesId")]
        public Coordinate Coordinates { get; set; }
        public int CoordinatesId { get; set; }
        public string Image { get; set; }

        public IEnumerable<ListLocations> Lists { get; set; }
    }
}