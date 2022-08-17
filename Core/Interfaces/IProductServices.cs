using System.Collections.Generic;
using System.Threading.Tasks;
using Core.Models.Entities;

namespace Core.Interfaces
{
    public interface IProductServices
    {
        Task<List<Product>> GetAllProductsAsync();
        Task<Product> GetProductByIdAsync(int id);
    }
}