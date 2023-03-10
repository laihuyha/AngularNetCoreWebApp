using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Core.Models.Entities;

namespace Core.Interfaces
{
    public interface IPaymentServices
    {
        Task<CustomerBasket> CreateOrUpdatePaymentIntent(string basketId, string userName);
    }
}