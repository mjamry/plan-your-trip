using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using System.Linq;
using trip_planner.Data;
using trip_planner.Data.Models;
using TripPlanner.Api.Common;

namespace trip_planner.Controllers
{
    [ApiController]
    [Route("[controller]")]
    [Authorize]
    public class LocationsController : ControllerBase
    {
        private ILocationsRepository _locationsRepository;
        private readonly IPlanRepository _planRepository;
        private readonly ICurrentUser _currentUser;

        public LocationsController(ILocationsRepository locationsRepository, IPlanRepository planRepository, ICurrentUser currentUser)
        {
            _locationsRepository = locationsRepository;
            _planRepository = planRepository;
            _currentUser = currentUser;
        }

        [HttpGet]
        [Route("{planId}")]
        public IActionResult Get([FromRoute] int planId)
        {
            var userPlans = _planRepository.GetPlans(_currentUser.Id).Where(p => p.Id == planId);

            if (userPlans.Count() == 0)
            {
                return Unauthorized($"No access rights to the plan.");
            }

            var locations = _locationsRepository.GetLocations(planId);

            return Ok(locations);
        }

        [HttpPost]
        [Route("{planId}")]
        public IActionResult Create([FromBody] Location location, [FromRoute] int planId)
        {
            var userPlans = _planRepository.GetPlans(_currentUser.Id).Where(p => p.Id == planId);

            if (userPlans.Count() == 0)
            {
                return Unauthorized($"No access rights to the plan.");
            }

            _locationsRepository.CreateLocation(location, planId);

            return Created(string.Empty, location);
        }

        [HttpPut]
        public IActionResult Update([FromBody] Location location)
        {
            var loc = _locationsRepository.GetLocation(location.Id);

            if(loc == null)
            {
                return NotFound($"There is no location with specified ID: {location.Id}");
            }

            var result = _locationsRepository.UpdateLocation(location);

            return Ok(location);
        }

        [HttpDelete]
        public IActionResult Delete([FromBody] Location location)
        {
            var result = _locationsRepository.DeleteLocation(location);

            if (result == null)
            {
                return NotFound($"There is no location with specified ID: {location.Id}");
            }

            return Ok(result);
        }
    }
}