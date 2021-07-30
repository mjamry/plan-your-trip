using System;
using System.ComponentModel.DataAnnotations.Schema;

namespace trip_planner.Data.Models
{
    public class UserLists
    {
        public Guid UserId { get; set; }

        [ForeignKey ("UserLists_ListId")]
        public int ListId { get; set; }
        public List List { get; set; }
        public bool Owner { get; set; }
    }
}