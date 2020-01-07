using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace trip_planner.Data.Models
{
    public class List
    {
        public List () {}
        public List (int id, string name, string link, bool priv)
        {
            Id = id;
            Name = name;
            Link = link;
            Private = priv;
        }

        [Key]
        public int Id { get; set; }

        [Required]
        [MaxLength (60)]
        public string Name { get; set; }

        [MaxLength (100)]
        public string Link { get; set; }
        public bool Private { get; set; }

        public IEnumerable<ListLocations> Locations { get; set; }
        public IEnumerable<UserLists> Users { get; set; }
    }

}