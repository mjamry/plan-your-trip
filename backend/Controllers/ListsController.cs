using System.Collections.Generic;
using Microsoft.AspNetCore.Mvc;
using trip_planner.Data.Models;

namespace trip_planner.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class ListsController : ControllerBase
    {
        private IListsRepository _repo;

        public ListsController(IListsRepository repo)
        {
            _repo = repo;
        }

        [HttpGet]
        [Route("{id}")]
        public List GetList(int id)
        {
            return _repo.GetList(id);
        }

        [HttpGet]
        public IEnumerable<List> GetLists()
        {
            return _repo.GetLists();
        }

        [HttpPost]
        [Route("create")]
        public List CreateList([FromBody] List list)
        {
            return _repo.CreateList(list, 0);
        }

        [HttpPost]
        [Route("update")]
        public IActionResult UpdateList([FromBody] List list)
        {
            var result = _repo.UpdateList(list);

            if (result == null)
            {
                return NotFound($"There is no list with specified ID: {list.Id}");
            }

            return Ok(result);
        }

        [HttpPost]
        [Route("delete")]
        public IActionResult DeleteList([FromBody] List list)
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