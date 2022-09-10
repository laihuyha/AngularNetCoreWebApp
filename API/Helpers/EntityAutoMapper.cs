using AutoMapper;
using Core.Models.Entities;
using Core.Models.ViewModels;
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
            .ForMember(d => d.ImageUrl, o => o.MapFrom<UrlResolver>()); //Add Domain in front ImgUrl when mapping => Ex : images/a.png -> https://localhost:port/images/a.png
        }
    }
}