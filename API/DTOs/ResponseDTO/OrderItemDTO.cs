namespace API.DTOs.ResponseDTO
{
    public class OrderItemDTO
    {
        public int ProductId { get; set; }
        public string ProductName { get; set; }
        public string ImageURL { get; set; }
        public double Price { get; set; }
        public int Quantity { get; set; }
    }
}