using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Authorization;
using trip_planner.Data.Models;

namespace trip_planner.Controllers
{
    [ApiController]
    [Route("[controller]")]
    [Authorize]
    public class ListsController : ControllerBase
    {
        private IListsRepository _repo;

        public ListsController(IListsRepository repo)
        {
            _repo = repo;
        }

        [HttpGet]
        public IActionResult Get()
        {
            return Ok(_repo.GetLists());
        }

        [HttpPost]
        public IActionResult Create([FromBody] List list)
        {
            var createdList = _repo.CreateList(list, 0);
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