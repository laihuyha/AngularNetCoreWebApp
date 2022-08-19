using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Core.Interfaces;
using Core.Models.Entities;
using Core.Specifications;
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

        public async Task<int> CountAsync(ISpecifications<T> spec)
        {
            return await ApplySpec(spec).CountAsync();
        }

        public Task<T> Create(T entity)
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

        public async Task<T> GetById(int id)
        {
            return await _context.Set<T>().FindAsync(id);
        }

        public async Task<T> GetEntityWithSpec(ISpecifications<T> spec)
        {
            return await ApplySpec(spec).FirstOrDefaultAsync();
        }

        public async Task<List<T>> ListSpecAsync(ISpecifications<T> spec)
        {
            return await ApplySpec(spec).ToListAsync();
        }

        public Task<T> Update(T entity)
        {
            throw new NotImplementedException();
        }

        private IQueryable<T> ApplySpec(ISpecifications<T> spec)
        {
            return SpecificationEvaluator<T>.GetQuery(_context.Set<T>().AsQueryable(), spec);
        }
    }
}