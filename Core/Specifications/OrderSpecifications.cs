using System;
using System.Collections.Generic;
using System.Linq;
using System.Linq.Expressions;
using System.Threading.Tasks;
using Core.Models.Entities.OrderAggregate;

namespace Core.Specifications
{
    public class OrderSpecifications : BaseSpecifications<Order>
    {
        public OrderSpecifications(string email) : base(o => o.BuyerEmail == email)
        {
            AddInclude(o => o.OrderItems);
            AddInclude(o => o.ShipType);
            AddOrderByDescending(o => o.OrderDateNormalizer);
        }

        public OrderSpecifications(int OrderId, string email) : base(o => o.Id == OrderId && o.BuyerEmail == email)
        {
            AddInclude(o => o.OrderItems);
            AddInclude(o => o.ShipType);
            AddOrderByDescending(o => o.OrderDateNormalizer);
        }
    }
}