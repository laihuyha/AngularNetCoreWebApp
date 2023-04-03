using System.Linq;
using API.Errors;
using Core.Interfaces;
using Infrastructure.Services;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.DependencyInjection;

namespace API.Extensions
{
    public static class AppServicesExtensions
    {
        public static IServiceCollection AddAppServices(this IServiceCollection services)
        {
            // Injecting services to the application
            services.AddScoped<ITokenServices, TokenServices>();
            services.AddScoped<IProductServices, ProductServices>();
            services.AddScoped<ICartServices, CartServices>();
            services.AddScoped<IBrandServices, BrandServices>();
            services.AddScoped<IOrderServices, OrderServices>();
            services.AddScoped<ITypeServices, TypeServices>();
            services.AddScoped<IPaymentServices, PaymentServices>();
            services.AddScoped(typeof(IGenericServices<>), typeof(GenericServices<>));

            // Injecting UnitOfWork
            services.AddScoped<IUnitOfWork, UnitOfWork>();

            // Injecting ResponseCacheServices
            services.AddSingleton<IResponseCacheServices, ResponseCacheServices>();
            
            // Adding custom error response
            services.Configure<ApiBehaviorOptions>(options =>
            {
                options.InvalidModelStateResponseFactory = actionContext =>
                {
                    var errors = actionContext.ModelState
                        .Where(e => e.Value.Errors.Count > 0)
                        .SelectMany(x => x.Value.Errors)
                        .Select(x => x.ErrorMessage).ToArray();
                    return new BadRequestObjectResult(new ApiValidationErrorResponse { Errors = errors });
                };
            });

            return services;
        }
    }
}