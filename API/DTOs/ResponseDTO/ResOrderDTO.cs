using System;
using System.Collections.Generic;
using Core.Models.Entities.OrderAggregate;

namespace API.DTOs.ResponseDTO
{
    public class ResOrderDTO
    {
        public int Id { get; set; }
        public string BuyerEmail { get; set; }
        public DateTimeOffset OrderDate { get; set; }
        public string OrderDateNormalizer { get; set; }
        public Address ToAddress { get; set; }
        public string ShipType { get; set; }
        public double ShippingPrice { get; set; }
        public List<OrderItemDTO> OrderItems { get; set; }
        public double SubTotal { get; set; }
        public double Total { get; set; }
        public string Status { get; set; }
    }
}