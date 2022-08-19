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

        public ProductSpecification(string filter)
        {
            AddInclude(x => x.Type);
            AddInclude(x => x.Brand);
            AddOrderBy(x => x.Name);
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
    }
}