using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Text.Json;
using System.Threading.Tasks;
using Core.Models.Entities;
using Microsoft.Extensions.Logging;

namespace Infrastructure.Data
{
    public class ShopContextSeed
    {
        public static async Task SeedAsync(ShopContext context, ILoggerFactory _loggerFactory)
        {
            try
            {
                if (!context.ProductBrands.Any())
                {
                    //Brand seed
                    var BrandData = File.ReadAllText("../Infrastructure/SeedData/brands.json");
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
                    var CategoryData = File.ReadAllText("../Infrastructure/SeedData/types.json");
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
                    var ProductData = File.ReadAllText("../Infrastructure/SeedData/products.json");
                    var Products = JsonSerializer.Deserialize<List<Product>>(ProductData);
                    foreach (var product in Products)
                    {
                        context.Products.Add(product);
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