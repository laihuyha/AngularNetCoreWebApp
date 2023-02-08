namespace Core.Models.Entities.OrderAggregate
{
    public class ProductItemOrdered
    {
        public ProductItemOrdered()
        {
        }

        public ProductItemOrdered(int itemId, string productName, string imgURL)
        {
            ItemId = itemId;
            ProductName = productName;
            ImgURL = imgURL;
        }

        public int ItemId { get; set; }
        public string ProductName { get; set; }
        public string ImgURL { get; set; }
    }
}