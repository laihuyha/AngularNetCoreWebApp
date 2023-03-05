using System.Collections.Generic;
using System.Threading.Tasks;
using API.DTOs.BusinessDTO;
using API.DTOs.ResponseDTO;
using API.Errors;
using API.Extensions;
using AutoMapper;
using Core.Interfaces;
using Core.Models.Entities.OrderAggregate;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers
{
    [Authorize]
    public class OrderController : BaseApiController
    {
        private readonly IOrderServices _orderServices;
        private readonly IMapper _mapper;
        public OrderController(IOrderServices orderServices, IMapper mapper)
        {
            _mapper = mapper;
            _orderServices = orderServices;
        }

        [HttpPost]
        public async Task<IActionResult> CreateOrder(OrderDto orderDto)
        {
            var email = HttpContext.User.RetrieveEmailFromPrincipal();
            var address = _mapper.Map<AddressDto, Address>(orderDto.ShipToAddress);
            var order = await _orderServices.CreateOrderAsync(email, orderDto.DeliveryMethodId, orderDto.CartId, address);
            if (order == null)
                return BadRequest(new APIMessageResponse(400, "Problem creating order"));
            return Ok(order);
        }

        [HttpGet("GetOrdersForUser")]
        public async Task<IActionResult> GetOrdersForUser()
        {
            var email = HttpContext.User.RetrieveEmailFromPrincipal();
            var orders = await _orderServices.GetUserOrdersAsync(email);
            return Ok(_mapper.Map<List<ResOrderDTO>>(orders));
        }

        [HttpGet("{id}")]
        public async Task<IActionResult> GetOrderById(int id)
        {
            var email = HttpContext.User.RetrieveEmailFromPrincipal();
            var order = await _orderServices.GetOrderByIdAsync(id, email);
            if (order == null)
                return NotFound(new APIMessageResponse(404, "Order not found"));
            return Ok(_mapper.Map<ResOrderDTO>(order));
        }

        [HttpGet("GetDeliveryMethods")]
        public async Task<IActionResult> GetDeliveryMethods()
        {
            var deliveryMethods = await _orderServices.GetDeliveryMethodsAsync();
            return Ok(deliveryMethods);
        }
    }
}