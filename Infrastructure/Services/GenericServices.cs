using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Core.Interfaces;
using Core.Models.Entities;
using Infrastructure.Data;
using Microsoft.EntityFrameworkCore;

namespace Infrastructure.Services
{
    public class GenericServices<T> : IGenericServices<T> where T : BaseEntity
    {
        private readonly ShopContext _context;
        public GenericServices(ShopContext context)
        {
            _context = context;
        }

        public async Task<T> Create(T entity)
        {
            // var res = await _context.Set<T>().AddAsync(entity);
            // _context.SaveChanges();
            return null;
        }

        public Task<T> Delete(int id)
        {
            throw new NotImplementedException();
        }

        public async Task<List<T>> GetAll()
        {
            return await _context.Set<T>().ToListAsync();
        }

        public Task<T> GetById(int id)
        {
            throw new NotImplementedException();
        }

        public Task<T> Update(T entity)
        {
            throw new NotImplementedException();
        }
    }
}