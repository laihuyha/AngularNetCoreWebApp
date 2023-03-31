using System.Threading.Tasks;
using Core.Models.Entities;
using Core.Models.Entities.OrderAggregate;

namespace Core.Interfaces
{
    public interface IPaymentServices
    {
        Task<CustomerBasket> CreateOrUpdatePaymentIntent(string basketId, string userName);
        Task<Order> UpdateOrderPaymentSucceeded(string paymentIntentId);
        Task<Order> UpdateOrderPaymentFailed(string paymentIntentId);
    }
}