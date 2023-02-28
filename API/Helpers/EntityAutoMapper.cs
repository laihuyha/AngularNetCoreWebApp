using API.DTOs.BusinessDTO;
using API.DTOs.ResponseDTO;
using AutoMapper;
using Core.Models.Entities;
using Core.Models.Entities.OrderAggregate;
using Core.Models.ViewModels;
using static API.Helpers.UrlResolver;

namespace API.Helpers
{
    public class EntityAutoMapper : Profile
    {
        public EntityAutoMapper()
        {
            ///CreateMap<Product, ProductVM>() =>  this is Default using to map same PropertyName of 2 Class

            //Example for ext mapping.
            CreateMap<Product, ProductVM>()
            .ForMember(d => d.Brand, o => o.MapFrom(s => s.Brand))
            .ForMember(d => d.Type, o => o.MapFrom(s => s.Type))
            .ForMember(d => d.ImageUrl, o => o.MapFrom<ProductResolver>()); //Add Domain in front ImgUrl when mapping => Ex : images/a.png -> https://localhost:port/images/a.png

            CreateMap<AddressDto, Address>().ReverseMap(); // This Address is Enitity different from Address of Identity which is using in AddressDto's method (Map)
            CreateMap<Order, ResOrderDTO>()
                .ForMember(d => d.ShipType, o => o.MapFrom(s => s.ShipType.ShortName))
                .ForMember(d => d.Status, o => o.MapFrom(s => s.Status.ToString()))
                .ForMember(d=>d.ShippingPrice, o => o.MapFrom(s => s.ShipType.Cost));
            CreateMap<OrderItem, OrderItemDTO>()
                .ForMember(d => d.ProductId, o => o.MapFrom(s => s.ItemOrdered.ItemId))
                .ForMember(d => d.ProductName, o => o.MapFrom(s => s.ItemOrdered.ProductName))
                .ForMember(d => d.ImageURL, o => o.MapFrom<OrderItemResolver>());
        }
    }
}