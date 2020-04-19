using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace trip_planner.Data.Models
{
    public class UserLists
    {
        [ForeignKey ("UserLists_UserId")]
        public int UserId { get; set; }
        public User User { get; set; }

        [ForeignKey ("UserLists_ListId")]
        public int ListId { get; set; }
        public List List { get; set; }
        public bool Owner { get; set; }
    }
}