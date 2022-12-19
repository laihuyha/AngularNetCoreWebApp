namespace Core.Models.Entities.OrderAggregate
{
    public class DeliveryMethod : BaseEntity
    {
        public string ShortName { get; set; }
        public string DeliveryTimeCost { get; set; }
        public string Description { get; set; }
        public double Cost { get; set; }
    }
}