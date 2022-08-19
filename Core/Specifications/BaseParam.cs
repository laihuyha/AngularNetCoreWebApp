namespace Core.Specifications
{
    public class BaseParam
    {
        private const int MaxPageSize = 50;
        public int DefaultSize = 15;
        public string searchText { get; set; }
        public int pageIndex { get; set; } = 1;
        public int pageSize { get => DefaultSize; set => DefaultSize = (value > MaxPageSize) ? MaxPageSize : value; }
    }
}