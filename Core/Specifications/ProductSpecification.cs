using Core.Models.Entities;
using Core.RequestParams;

namespace Core.Specifications
{
    public class ProductSpecification : BaseSpecifications<Product>
    {
        public ProductSpecification()
        {
            AddInclude(x => x.Type);
            AddInclude(x => x.Brand);
        }

        /// <summary>
        /// Example: Expression<Func<T, bool>> criteria == x=>x.Id == id
        /// </summary>
        /// <param name="id"></param>
        public ProductSpecification(int id) : base(x => x.Id == id)
        {
            AddInclude(x => x.Type);
            AddInclude(x => x.Brand);
        }


        public ProductSpecification(ProductSpecParam parameter, bool IsOrderAndPaging) : base(

            x => ((string.IsNullOrEmpty(parameter.searchText) || x.Name.ToLower().Contains(parameter.searchText.ToLower())))
            && (!parameter.BrandId.HasValue || x.BrandId == parameter.BrandId)
            && (!parameter.TypeId.HasValue || x.TypeId == parameter.TypeId))
        {
            AddInclude(x => x.Type);
            AddInclude(x => x.Brand);
            if (IsOrderAndPaging)
            {
                AddOrderBy(x => x.Name);
                ApplyPaging(parameter.pageSize * (parameter.pageIndex - 1), parameter.pageSize);
                if (!string.IsNullOrEmpty(parameter.Sort))
                {
                    switch (parameter.Sort)
                    {
                        case "priceAsc":
                            AddOrderBy(x => x.Price);
                            break;
                        case "priceDesc":
                            AddOrderByDescending(x => x.Price);
                            break;
                        default:
                            AddOrderBy(x => x.Name);
                            break;
                    }
                }
            }
        }
    }
}