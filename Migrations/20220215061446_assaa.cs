using System;
using Microsoft.EntityFrameworkCore.Migrations;

namespace NG6_R47.Migrations
{
    public partial class assaa : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "department",
                columns: table => new
                {
                    deptid = table.Column<string>(type: "nvarchar(450)", nullable: false),
                    deptname = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    location = table.Column<string>(type: "nvarchar(max)", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_department", x => x.deptid);
                });

            migrationBuilder.CreateTable(
                name: "sections",
                columns: table => new
                {
                    sectionid = table.Column<string>(type: "nvarchar(450)", nullable: false),
                    dayOfWeek = table.Column<int>(type: "int", nullable: false),
                    startTime = table.Column<TimeSpan>(type: "time", nullable: false),
                    endTime = table.Column<TimeSpan>(type: "time", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_sections", x => x.sectionid);
                });

            migrationBuilder.CreateTable(
                name: "employees",
                columns: table => new
                {
                    employeeid = table.Column<string>(type: "nvarchar(450)", nullable: false),
                    employeeNo = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    name = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    deptid = table.Column<string>(type: "nvarchar(450)", nullable: true),
                    permanentsectionid = table.Column<string>(type: "nvarchar(450)", nullable: true),
                    activesection = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    address = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    fatherName = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    nationalId = table.Column<int>(type: "int", nullable: false),
                    joindate = table.Column<DateTime>(type: "datetime2", nullable: false),
                    picture = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    isActive = table.Column<bool>(type: "bit", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_employees", x => x.employeeid);
                    table.ForeignKey(
                        name: "FK_employees_department_deptid",
                        column: x => x.deptid,
                        principalTable: "department",
                        principalColumn: "deptid",
                        onDelete: ReferentialAction.Restrict);
                    table.ForeignKey(
                        name: "FK_employees_sections_permanentsectionid",
                        column: x => x.permanentsectionid,
                        principalTable: "sections",
                        principalColumn: "sectionid",
                        onDelete: ReferentialAction.Restrict);
                });

            migrationBuilder.CreateIndex(
                name: "IX_employees_deptid",
                table: "employees",
                column: "deptid");

            migrationBuilder.CreateIndex(
                name: "IX_employees_permanentsectionid",
                table: "employees",
                column: "permanentsectionid");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "employees");

            migrationBuilder.DropTable(
                name: "department");

            migrationBuilder.DropTable(
                name: "sections");
        }
    }
}
