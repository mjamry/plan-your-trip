using System;
using System.Collections.Generic;
using Microsoft.AspNetCore.Mvc;
using trip_planner.Data;
using trip_planner.Data.Models;

namespace trip_planner.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class LocationsController : ControllerBase
    {
        private ILocationsRepository _repo;

        public LocationsController(ILocationsRepository repo)
        {
            _repo = repo;
        }

        [HttpGet]
        [Route("{id}")]
        public Location Get(int id)
        {
            return _repo.GetLocation(id);
        }

        [HttpGet]
        [Route("list/{listId}")]
        public IEnumerable<Location> GetLocations(int listId)
        {
            var locations = _repo.GetLocations(listId);

            return locations;
        }

        [HttpGet]
        [Route("test/{number}/list/{listId}")]
        public IActionResult Test(int number, int listId)
        {
            var rand = new Random();
            for (int i = 0; i < number; i++)
            {
                var data = new Location("Location " + rand.Next() * 100, "Description1", 2, new Coordinate() { Lat = rand.NextDouble() * 180 - 90, Lon = rand.NextDouble() * 360 - 180 }, "");
                _repo.CreateLocation(data, listId);
            }

            return Ok(GetLocations(listId));
        }

        [HttpPost]
        [Route("create/list/{listId}")]
        public IActionResult CreateLocation([FromBody] Location location, int listId)
        {
            _repo.CreateLocation(location, listId);

            return Created($"[controller]/{location.Id}", location);
        }

        [HttpPost]
        [Route("update")]
        public IActionResult UpdateLocation([FromBody] Location location)
        {
            var result = _repo.UpdateLocation(location);

            if (result == null)
            {
                return NotFound($"There is no location with specified ID: {location.Id}");
            }

            return Ok(location);
        }

        [HttpPost]
        [Route("delete")]
        public IActionResult DeleteLocation([FromBody] Location location)
        {
            var result = _repo.DeleteLocation(location);

            if (result == null)
            {
                return NotFound($"There is no location with specified ID: {location.Id}");
            }

            return Ok(result);
        }
    }
}