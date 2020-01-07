using System;
using System.Collections.Generic;
using Microsoft.AspNetCore.Mvc;
using trip_planner.Data.Models;
using trip_planner.Data;

namespace trip_planner.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class LocationsController : ControllerBase
    {
        private ILocationsRepository _repo;

        public LocationsController(ILocationsRepository repo){
            _repo = repo;
        }

        [HttpGet]
        [Route("{id}")]
        public Location Get(int id){
            return new Location("Loc2", "Desc2", 2, new Coordinate(50.1234, 50.34324), "");
        }

        [HttpGet]
        public IEnumerable<Location> GetLocations(){
            var locations = _repo.GetLocations();

            return locations;
        }

        [HttpGet]
        [Route("test")]
        public Location Test(){
            var rand = new Random();
            var data = new Location("Location " + rand.Next() * 100, "Description1", 2, new Coordinate(){Lat = rand.NextDouble()*180 - 90, Lon = rand.NextDouble()*360 - 180}, "");
            
            _repo.CreateLocation(data);
            return data;
        }

        [HttpPost]
        [Route("save")]
        public IActionResult SaveLocation(Location location){
            Console.WriteLine("S_"+location.Name);

            return Ok();
        }

        [HttpPost]
        [Route("update")]
        public IActionResult UpdateLocation(Location location){
            Console.WriteLine("U_"+location.Name);

            return Ok();
        }

        [HttpPost]
        [Route("delete")]
        public IActionResult DeleteLocation(Location location){
            Console.WriteLine("D_"+location.Name);

            return Ok();
        }
    }
}