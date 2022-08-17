using System.Collections.Generic;
using System.Threading.Tasks;
using Core.Interfaces;
using Core.Models.Entities;
using Infrastructure.Data;
using Microsoft.EntityFrameworkCore;

namespace Infrastructure.Services
{
    public class TypeServices : ITypeServices
    {
        private readonly ShopContext _context;
        public TypeServices(ShopContext context)
        {
            _context = context;
        }
        public async Task<IEnumerable<ProductType>> GetAllTypes()
        {
           return await _context.ProductTypes.ToListAsync();
        }
    }
}