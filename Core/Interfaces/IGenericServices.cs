using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Core.Models.Entities;
using Core.Specifications;

namespace Core.Interfaces
{
    public interface IGenericServices<T> where T : BaseEntity
    {
        public Task<List<T>> GetAll();
        public Task<T> GetById(int id);
        public Task<T> Create(T entity);
        public Task<T> Update(T entity);
        public Task<T> Delete(int id);
        public Task<T> GetEntityWithSpec(ISpecifications<T> spec);
        public Task<List<T>> ListSpecAsync(ISpecifications<T> spec);

    }
}