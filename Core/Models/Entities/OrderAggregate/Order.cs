using System;
using System.Collections.Generic;

namespace Core.Models.Entities.OrderAggregate
{
    public class Order : BaseEntity
    {
        public Order()
        {
        }

        public Order(string buyerEmail, Address toAddress, DeliveryMethod shipType, List<OrderItem> orderItems, double subTotal, string paymentIntentId)
        {
            BuyerEmail = buyerEmail;
            ToAddress = toAddress;
            ShipType = shipType;
            OrderItems = orderItems;
            SubTotal = subTotal;
            PaymentIntentId = paymentIntentId;
        }

        public string BuyerEmail { get; set; }
        public DateTimeOffset OrderDate { get; set; } = DateTimeOffset.Now;
        public string OrderDateNormalizer { get; set; } = DateTimeOffset.Now.ToString("ddMMyyyy");
        public Address ToAddress { get; set; }
        public DeliveryMethod ShipType { get; set; }
        public List<OrderItem> OrderItems { get; set; }
        public double SubTotal { get; set; }
        public OrderStatus Status { get; set; } = OrderStatus.Pending;
        public string PaymentIntentId { get; set; }

        public double GetTotal()
        {
            return SubTotal + ShipType.Cost;
        }
    }
}