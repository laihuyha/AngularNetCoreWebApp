using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Core.Interfaces;
using Core.Models.Entities;
using Core.Models.Entities.OrderAggregate;
using Microsoft.Extensions.Configuration;
using Stripe;

namespace Infrastructure.Services
{
    public class PaymentServices : IPaymentServices
    {
        private readonly IConfiguration _config;
        private readonly ICartServices _basketRepository;
        private readonly IUnitOfWork _unitOfWork;

        public PaymentServices(ICartServices basketRepository, IUnitOfWork unitOfWork, IConfiguration config)
        {
            _unitOfWork = unitOfWork;
            _basketRepository = basketRepository;
            _config = config;
        }

        public async Task<CustomerBasket> CreateOrUpdatePaymentIntent(string basketId, string userName)
        {
            StripeConfiguration.ApiKey = _config["Stripe:SecretKey"];
            var cart = await _basketRepository.GetBasketAsync(basketId);
            if (cart == null) return null;
            var shippingPrice = 0.0;

            if (cart.DeliveryMethodId.HasValue)
            {
                var deliveryMethod = await _unitOfWork.GenericServices<DeliveryMethod>().GetById(cart.DeliveryMethodId.Value);
                shippingPrice = deliveryMethod.Cost;
            }

            foreach (var item in cart.Items)
            {
                var productItem = await _unitOfWork.GenericServices<Core.Models.Entities.Product>().GetById(item.Id);
                if (item.Price != productItem.Price)
                {
                    item.Price = productItem.Price;
                }
            }

            // Use Strip Services to create an Intent
            var service = new PaymentIntentService();

            PaymentIntent intent;

            // Check if the cart has a payment intent id we will update it else we will create a new one
            if (string.IsNullOrEmpty(cart.PaymentIntentId))
            {
                var options = new PaymentIntentCreateOptions
                {
                    Amount = (long)cart.Items.Sum(i => i.Quantity * (i.Price * 100)) + (long)shippingPrice * 100,
                    Currency = "usd",
                    PaymentMethodTypes = new List<string> { "card" },
                    Customer = userName
                };

                intent = await service.CreateAsync(options);
                cart.PaymentIntentId = intent.Id;
                cart.ClientSecret = intent.ClientSecret;
            }
            else
            {
                var options = new PaymentIntentUpdateOptions
                {
                    Amount = (long)cart.Items.Sum(i => i.Quantity * (i.Price * 100)) + (long)shippingPrice * 100
                };

                await service.UpdateAsync(cart.PaymentIntentId, options);
            }

            await _basketRepository.UpdateBasketAsync(cart);

            return cart;
        }
    }
}