using System;
using Infrastructure.Data;
using Microsoft.AspNetCore.Hosting;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using Microsoft.Extensions.Logging;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Identity;
using Core.Models.Identity;
using Infrastructure.Identity;

namespace API
{
    public class Program
    {
        public static async Task Main(string[] args)
        {
            var host = CreateHostBuilder(args).Build();
            using (var scope = host.Services.CreateScope())
            {
                var services = scope.ServiceProvider;
                var loggerFactory = services.GetRequiredService<ILoggerFactory>();
                try
                {
                    var context = services.GetRequiredService<ShopContext>();
                    var userManager = services.GetRequiredService<UserManager<AppUser>>();
                    var identityContext = services.GetRequiredService<AppIdentityDbContext>();
                    await context.Database.MigrateAsync();
                    await identityContext.Database.MigrateAsync();

                    // Seed data to the database.
                    await ShopContextSeed.SeedAsync(context, loggerFactory);
                    await IdentitySeed.SeedAsync(userManager, loggerFactory);
                    
                    context.Database.EnsureCreated();
                    identityContext.Database.EnsureCreated();
                    // Fix .NET6 and DateTime problem. Cannot write DateTime with Kind=UTC to PostgreSQL type 'timestamp without time zone'
                    // Details: https://stackoverflow.com/questions/69961449/net6-and-datetime-problem-cannot-write-datetime-with-kind-utc-to-postgresql-ty
                    AppContext.SetSwitch("Npgsql.EnableLegacyTimestampBehavior", true);
                }
                catch (Exception ex)
                {
                    var logger = loggerFactory.CreateLogger<Program>();
                    logger.LogError(ex, "An error occurred creating the DB.");
                }
            }
            host.Run();
        }

        public static IHostBuilder CreateHostBuilder(string[] args) =>
            Host.CreateDefaultBuilder(args)
                .ConfigureWebHostDefaults(webBuilder =>
                {
                    webBuilder.UseStartup<Startup>();
                });
    }
}
