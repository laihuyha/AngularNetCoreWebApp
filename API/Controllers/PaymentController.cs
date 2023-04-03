using System.Threading.Tasks;
using API.Errors;
using Core.Interfaces;
using Core.Models.Entities;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using API.Extensions;
using System.IO;
using Stripe;
using Core.Models.Entities.OrderAggregate;

namespace API.Controllers
{
    public class PaymentController : BaseApiController
    {
        private const string _WhSecret = "";
        private readonly IPaymentServices _paymentServices;
        public PaymentController(IPaymentServices paymentServices)
        {
            _paymentServices = paymentServices;
        }

        [Authorize]
        [HttpPost("{basketId}")]
        public async Task<ActionResult<CustomerBasket>> CreateOrUpdatePaymentIntent(string basketId)
        {
            var userName = HttpContext.User.RetrieveUserNameFromPrincipal();
            var basket = await _paymentServices.CreateOrUpdatePaymentIntent(basketId, userName);
            if (basket == null) return BadRequest(new APIMessageResponse(400, "Problem with your basket"));
            return basket;
        }

        [HttpPost("webhook")]
        public async Task<IActionResult> StripeWebHook()
        {
            var json = await new StreamReader(Request.Body).ReadToEndAsync();
            var stripeEvent = EventUtility.ConstructEvent(json, Request.Headers["Stripe-Signature"], _WhSecret);

            PaymentIntent intent;
            Order order;

            switch (stripeEvent.Type)
            {
                case Events.PaymentIntentSucceeded:
                    intent = (PaymentIntent)stripeEvent.Data.Object;
                    order = await _paymentServices.UpdateOrderPaymentSucceeded(intent.Id);
                    break;
                case Events.PaymentIntentPaymentFailed:
                    intent = (PaymentIntent)stripeEvent.Data.Object;
                    order = await _paymentServices.UpdateOrderPaymentFailed(intent.Id);
                    break;
            }
            return null;
        }
    }
}