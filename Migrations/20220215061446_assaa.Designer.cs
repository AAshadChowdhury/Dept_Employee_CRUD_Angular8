﻿// <auto-generated />
using System;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Infrastructure;
using Microsoft.EntityFrameworkCore.Metadata;
using Microsoft.EntityFrameworkCore.Migrations;
using Microsoft.EntityFrameworkCore.Storage.ValueConversion;
using NG6_R47.Context;

namespace NG6_R47.Migrations
{
    [DbContext(typeof(MyDBContext))]
    [Migration("20220215061446_assaa")]
    partial class assaa
    {
        protected override void BuildTargetModel(ModelBuilder modelBuilder)
        {
#pragma warning disable 612, 618
            modelBuilder
                .HasAnnotation("Relational:MaxIdentifierLength", 128)
                .HasAnnotation("ProductVersion", "5.0.13")
                .HasAnnotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn);

            modelBuilder.Entity("NG6_R47.Context.book", b =>
                {
                    b.Property<string>("bookcode")
                        .HasColumnType("nvarchar(450)");

                    b.Property<string>("bookname")
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("catid")
                        .HasColumnType("nvarchar(450)");

                    b.Property<decimal?>("cost")
                        .HasColumnType("decimal(18,4)");

                    b.Property<bool?>("instock")
                        .HasColumnType("bit");

                    b.Property<string>("picture")
                        .HasColumnType("nvarchar(max)");

                    b.Property<DateTime>("purchasedate")
                        .HasColumnType("datetime2");

                    b.Property<decimal?>("rate")
                        .HasColumnType("decimal(18,4)");

                    b.HasKey("bookcode");

                    b.HasIndex("catid");

                    b.ToTable("books");
                });

            modelBuilder.Entity("NG6_R47.Context.category", b =>
                {
                    b.Property<string>("catid")
                        .HasColumnType("nvarchar(450)");

                    b.Property<string>("catname")
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("location")
                        .HasColumnType("nvarchar(max)");

                    b.HasKey("catid");

                    b.ToTable("categories");
                });

            modelBuilder.Entity("NG6_R47.Context.department", b =>
                {
                    b.Property<string>("deptid")
                        .HasColumnType("nvarchar(450)");

                    b.Property<string>("deptname")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("location")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.HasKey("deptid");

                    b.ToTable("department");
                });

            modelBuilder.Entity("NG6_R47.Context.dept2", b =>
                {
                    b.Property<string>("deptid")
                        .HasColumnType("nvarchar(450)");

                    b.Property<string>("deptname")
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("location")
                        .HasColumnType("nvarchar(max)");

                    b.HasKey("deptid");

                    b.ToTable("dept2");
                });

            modelBuilder.Entity("NG6_R47.Context.employees", b =>
                {
                    b.Property<string>("employeeid")
                        .HasColumnType("nvarchar(450)");

                    b.Property<string>("activesection")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("address")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("deptid")
                        .HasColumnType("nvarchar(450)");

                    b.Property<string>("employeeNo")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("fatherName")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.Property<bool?>("isActive")
                        .IsRequired()
                        .HasColumnType("bit");

                    b.Property<DateTime>("joindate")
                        .HasColumnType("datetime2");

                    b.Property<string>("name")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.Property<int>("nationalId")
                        .HasColumnType("int");

                    b.Property<string>("permanentsectionid")
                        .HasColumnType("nvarchar(450)");

                    b.Property<string>("picture")
                        .HasColumnType("nvarchar(max)");

                    b.HasKey("employeeid");

                    b.HasIndex("deptid");

                    b.HasIndex("permanentsectionid");

                    b.ToTable("employees");
                });

            modelBuilder.Entity("NG6_R47.Context.exampleapp", b =>
                {
                    b.Property<int>("id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int")
                        .HasAnnotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn);

                    b.Property<string>("category")
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("name")
                        .HasColumnType("nvarchar(max)");

                    b.Property<int>("price")
                        .HasColumnType("int");

                    b.HasKey("id");

                    b.ToTable("exampleapp");
                });

            modelBuilder.Entity("NG6_R47.Context.items2", b =>
                {
                    b.Property<string>("itemcode")
                        .HasColumnType("nvarchar(450)");

                    b.Property<decimal?>("cost")
                        .HasColumnType("decimal(18,4)");

                    b.Property<DateTime>("date")
                        .HasColumnType("datetime2");

                    b.Property<string>("deptid")
                        .HasColumnType("nvarchar(450)");

                    b.Property<string>("itemname")
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("picture")
                        .HasColumnType("nvarchar(max)");

                    b.Property<decimal?>("rate")
                        .HasColumnType("decimal(18,4)");

                    b.HasKey("itemcode");

                    b.HasIndex("deptid");

                    b.ToTable("items2");
                });

            modelBuilder.Entity("NG6_R47.Context.sections", b =>
                {
                    b.Property<string>("sectionid")
                        .HasColumnType("nvarchar(450)");

                    b.Property<int>("dayOfWeek")
                        .HasColumnType("int");

                    b.Property<TimeSpan>("endTime")
                        .HasColumnType("time");

                    b.Property<TimeSpan>("startTime")
                        .HasColumnType("time");

                    b.HasKey("sectionid");

                    b.ToTable("sections");
                });

            modelBuilder.Entity("NG6_R47.Context.book", b =>
                {
                    b.HasOne("NG6_R47.Context.category", "category")
                        .WithMany("book")
                        .HasForeignKey("catid");

                    b.Navigation("category");
                });

            modelBuilder.Entity("NG6_R47.Context.employees", b =>
                {
                    b.HasOne("NG6_R47.Context.department", "department")
                        .WithMany("employees")
                        .HasForeignKey("deptid");

                    b.HasOne("NG6_R47.Context.sections", "sections")
                        .WithMany("employees")
                        .HasForeignKey("permanentsectionid");

                    b.Navigation("department");

                    b.Navigation("sections");
                });

            modelBuilder.Entity("NG6_R47.Context.items2", b =>
                {
                    b.HasOne("NG6_R47.Context.dept2", "dept2")
                        .WithMany("items2")
                        .HasForeignKey("deptid");

                    b.Navigation("dept2");
                });

            modelBuilder.Entity("NG6_R47.Context.category", b =>
                {
                    b.Navigation("book");
                });

            modelBuilder.Entity("NG6_R47.Context.department", b =>
                {
                    b.Navigation("employees");
                });

            modelBuilder.Entity("NG6_R47.Context.dept2", b =>
                {
                    b.Navigation("items2");
                });

            modelBuilder.Entity("NG6_R47.Context.sections", b =>
                {
                    b.Navigation("employees");
                });
#pragma warning restore 612, 618
        }
    }
}
