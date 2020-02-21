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
            list.Created = DateTime.Now;
            list.Updated = DateTime.Now;

            var user = _context.Users.Where(u => u.Id == userId).FirstOrDefault();

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
            var dbList = GetList(list.Id);
            if(dbList != null){
                _context.Lists.Remove(dbList);
                _context.SaveChanges();
            }

            return dbList;
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
            var dbList = GetList(list.Id);
            if(dbList != null){
                dbList.Name = list.Name;
                dbList.Description = list.Description;
                dbList.IsPrivate = list.IsPrivate;
                dbList.Updated = DateTime.Now;

                _context.SaveChanges();
            }

            return dbList;
        }
    }
}