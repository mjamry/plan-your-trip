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
        private IListsRepository _repo;
        private readonly ICurrentUser _user;
        private readonly ILogger<ListsController> _logger;

        public ListsController(IListsRepository repo, ICurrentUser user, ILogger<ListsController> logger)
        {
            _user = user;
            _logger = logger;
            _repo = repo;
        }

        [HttpGet]
        public IActionResult Get()
        {
            return Ok(_repo.GetLists(_user.Id));
        }

        [HttpPost]
        public IActionResult Create([FromBody] List list)
        {
            var createdList = _repo.CreateList(list, _user.Id);
            return Created(string.Empty, createdList);
        }

        [HttpPut]
        public IActionResult Update([FromBody] List list)
        {
            var result = _repo.UpdateList(list);

            if (result == null)
            {
                return NotFound($"There is no list with specified ID: {list.Id}");
            }

            return Ok(result);
        }

        [HttpDelete]
        public IActionResult Delete([FromBody] List list)
        {
            var result = _repo.DeleteList(list);

            if (result == null)
            {
                return NotFound($"There is no list with specified ID: {list.Id}");
            }

            return Ok(result);
        }
    }
}