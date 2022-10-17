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
            services.AddScoped<IProductServices, ProductServices>();
            services.AddScoped<IBrandServices, BrandServices>();
            services.AddScoped<ITypeServices, TypeServices>();
            services.AddScoped(typeof(IGenericServices<>), typeof(GenericServices<>));
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
            services.AddScoped<ICart, Cart>();
            return services;
        }
    }
}