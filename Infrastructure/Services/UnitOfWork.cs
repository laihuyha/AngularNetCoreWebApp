using System;
using System.Collections;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Core.Interfaces;
using Core.Models.Entities;
using Infrastructure.Data;

namespace Infrastructure.Services
{
    public class UnitOfWork : IUnitOfWork
    {
        private readonly ShopContext _context;
        private Hashtable _repositories;

        public UnitOfWork(ShopContext context)
        {
            this._context = context;
        }

        public async Task<int> Complete()
        {
            return await _context.SaveChangesAsync();
        }

        public void Dispose()
        {
            _context.Dispose();
            GC.SuppressFinalize(this);
        }

        public IGenericServices<TEntity> GenericServices<TEntity>() where TEntity : BaseEntity
        {
            // Check is _repositories is created
            if (_repositories == null)
            {
                _repositories = new Hashtable();
            }

            // Get the type of the entity
            var type = typeof(TEntity).Name;
            if (!_repositories.ContainsKey(type))
            {
                var repositoryType = typeof(GenericServices<>); // get the type of GenericServices

                // Create an instance of GenericServices
                var repositoryInstance = Activator.CreateInstance(repositoryType.MakeGenericType(typeof(TEntity)), _context);
                
                // Add the instance to the _repositories hashtable
                _repositories.Add(type, repositoryInstance);
            }

            return (IGenericServices<TEntity>)_repositories[type];
        }
    }
}