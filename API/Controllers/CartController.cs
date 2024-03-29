using System.Threading.Tasks;
using API.Helpers;
using Core.Interfaces;
using Core.Models.Entities;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers
{
    public class CartController : BaseApiController
    {
        private readonly ICartServices _cartService;

        public CartController(ICartServices cartService)
        {
            _cartService = cartService;
        }

        [Cache(300)]
        [HttpGet]
        public async Task<ActionResult<CustomerBasket>> GetBasketById(string id)
        {
            var basket = await _cartService.GetBasketAsync(id);
            return Ok(basket ?? new CustomerBasket(id));
        }

        [HttpPost]
        public async Task<ActionResult<CustomerBasket>> UpdateBasket(CustomerBasket basket)
        {
            var updatedBasket = await _cartService.UpdateBasketAsync(basket);
            return Ok(updatedBasket);
        }

        [HttpDelete]
        public async Task DeleteBasketAsync(string id)
        {
            await _cartService.DeleteBasketAsync(id);
        }
    }
}