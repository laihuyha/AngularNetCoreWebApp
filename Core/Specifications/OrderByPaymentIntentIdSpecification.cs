using System;
using System.Linq.Expressions;
using Core.Models.Entities.OrderAggregate;

namespace Core.Specifications
{
    public class OrderByPaymentIntentIdSpecification : BaseSpecifications<Order>
    {
        public OrderByPaymentIntentIdSpecification(string paymentIntentId) : base(x => x.PaymentIntentId == paymentIntentId)
        {
        }
    }
}