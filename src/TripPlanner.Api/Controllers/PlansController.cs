using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using trip_planner.Data.Models;
using TripPlanner.Api.Common;

namespace trip_planner.Controllers
{
    [ApiController]
    [Route("[controller]")]
    [Authorize]
    public class PlansController : ControllerBase
    {
        private IPlanRepository _repo;
        private readonly ICurrentUser _user;
        private readonly ILogger<PlansController> _logger;

        public PlansController(IPlanRepository repo, ICurrentUser user, ILogger<PlansController> logger)
        {
            _user = user;
            _logger = logger;
            _repo = repo;
        }

        [HttpGet]
        public IActionResult Get()
        {
            return Ok(_repo.GetPlans(_user.Id));
        }

        [HttpPost]
        public IActionResult Create([FromBody] Plan plan)
        {
            var result = _repo.CreatePlan(plan, _user.Id);
            return Created(string.Empty, result);
        }

        [HttpPut]
        public IActionResult Update([FromBody] Plan plan)
        {
            var result = _repo.UpdatePlan(plan);

            if (result == null)
            {
                return NotFound($"There is no plan with specified ID: {plan.Id}");
            }

            return Ok(result);
        }

        [HttpDelete]
        public IActionResult Delete([FromBody] Plan plan)
        {
            var result = _repo.DeletePlan(plan);

            if (result == null)
            {
                return NotFound($"There is no plan with specified ID: {plan.Id}");
            }

            return Ok(result);
        }
    }
}