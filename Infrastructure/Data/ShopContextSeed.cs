using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Reflection;
using System.Text.Json;
using System.Threading.Tasks;
using Core.Models.Entities;
using Core.Models.Entities.OrderAggregate;
using Microsoft.Extensions.Logging;

namespace Infrastructure.Data
{
    public class ShopContextSeed
    {
        public static async Task SeedAsync(ShopContext context, ILoggerFactory _loggerFactory)
        {
            var path = Path.GetDirectoryName(Assembly.GetExecutingAssembly().Location);
            try
            {
                if (!context.ProductBrands.Any())
                {
                    //Brand seed
                    var BrandData = File.ReadAllText(path + @"/SeedData/brands.json");
                    var Brands = JsonSerializer.Deserialize<List<ProductBrand>>(BrandData);
                    foreach (var brand in Brands)
                    {
                        context.ProductBrands.Add(brand);
                    }
                    await context.SaveChangesAsync();
                }

                if (!context.ProductTypes.Any())
                {
                    //Category seed
                    var CategoryData = File.ReadAllText(path + @"/SeedData/types.json");
                    var Types = JsonSerializer.Deserialize<List<ProductType>>(CategoryData);
                    foreach (var type in Types)
                    {
                        context.ProductTypes.Add(type);
                    }
                    await context.SaveChangesAsync();
                }

                if (!context.Products.Any())
                {
                    //Product seed
                    var ProductData = File.ReadAllText(path + @"/SeedData/products.json");
                    var Products = JsonSerializer.Deserialize<List<Product>>(ProductData);
                    foreach (var product in Products)
                    {
                        context.Products.Add(product);
                    }
                    await context.SaveChangesAsync();
                }

                if (!context.DeliveryMethods.Any())
                {
                    //Product seed
                    var Data = File.ReadAllText(path + @"/SeedData/delivery.json");
                    var DeliveryMethodData = JsonSerializer.Deserialize<List<DeliveryMethod>>(Data);
                    foreach (var methods in DeliveryMethodData)
                    {
                        context.DeliveryMethods.Add(methods);
                    }
                    await context.SaveChangesAsync();
                }
            }
            catch (Exception ex)
            {
                var logger = _loggerFactory.CreateLogger<ShopContextSeed>();
                logger.LogError(ex.Message, "An error occurred seeding the DB.");
            }
        }
    }
}