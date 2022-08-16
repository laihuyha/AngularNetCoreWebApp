using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Core.Models.Entities;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace Infrastructure.Config
{
    public class ProductConfiguration : IEntityTypeConfiguration<Product>
    {
        public void Configure(EntityTypeBuilder<Product> builder)
        {
            builder.Property(a=>a.Id).IsRequired();
            builder.Property(a=>a.Name).IsRequired().HasMaxLength(100);
            builder.Property(a=>a.Description).HasMaxLength(200);
            builder.Property(a=>a.Price).HasColumnType("decimal(18,2)");
            builder.Property(a=>a.ImageUrl).HasMaxLength(200);
            builder.HasOne(a=>a.Brand).WithMany().HasForeignKey(a=>a.BrandId);
            builder.HasOne(a=>a.Type).WithMany().HasForeignKey(a=>a.TypeId);
        }
    }
}