using System.Collections.Generic;
using System.Threading.Tasks;
using Core.Models.Entities;
using Microsoft.AspNetCore.Mvc;
using Core.Interfaces;
using Core.Specifications;
using AutoMapper;
using Core.Models.ViewModels;
using Microsoft.AspNetCore.Http;
using API.Errors;
using API.Helpers;

namespace API.Controllers
{
    public class ProductsController : BaseApiController
    {
        // private readonly IProductServices _productServices;
        // private readonly IBrandServices _brandServices;
        // private readonly ITypeServices _typeServices;
        private readonly IGenericServices<Product> _productServices;
        private readonly IGenericServices<ProductBrand> _brandServices;
        private readonly IGenericServices<ProductType> _typeServices;

        private readonly IMapper _mapper;

        public ProductsController(IGenericServices<Product> productServices, IGenericServices<ProductBrand> brandServices, IGenericServices<ProductType> typeServices
        , IMapper mapper)
        {
            _mapper = mapper;
            _productServices = productServices;
            _brandServices = brandServices;
            _typeServices = typeServices;
        }

        [HttpGet]
        [Route("all")]
        public async Task<ActionResult<Pagination<Product>>> GetAll([FromQuery] ProductSpecParam Params)
        {
            var spec = new ProductSpecification(Params, true);
            var products = await _productServices.ListSpecAsync(spec);

            var countSpec = new ProductSpecification(Params, false);
            var count = await _productServices.CountAsync(countSpec);

            return Ok(new Pagination<Product>(Params.pageIndex, Params.pageSize, count, products));
        }

        [HttpGet("product/{id}")]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(typeof(APIMessageResponse), StatusCodes.Status404NotFound)]
        public async Task<ActionResult<Product>> GetProductById(int id)
        {
            var spec = new ProductSpecification(id);
            var product = await _productServices.GetEntityWithSpec(spec);
            return Ok(_mapper.Map<Product, ProductVM>(product));
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