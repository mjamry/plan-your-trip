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
        public Location Get(int id)
        {
            return _repo.GetLocation(id);
        }

        [HttpGet]
        public IEnumerable<Location> GetLocations(){
            var locations = _repo.GetLocations();

            return locations;
        }

        [HttpGet]
        [Route("test/{number}")]
        public IActionResult Test(int number){
            var rand = new Random();
            for(int i=0;i<number; i++)
            {
                var data = new Location("Location " + rand.Next() * 100, "Description1", 2, new Coordinate(){Lat = rand.NextDouble()*180 - 90, Lon = rand.NextDouble()*360 - 180}, "");
                _repo.CreateLocation(data);   
            }

            return Ok(GetLocations());
        }

        [HttpPost]
        [Route("create")]
        public IActionResult CreateLocation([FromBody] Location location){
            _repo.CreateLocation(location);

            return Created($"[controller]/{location.Id}", location);
        }

        [HttpPost]
        [Route("update")]
        public IActionResult UpdateLocation([FromBody] Location location){
            _repo.UpdateLocation(location);

            return Ok(location);
        }

        [HttpPost]
        [Route("delete")]
        public IActionResult DeleteLocation([FromBody] Location location){
            var dbLocation = Get(location.Id);
            if(dbLocation == null){
                return NotFound();
            }

            _repo.DeleteLocation(dbLocation);

            return Ok(dbLocation);
        }
    }
}