using AutoMapper;
using Core.Models.Entities;
using Core.Models.ViewModels;
using Microsoft.Extensions.Configuration;

namespace API.Helpers
{
    public class UrlResolver : IValueResolver<Product, ProductVM, string>
    {
        private readonly IConfiguration _config;

        public UrlResolver(IConfiguration config)
        {
            _config = config;
        }

        public string Resolve(Product source, ProductVM destination, string destMember, ResolutionContext context)
        {
            if (!string.IsNullOrEmpty(source.ImageUrl))
            {
                return _config["ApiUrl"] + source.ImageUrl;
            }
            return null;
        }
    }
}