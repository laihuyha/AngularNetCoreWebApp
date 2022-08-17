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
    public class ProductServices : IProductServices
    {
        private readonly ShopContext _context;
        public ProductServices(ShopContext context)
        {
            _context = context;
        }

        public async Task<List<Product>> GetAllProductsAsync()
        {
            return await _context.Products.Include(a=>a.Brand).Include(a=>a.Type).ToListAsync();
        }

        public async Task<Product> GetProductByIdAsync(int id)
        {
            return await _context.Products.Include(a=>a.Brand).Include(a=>a.Type).FirstOrDefaultAsync();
        }
    }
}