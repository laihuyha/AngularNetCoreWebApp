using System.Threading.Tasks;
using Core.Models.Entities;

namespace Core.Interfaces
{
    public interface ICart
    {
        Task<CustomerBasket> GetBasketAsync(string basketId);
        Task<CustomerBasket> UpdateBasketAsync(CustomerBasket basket);
        Task<bool> DeleteBasketAsync(string basketId);
        
    }
}