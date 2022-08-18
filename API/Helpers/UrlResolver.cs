using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using AutoMapper;
using Core.Models.Entities;
using Core.Models.ViewModels;
using Microsoft.Extensions.Configuration;

namespace API.Helpers
{
    public class UrlResolver
    {
        public UrlResolver()
        {
        }

        public class ProductResolver : IValueResolver<Product, ProductVM, string>
        {
            private readonly IConfiguration _configuration;
            public ProductResolver(IConfiguration configuration)
            {
                _configuration = configuration;
            }

            public string Resolve(Product source, ProductVM destination, string destMember, ResolutionContext context)
            {
                if (!string.IsNullOrEmpty(source.ImageUrl))
                {
                    //Get APIUrl in appsetting.json and append it with image url
                    return _configuration["APIUrl"] + source.ImageUrl;
                }
                return null;
            }
        }
    }
}