using System;
using Microsoft.EntityFrameworkCore.Migrations;

namespace NG6_R47.Migrations
{
    public partial class secondtime : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "categories",
                columns: table => new
                {
                    catid = table.Column<string>(type: "nvarchar(450)", nullable: false),
                    catname = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    location = table.Column<string>(type: "nvarchar(max)", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_categories", x => x.catid);
                });

            migrationBuilder.CreateTable(
                name: "books",
                columns: table => new
                {
                    bookcode = table.Column<string>(type: "nvarchar(450)", nullable: false),
                    bookname = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    catid = table.Column<string>(type: "nvarchar(450)", nullable: true),
                    cost = table.Column<decimal>(type: "decimal(18,4)", nullable: true),
                    rate = table.Column<decimal>(type: "decimal(18,4)", nullable: true),
                    instock = table.Column<bool>(type: "bit", nullable: true),
                    purchasedate = table.Column<DateTime>(type: "datetime2", nullable: false),
                    picture = table.Column<string>(type: "nvarchar(max)", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_books", x => x.bookcode);
                    table.ForeignKey(
                        name: "FK_books_categories_catid",
                        column: x => x.catid,
                        principalTable: "categories",
                        principalColumn: "catid",
                        onDelete: ReferentialAction.Restrict);
                });

            migrationBuilder.CreateIndex(
                name: "IX_books_catid",
                table: "books",
                column: "catid");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "books");

            migrationBuilder.DropTable(
                name: "categories");
        }
    }
}
