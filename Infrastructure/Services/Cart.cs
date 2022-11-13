using System;
using System.Text.Json;
using System.Threading.Tasks;
using Core.Interfaces;
using Core.Models.Entities;
using StackExchange.Redis;

namespace Infrastructure.Services
{
    public class Cart : ICart
    {
        // private IConnectionMultiplexer _connectionMultiplexer;
        private IDatabase _database;

        public Cart(IConnectionMultiplexer connectionMultiplexer)
        {
            // _connectionMultiplexer = connectionMultiplexer;
            _database = connectionMultiplexer.GetDatabase();

        }

        public Task<bool> DeleteBasketAsync(string basketId)
        {
            return _database.KeyDeleteAsync(basketId);
        }

        public async Task<CustomerBasket> GetBasketAsync(string basketId)
        {
            var data = await _database.StringGetAsync(basketId);
            return data.IsNullOrEmpty ? null : JsonSerializer.Deserialize<CustomerBasket>(data);
        }

        public async Task<CustomerBasket> UpdateBasketAsync(CustomerBasket basket)
        {
            var created = _database.StringSetAsync(basket.Id, JsonSerializer.Serialize(basket), TimeSpan.FromDays(30));
            if (!created.Result)
            {
                return null;
            }
            return await GetBasketAsync(basket.Id);
        }
    }
}