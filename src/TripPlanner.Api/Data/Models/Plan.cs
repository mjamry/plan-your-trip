using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Text.Json.Serialization;

namespace trip_planner.Data.Models
{
    public class Plan
    {
        public Plan () {}
        public Plan (int id, string name, string link, bool priv)
        {
            Id = id;
            Name = name;
            Link = link;
            IsPrivate = priv;
        }

        [Key]
        public int Id { get; set; }

        [Required]
        [MaxLength (60)]
        public string Name { get; set; }

        [MaxLength (100)]
        public string Link { get; set; }
        public bool IsPrivate { get; set; }


        public string Description {get; set;}

        public DateTime Created {get; set;}

        public DateTime Updated {get; set;}
        public IEnumerable<PlanLocations> Locations { get; set; }
        [JsonIgnore]
        public IEnumerable<UserPlans> Users { get; set; }
    }

}