using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Core.Interfaces;
using Core.Models.Entities;
using Core.Models.Entities.OrderAggregate;
using Core.Specifications;

namespace Infrastructure.Services
{
    public class OrderServices : IOrderServices
    {
        private readonly ICartServices _basketServices;
        private readonly IUnitOfWork _unitOfWork;

        #region Old Code - Before Using UnitOfWork
        // private readonly IGenericServices<Order> _orderServices;
        // private readonly IGenericServices<DeliveryMethod> _deliveryMethodServices;
        // private readonly IGenericServices<Product> _productServices;

        // public OrderServices(IGenericServices<Order> orderServices, IGenericServices<DeliveryMethod> deliveryMethodServices, IGenericServices<Product> productServices, ICartServices basketServices)
        // {
        //     _orderServices = orderServices;
        //     _deliveryMethodServices = deliveryMethodServices;
        //     _productServices = productServices;
        //     _basketServices = basketServices;
        // }
        #endregion

        public OrderServices(IUnitOfWork unitOfWork, ICartServices basketServices)
        {
            this._unitOfWork = unitOfWork;
            this._basketServices = basketServices;
        }

        public async Task<Order> CreateOrderAsync(string BuyerEmail, int DeliveryMethodId, string BasketId, Address ShippingAddress)
        {
            // get cart from the repo
            var basket = await _basketServices.GetBasketAsync(BasketId);
            // get items from the product repo
            var items = new List<OrderItem>();
            foreach (var item in basket.Items)
            {
                var productItem = await _unitOfWork.GenericServices<Product>().GetById(item.Id);
                var itemOrdered = new ProductItemOrdered(productItem.Id, productItem.Name, productItem.ImageUrl);
                var orderItem = new OrderItem(itemOrdered, (double)productItem.Price, item.Quantity);

                items.Add(orderItem);
            }
            // get delivery method from repo
            var deliveryMethod = await _unitOfWork.GenericServices<DeliveryMethod>().GetById(DeliveryMethodId);
            // calc subtotal
            var subtotal = items.Sum(item => item.Price * item.Quantity); // mean with each item in items list, get the price and multiply by quantity then sum all of them
            // check if order exists
            var spec = new OrderByPaymentIntentIdSpecification(basket.PaymentIntentId);
            var order = await _unitOfWork.GenericServices<Order>().GetEntityWithSpec(spec);
            if (order != null)
            {
                order.ToAddress = ShippingAddress;
                order.ShipType = deliveryMethod;
                order.SubTotal = subtotal;
                _unitOfWork.GenericServices<Order>().Update(order);
            }
            else
            {
                // create order
                order = new Order(BuyerEmail, ShippingAddress, deliveryMethod, items, subtotal, basket.PaymentIntentId);
                _unitOfWork.GenericServices<Order>().Create(order);
            }
            // save to db
            var result = await _unitOfWork.Complete(); // if failed, everything will be rollback to the previous state
            if (result <= 0) return null;
            // delete basket
            await _basketServices.DeleteBasketAsync(BasketId);
            // return order
            return order;
        }

        public async Task<List<DeliveryMethod>> GetDeliveryMethodsAsync()
        {
            return await _unitOfWork.GenericServices<DeliveryMethod>().GetAll();
        }

        public async Task<Order> GetOrderByIdAsync(int OrderId, string BuyerEmail)
        {
            var spec = new OrderSpecifications(OrderId, BuyerEmail);
            return await _unitOfWork.GenericServices<Order>().GetEntityWithSpec(spec);
        }

        public async Task<List<Order>> GetUserOrdersAsync(string BuyerEmail)
        {
            var spec = new OrderSpecifications(BuyerEmail);
            return await _unitOfWork.GenericServices<Order>().ListSpecAsync(spec);
        }
    }
}