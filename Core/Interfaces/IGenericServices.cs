using System.Collections.Generic;
using System.Threading.Tasks;
using Core.Models.Entities;
using Core.Specifications;

namespace Core.Interfaces
{
    public interface IGenericServices<T> where T : BaseEntity
    {
        public Task<List<T>> GetAll();
        public Task<T> GetById(int id);
        public void Create(T entity);
        public void Update(T entity);
        public void Delete(int id);
        public Task<T> GetEntityWithSpec(ISpecifications<T> spec);
        public Task<List<T>> ListSpecAsync(ISpecifications<T> spec);
        public Task<int> CountAsync(ISpecifications<T> spec);
    }
}