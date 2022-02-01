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
            _context.Plan.Add(plan);
            plan.Created = DateTime.Now;
            plan.Updated = DateTime.Now;

            _context.UserPlans.Add(new UserPlans()
            {
                UserId = userId,
                Plan = plan,
                Owner = true
            });

            _context.SaveChanges();
            return plan;
        }

        public Plan DeletePlan(Plan plan)
        {
            var dbPlan = GetPlan(plan.Id);
            if(dbPlan != null){
                _context.Plan.Remove(dbPlan);
                _context.SaveChanges();
            }

            return dbPlan;
        }

        public Plan GetPlan(int id)
        {
            return _context.Plan.Where(l => l.Id == id).FirstOrDefault();
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

        public void AddUsersToShare(Plan plan, IEnumerable<Guid> users)
        {
            if (users.Count() == 0)
            {
                return;
            }

            foreach (var user in users)
            {
                _context.UserPlans.Add(new UserPlans()
                {
                    Plan = plan,
                    UserId = user,
                    Owner = false
                });
            }

            _context.SaveChanges();
        }

        public void RemoveUsersFromShare(Plan plan, IEnumerable<Guid> users)
        {
            if(users.Count() == 0)
            {
                return;
            }

            var dbShares = _context.UserPlans
                .Where(up =>
                    up.PlanId == plan.Id
                    && users.Contains(up.UserId)
                    && up.Owner == false
                ).FirstOrDefault();

            if (dbShares == null)
            {
                throw new InvalidOperationException("Plan was not shared yet");
            }

            _context.UserPlans.Remove(dbShares);
            _context.SaveChanges();
        }

        public ICollection<Guid> GetShares(int planId)
        {
            var users = _context.UserPlans
                .Where(up => up.PlanId == planId && up.Owner == false)
                .Select(up => up.UserId)
                .ToArray();

            return users;
        }
    }
}