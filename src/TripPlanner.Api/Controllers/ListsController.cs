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
    public class ListsController : ControllerBase
    {
        private IPlanRepository _repo;
        private readonly ICurrentUser _user;
        private readonly ILogger<ListsController> _logger;

        public ListsController(IPlanRepository repo, ICurrentUser user, ILogger<ListsController> logger)
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
        public IActionResult Create([FromBody] Plan list)
        {
            var createdList = _repo.CreatePlan(list, _user.Id);
            return Created(string.Empty, createdList);
        }

        [HttpPut]
        public IActionResult Update([FromBody] Plan list)
        {
            var result = _repo.UpdatePlan(list);

            if (result == null)
            {
                return NotFound($"There is no list with specified ID: {list.Id}");
            }

            return Ok(result);
        }

        [HttpDelete]
        public IActionResult Delete([FromBody] Plan list)
        {
            var result = _repo.DeletePlan(list);

            if (result == null)
            {
                return NotFound($"There is no list with specified ID: {list.Id}");
            }

            return Ok(result);
        }
    }
}