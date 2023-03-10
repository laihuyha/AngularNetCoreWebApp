using System.Threading.Tasks;
using API.Errors;
using Core.Interfaces;
using Core.Models.Entities;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using API.Extensions;

namespace API.Controllers
{
    public class PaymentController : BaseApiController
    {
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
    }
}