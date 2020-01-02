using System;
using System.Collections.Generic;
using Microsoft.AspNetCore.Mvc;
using trip_planner.Models;

namespace trip_planner.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class LocationsController : ControllerBase
    {
        [HttpGet]
        [Route("{id}")]
        public LocationDetailsDTO Get(string id){
            return new LocationDetailsDTO(id.ToString(), "Loc2", "Desc2", 2, new Coordinates(50.1234, 50.34324), "");
        }

        [HttpGet]
        public IEnumerable<LocationDetailsDTO> GetLocations(){
            var locations = new[] {new LocationDetailsDTO("aa", "Loc1", "Desc1", 1, new Coordinates(50.15, 23.34), ""),
                new LocationDetailsDTO("bb", "Loc2", "Desc2", 2, new Coordinates(50.1, -20.43), "")};

            return locations;
        }

        [HttpPost]
        [Route("save")]
        public IActionResult SaveLocation(LocationDetailsDTO location){
            Console.WriteLine("S_"+location.Name);

            return Ok();
        }

        [HttpPost]
        [Route("update")]
        public IActionResult UpdateLocation(LocationDetailsDTO location){
            Console.WriteLine("U_"+location.Name);

            return Ok();
        }

        [HttpPost]
        [Route("delete")]
        public IActionResult DeleteLocation(LocationDetailsDTO location){
            Console.WriteLine("D_"+location.Name);

            return Ok();
        }
    }
}