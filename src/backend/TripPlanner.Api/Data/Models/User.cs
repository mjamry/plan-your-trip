using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace trip_planner.Data.Models
{
    public class User
    {
        public Guid Id { get; set; }

        [Required]
        [MaxLength (60)]
        public string Name { get; set; }

        [Required]
        public string Email { get; set; }

        [Required]
        public string Password { get; set; }

        public bool Active { get; set; }

        public IEnumerable<UserLists> Lists { get; set; }
    }
}