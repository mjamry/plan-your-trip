using System;
using System.Collections.Generic;
using System.Linq;
using trip_planner.Data.Contexts;
using Microsoft.EntityFrameworkCore;

namespace trip_planner.Data.Models
{
    public interface IListsRepository
    {
        IEnumerable<List> GetLists();
        List GetList(int id);
        List CreateList(List list, int userId);
        List UpdateList(List list);
        List DeleteList(List list);
    }

    public class ListsRepository : IListsRepository
    {
        private TripPlannerContext _context;
        public ListsRepository(TripPlannerContext context)
        {
            _context = context;
        }

        public List CreateList(List list, int userId)
        {
            _context.Lists.Add(list);

            var user = _context.Users.Where(u => u.Id == userId).FirstOrDefault();

            Console.WriteLine(user);
            _context.UserLists.Add(new UserLists()
            {
                User = user,
                    List = list
            });

            _context.SaveChanges();
            return list;
        }

        public List DeleteList(List list)
        {
            throw new System.NotImplementedException();
        }

        public List GetList(int id)
        {
            return _context.Lists.Where(l => l.Id == id).FirstOrDefault();
        }

        public IEnumerable<List> GetLists()
        {
            return _context.Lists;
        }

        public List UpdateList(List list)
        {
            throw new System.NotImplementedException();
        }
    }
}