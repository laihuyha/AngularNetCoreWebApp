namespace Core.RequestParams
{
    public class BaseParam
    {
        private const int MaxPageSize = 50;
        public int DefaultSize = 15;
        public string _searchText;
        public string searchText { get => _searchText; set => _searchText = value.ToLower(); }
        public int pageIndex { get; set; } = 1;
        public int pageSize { get => DefaultSize; set => DefaultSize = (value > MaxPageSize) ? MaxPageSize : value; }
    }
}