using Core.Models.Entities;

namespace Core.Models.ViewModels
{
    public class ProductVM
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public string Description { get; set; }
        public decimal Price { get; set; }
        public string ImageUrl { get; set; }
        public ProductType Type { get; set; }
        public ProductBrand Brand { get; set; }
        // public string Type { get; set; }
        // public string Brand { get; set; }
        public int Stock { get; set; }
        public string CreatedBy { get; set; }
        public string UpdatedBy { get; set; }
        public string CreateDate { get; set; }
        public string UpdateDate { get; set; }
        public int IsActive { get; set; }
    }
}