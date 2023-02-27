using System;
using System.Threading.Tasks;
using Core.Models.Entities;

namespace Core.Interfaces
{
    /// <summary>
    /// This interface is used to create a unit of work. It is used to create a transaction
    /// and to save changes to the database.
    /// <para>
    /// Advantage of using a unit of work is that we can save changes to the database in one go instead of
    /// saving changes to the database for each entity that is created, updated or deleted in the database.
    /// And also, we can rollback the changes if there is an error in the transaction by calling the Dispose method of the unit of work
    /// and then we can call the Complete method of the unit of work to save the changes to the database.
    /// </para>
    /// We can also reuse the unit of work in multiple repositories, reduce the number of database connections and improve performance.
    /// Reduce the respository coupling with each other new entity is added to the database.
    /// We don't have to create a new unit of work for each repository because we are using a generic repository
    /// </summary>
    public interface IUnitOfWork : IDisposable
    {
        IGenericServices<TEntity> GenericServices<TEntity>() where TEntity : BaseEntity;
        /// <summary>
        /// Return number of changes made to the database
        /// </summary>
        /// <returns></returns>
        Task<int> Complete();
    }
}