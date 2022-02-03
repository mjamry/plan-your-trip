using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using System;
using System.Collections.Generic;
using System.Linq;
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
            var plans = _repo.GetPlans(_user.Id).Where(p => p.Id == plan.Id);

            if(plans.Count() == 0)
            {
                return Unauthorized("No access rights to the plan.");
            }

            var result = _repo.UpdatePlan(plan);

            return Ok(result);
        }

        [HttpDelete]
        public IActionResult Delete([FromBody] Plan plan)
        {
            var plans = _repo.GetPlans(_user.Id).Where(p => p.Id == plan.Id);

            if (plans.Count() == 0)
            {
                return Unauthorized("No access rights to the plan.");
            }

            var result = _repo.DeletePlan(plan);

            return Ok(result);
        }

        [HttpGet]
        [Route("{planId}/share")]
        public IActionResult GetShares([FromRoute] int planId)
        {
            var plans = _repo.GetPlans(_user.Id).Where(p => p.Id == planId);

            if (plans.Count() == 0)
            {
                return Unauthorized("No access rights to the plan.");
            }

            var plan = _repo.GetPlan(planId);

            var planShares = _repo.GetShares(planId);

            return Ok(planShares);
        }

        [HttpPut]
        [Route("{planId}/share")]
        public IActionResult Share([FromRoute] int planId, [FromBody] ICollection<UserDto> usersToShare)
        {
            var plans = _repo.GetPlans(_user.Id).Where(p => p.Id == planId);

            if (plans.Count() == 0)
            {
                return Unauthorized("No access rights to the plan.");
            }

            var plan = _repo.GetPlan(planId);

            if(plan == null)
            {
                return NotFound("There is no plan with specified ID: " + planId);
            }

            var alreadyShared = _repo.GetShares(planId);
            var usersToAdd = usersToShare.Where(us => !alreadyShared.Contains(us.Id)).Select(us => us.Id);
            var usersToRemove = alreadyShared.Where(us => !usersToShare.Select(us => us.Id).Contains(us));

            _repo.AddUsersToShare(plan, usersToAdd);
            _repo.RemoveUsersFromShare(plan, usersToRemove);

            return Ok();
        }
    }
}