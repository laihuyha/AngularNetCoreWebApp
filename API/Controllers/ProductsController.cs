using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Infrastructure.Data;
using Core.Models.Entities;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Core.Interfaces;
using Core.Specifications;

namespace API.Controllers
{
    [ApiController]
    [Route("api/[controller]/[action]")]
    public class ProductsController : ControllerBase
    {
        // private readonly IProductServices _productServices;
        // private readonly IBrandServices _brandServices;
        // private readonly ITypeServices _typeServices;
        private readonly IGenericServices<Product> _productServices;
        private readonly IGenericServices<ProductBrand> _brandServices;
        private readonly IGenericServices<ProductType> _typeServices;


        public ProductsController(IGenericServices<Product> productServices, IGenericServices<ProductBrand> brandServices, IGenericServices<ProductType> typeServices)
        {
            _productServices = productServices;
            _brandServices = brandServices;
            _typeServices = typeServices;
        }

        [HttpGet]
        public async Task<ActionResult<List<Product>>> GetAll()
        {
            var spec = new ProductSpecification();
            var products = await _productServices.ListSpecAsync(spec);
            return Ok(products);
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<Product>> GetProductById(int id)
        {
            var spec = new ProductSpecification(id);
            // var product = await _productServices.GetById(id);
            var product = await _productServices.GetEntityWithSpec(spec);
            return Ok(product);
        }

        [HttpGet("brands")]
        public async Task<ActionResult<List<ProductBrand>>> GetAllBrands()
        {
            var brands = await _brandServices.GetAll();
            return Ok(brands);
        }

        [HttpGet("types")]
        public async Task<ActionResult<List<ProductType>>> GetAllTypes()
        {
            var types = await _typeServices.GetAll();
            return Ok(types);
        }
    }
}