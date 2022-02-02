using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Text.Json.Serialization;

namespace trip_planner.Data.Models
{
    public class Location
    {
        public Location () {}
        public Location (string name, string description, int rating, Coordinate coordinates, string image)
        {
            Name = name;
            Description = description;
            Rating = rating;
            Coordinates = coordinates;
            Image = image;
        }

        [Key]
        public int Id { get; set; }

        [Required]
        [MaxLength (60)]
        public string Name { get; set; }

        public string Description { get; set; }

        public int Rating { get; set; }

        [ForeignKey ("CoordinatesId")]
        public Coordinate Coordinates { get; set; }
        public int CoordinatesId { get; set; }
        public string Image { get; set; }

        [JsonIgnore]
        public IEnumerable<PlanLocations> Plans { get; set; }
    }
}