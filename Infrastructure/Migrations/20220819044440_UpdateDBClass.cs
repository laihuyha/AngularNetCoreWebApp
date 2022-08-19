using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Infrastructure.Migrations
{
    public partial class UpdateDBClass : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<string>(
                name: "CreateDate",
                table: "ProductTypes",
                type: "TEXT",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "CreatedBy",
                table: "ProductTypes",
                type: "TEXT",
                nullable: true);

            migrationBuilder.AddColumn<int>(
                name: "IsActive",
                table: "ProductTypes",
                type: "INTEGER",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "UpdateDate",
                table: "ProductTypes",
                type: "TEXT",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "UpdatedBy",
                table: "ProductTypes",
                type: "TEXT",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "CreateDate",
                table: "Products",
                type: "TEXT",
                maxLength: 20,
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "CreatedBy",
                table: "Products",
                type: "TEXT",
                maxLength: 64,
                nullable: true);

            migrationBuilder.AddColumn<int>(
                name: "IsActive",
                table: "Products",
                type: "INTEGER",
                nullable: true);

            migrationBuilder.AddColumn<int>(
                name: "Stock",
                table: "Products",
                type: "int",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.AddColumn<string>(
                name: "UpdateDate",
                table: "Products",
                type: "TEXT",
                maxLength: 20,
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "UpdatedBy",
                table: "Products",
                type: "TEXT",
                maxLength: 64,
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "CreateDate",
                table: "ProductBrands",
                type: "TEXT",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "CreatedBy",
                table: "ProductBrands",
                type: "TEXT",
                nullable: true);

            migrationBuilder.AddColumn<int>(
                name: "IsActive",
                table: "ProductBrands",
                type: "INTEGER",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "UpdateDate",
                table: "ProductBrands",
                type: "TEXT",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "UpdatedBy",
                table: "ProductBrands",
                type: "TEXT",
                nullable: true);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "CreateDate",
                table: "ProductTypes");

            migrationBuilder.DropColumn(
                name: "CreatedBy",
                table: "ProductTypes");

            migrationBuilder.DropColumn(
                name: "IsActive",
                table: "ProductTypes");

            migrationBuilder.DropColumn(
                name: "UpdateDate",
                table: "ProductTypes");

            migrationBuilder.DropColumn(
                name: "UpdatedBy",
                table: "ProductTypes");

            migrationBuilder.DropColumn(
                name: "CreateDate",
                table: "Products");

            migrationBuilder.DropColumn(
                name: "CreatedBy",
                table: "Products");

            migrationBuilder.DropColumn(
                name: "IsActive",
                table: "Products");

            migrationBuilder.DropColumn(
                name: "Stock",
                table: "Products");

            migrationBuilder.DropColumn(
                name: "UpdateDate",
                table: "Products");

            migrationBuilder.DropColumn(
                name: "UpdatedBy",
                table: "Products");

            migrationBuilder.DropColumn(
                name: "CreateDate",
                table: "ProductBrands");

            migrationBuilder.DropColumn(
                name: "CreatedBy",
                table: "ProductBrands");

            migrationBuilder.DropColumn(
                name: "IsActive",
                table: "ProductBrands");

            migrationBuilder.DropColumn(
                name: "UpdateDate",
                table: "ProductBrands");

            migrationBuilder.DropColumn(
                name: "UpdatedBy",
                table: "ProductBrands");
        }
    }
}
