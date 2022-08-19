using Core.Models.Entities;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace Infrastructure.Config
{
    public class ProductConfiguration : IEntityTypeConfiguration<Product>
    {
        public void Configure(EntityTypeBuilder<Product> builder)
        {
            builder.Property(p => p.Id).IsRequired();
            builder.Property(p => p.Name).IsRequired().HasMaxLength(100);
            builder.Property(p => p.Description);
            builder.Property(p => p.Price).HasColumnType("decimal(18,2)");
            builder.Property(p => p.ImageUrl).HasMaxLength(200);
            builder.HasOne(b => b.Brand).WithMany()
                .HasForeignKey(p => p.BrandId);
            builder.HasOne(t => t.Type).WithMany()
                .HasForeignKey(p => p.TypeId);
            builder.Property(p => p.Stock).HasColumnType("int");
            builder.Property(p=>p.CreatedBy).HasMaxLength(64);
            builder.Property(p=>p.UpdatedBy).HasMaxLength(64);
            builder.Property(p=>p.CreatedDate).HasMaxLength(20);
            builder.Property(p=>p.UpdatedDate).HasMaxLength(20);
        }
    }
}