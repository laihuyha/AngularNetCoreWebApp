using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Core.Interfaces;
using Core.Models.Entities;
using Core.Models.Entities.OrderAggregate;

namespace Infrastructure.Services
{
    public class OrderServices : IOrderServices
    {
        private readonly IGenericServices<Order> _orderServices;
        private readonly IGenericServices<DeliveryMethod> _deliveryMethodServices;
        private readonly IGenericServices<Product> _productServices;
        private readonly ICartServices _basketServices;

        public OrderServices(IGenericServices<Order> orderServices, IGenericServices<DeliveryMethod> deliveryMethodServices, IGenericServices<Product> productServices, ICartServices basketServices)
        {
            _orderServices = orderServices;
            _deliveryMethodServices = deliveryMethodServices;
            _productServices = productServices;
            _basketServices = basketServices;
        }

        public async Task<Order> CreateOrderAsync(string BuyerEmail, int DeliveryMethodId, string BasketId, Address ShippingAddress)
        {
            // get cart from the repo
            var basket = await _basketServices.GetBasketAsync(BasketId);
            // get items from the product repo
            var items = new List<OrderItem>();
            foreach (var item in basket.Items)
            {
                var productItem = await _productServices.GetById(item.Id);
                var itemOrdered = new ProductItemOrdered(productItem.Id, productItem.Name, productItem.ImageUrl);
                var orderItem = new OrderItem(itemOrdered, (double)productItem.Price, item.Quantity);

                items.Add(orderItem);
            }
            // get delivery method from repo
            var deliveryMethod = await _deliveryMethodServices.GetById(DeliveryMethodId);
            // calc subtotal
            var subtotal = items.Sum(item => item.Price * item.Quantity); // mean with each item in items list, get the price and multiply by quantity then sum all of them
            // create order
            var order = new Order(BuyerEmail, ShippingAddress, deliveryMethod, items, subtotal);
            // save to db
            // await _orderServices.Create(order);
            // return order
            return order;
        }

        public Task<List<DeliveryMethod>> GetDeliveryMethodsAsync()
        {
            throw new NotImplementedException();
        }

        public Task<Order> GetOrderByIdAsync(int OrderId, string BuyerEmail)
        {
            throw new NotImplementedException();
        }

        public Task<List<Order>> GetUserOrdersAsync(string BuyerEmail)
        {
            throw new NotImplementedException();
        }
    }
}