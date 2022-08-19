using Core.Models.Entities;

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
            x => (!parameter.brandId.HasValue || x.BrandId == parameter.brandId)
             && (!parameter.typeId.HasValue || x.TypeId == parameter.typeId)
             && (string.IsNullOrEmpty(parameter.searchText) || x.Name.Contains(parameter.searchText)))
        {
            AddInclude(x => x.Type);
            AddInclude(x => x.Brand);
            if (IsOrderAndPaging)
            {
                AddOrderBy(x => x.Name);
                ApplyPaging(parameter.pageSize * (parameter.pageIndex - 1), parameter.pageSize);
                if (!string.IsNullOrEmpty(parameter.sort))
                {
                    switch (parameter.sort)
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