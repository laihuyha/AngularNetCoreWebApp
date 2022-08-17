using System.Collections.Generic;
using System.Threading.Tasks;
using Core.Models.Entities;

namespace Core.Interfaces
{
    public interface IBrandServices
    {
        public Task<IEnumerable<ProductBrand>> GetAllBrands();
    }
}