using System;
using System.Linq;
using System.Threading.Tasks;
using Core.Models.Identity;
using Microsoft.AspNetCore.Identity;
using Microsoft.Extensions.Logging;

namespace Infrastructure.Identity
{
    public class IdentitySeed
    {
        public static async Task SeedAsync(UserManager<AppUser> userManager, ILoggerFactory _loggerFactory)
        {
            try
            {
                if (!userManager.Users.Any())
                {
                    var user = new AppUser
                    {
                        DisplayName = "Huyha",
                        Email = "laihuyha@gmail.com",
                        UserName = "admin",
                        Address = new Address
                        {
                            FirstName = "Huy",
                            LastName = "Lai",
                            Street = "10 The Green",
                            City = "Boston",
                            State = "MA",
                            ZipCode = "02118"
                        }
                    };

                    await userManager.CreateAsync(user, "Pa$$w0rd");
                }
            }
            catch (Exception ex)
            {
                var logger = _loggerFactory.CreateLogger<IdentitySeed>();
                logger.LogError(ex.Message, "An error occurred seeding the DB of Indetity.");
            }
        }
    }
}