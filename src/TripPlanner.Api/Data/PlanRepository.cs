using System;
using System.Collections.Generic;
using System.Linq;
using trip_planner.Data.Contexts;
using Microsoft.EntityFrameworkCore;

namespace trip_planner.Data.Models
{

    public class PlanRepository : IPlanRepository
    {
        private TripPlannerContext _context;
        public PlanRepository(TripPlannerContext context)
        {
            _context = context;
        }

        public Plan CreatePlan(Plan plan, Guid userId)
        {
            _context.Plans.Add(plan);
            plan.Created = DateTime.Now;
            plan.Updated = DateTime.Now;

            _context.UserPlans.Add(new UserPlans()
            {
                UserId = userId,
                Plan = plan
            });

            _context.SaveChanges();
            return plan;
        }

        public Plan DeletePlan(Plan plan)
        {
            var dbPlan = GetPlan(plan.Id);
            if(dbPlan != null){
                _context.Plans.Remove(dbPlan);
                _context.SaveChanges();
            }

            return dbPlan;
        }

        public Plan GetPlan(int id)
        {
            return _context.Plans.Where(l => l.Id == id).FirstOrDefault();
        }

        public IEnumerable<Plan> GetPlans(Guid userId)
        {
            return _context.UserPlans.Where(u => u.UserId == userId).Include(l => l.Plan).Select(l => l.Plan);
        }

        public Plan UpdatePlan(Plan plan)
        {
            var dbPlan = GetPlan(plan.Id);
            if(dbPlan != null){
                dbPlan.Name = plan.Name;
                dbPlan.Description = plan.Description;
                dbPlan.IsPrivate = plan.IsPrivate;
                dbPlan.Updated = DateTime.Now;

                _context.SaveChanges();
            }

            return dbPlan;
        }
    }
}