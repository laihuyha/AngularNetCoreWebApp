using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Infrastructure.Data;
using Core.Models.Entities;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Core.Interfaces;

namespace API.Controllers
{
    [ApiController]
    [Route("api/[controller]/[action]")]
    public class ProductsController : ControllerBase
    {
        private readonly IProductServices _productServices;
        private readonly IBrandServices _brandServices;
        private readonly ITypeServices _typeServices;
        public ProductsController(IProductServices services, IBrandServices brandServices, ITypeServices typeServices)
        {
            _productServices = services;
            _brandServices = brandServices;
            _typeServices = typeServices;
        }

        [HttpGet]
        public async Task<ActionResult<List<Product>>> GetAll()
        {
            var products = await _productServices.GetAllProductsAsync();
            return Ok(products);
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<Product>> GetProductById(int id)
        {
            var product = await _productServices.GetProductByIdAsync(id);
            return Ok(product);
        }

        [HttpGet("brands")]
        public async Task<ActionResult<List<ProductBrand>>> GetAllBrands()
        {
            var brands = await _brandServices.GetAllBrands();
            return Ok(brands);
        }

        [HttpGet("types")]
        public async Task<ActionResult<List<ProductType>>> GetAllTypes()
        {
            var types = await _typeServices.GetAllTypes();
            return Ok(types);
        }
    }
}