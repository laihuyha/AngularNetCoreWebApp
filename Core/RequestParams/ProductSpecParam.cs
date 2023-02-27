namespace Core.RequestParams
{
    public class ProductSpecParam : BaseParam
    {
        public int? BrandId { get; set; }
        public int? TypeId { get; set; }
        public string Sort { get; set; }
    }
}