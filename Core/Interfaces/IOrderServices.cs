using System.Collections.Generic;
using System.Threading.Tasks;
using Core.Models.Entities.OrderAggregate;

namespace Core.Interfaces
{
    public interface IOrderServices
    {
        public Task<Order> CreateOrderAsync(string BuyerEmail, int DeliveryMethodId, string BasketId, Address ShippingAddress);
        public Task<List<Order>> GetUserOrdersAsync(string BuyerEmail);
        public Task<Order> GetOrderByIdAsync(int OrderId, string BuyerEmail);
        public Task<List<DeliveryMethod>> GetDeliveryMethodsAsync();
    }
}