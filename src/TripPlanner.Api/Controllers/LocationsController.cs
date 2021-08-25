using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using trip_planner.Data;
using trip_planner.Data.Models;

namespace trip_planner.Controllers
{
    [ApiController]
    [Route("[controller]")]
    [Authorize]
    public class LocationsController : ControllerBase
    {
        private ILocationsRepository _repo;

        public LocationsController(ILocationsRepository repo)
        {
            _repo = repo;
        }

        [HttpGet]
        [Route("{listId}")]
        public IActionResult Get([FromRoute] int listId)
        {
            var locations = _repo.GetLocations(listId);

            return Ok(locations);
        }

        [HttpPost]
        [Route("{listId}")]
        public IActionResult Create([FromBody] Location location, [FromRoute] int listId)
        {
            _repo.CreateLocation(location, listId);

            return Created(string.Empty, location);
        }

        [HttpPut]
        public IActionResult Update([FromBody] Location location)
        {
            var result = _repo.UpdateLocation(location);

            if (result == null)
            {
                return NotFound($"There is no location with specified ID: {location.Id}");
            }

            return Ok(location);
        }

        [HttpDelete]
        public IActionResult Delete([FromBody] Location location)
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