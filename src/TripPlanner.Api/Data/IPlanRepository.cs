using System;
using System.Collections.Generic;

namespace trip_planner.Data.Models
{
    public interface IPlanRepository
    {
        IEnumerable<Plan> GetPlans(Guid userId);
        Plan GetPlan(int id);
        Plan CreatePlan(Plan plan, Guid userId);
        Plan UpdatePlan(Plan plan);
        Plan DeletePlan(Plan plan);
    }
}