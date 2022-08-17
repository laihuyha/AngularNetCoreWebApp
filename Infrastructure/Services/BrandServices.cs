using System.Collections.Generic;
using System.Threading.Tasks;
using Core.Interfaces;
using Core.Models.Entities;
using Infrastructure.Data;
using Microsoft.EntityFrameworkCore;

namespace Infrastructure.Services
{
    public class BrandServices : IBrandServices
    {
        private readonly ShopContext _context;
        public BrandServices(ShopContext context)
        {
            _context = context;
        }
        public async Task<IEnumerable<ProductBrand>> GetAllBrands()
        {
            return await _context.ProductBrands.ToListAsync();
        }
    }
}