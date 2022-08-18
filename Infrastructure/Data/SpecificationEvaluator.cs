using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Core.Models.Entities;
using Core.Specifications;
using Microsoft.EntityFrameworkCore;

namespace Infrastructure.Data
{
    public class SpecificationEvaluator<TEntity> where TEntity : BaseEntity
    {
        public static IQueryable<TEntity> GetQuery(IQueryable<TEntity> inpQuery, ISpecifications<TEntity> spec)
        {
            var query = inpQuery;
            if(spec.Criteria != null){
                query = query.Where(spec.Criteria);
            }
            query = spec.Include.Aggregate(query,(current,include) => current.Include(include));
            return query;
        }
    }
}