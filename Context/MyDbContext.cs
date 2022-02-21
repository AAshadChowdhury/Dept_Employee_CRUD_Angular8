using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace NG6_R47.Context
{
    public class MyDBContext : DbContext
    {
        public MyDBContext()
        { }

        public MyDBContext(DbContextOptions<MyDBContext> options)
            : base(options)
        {
        }
        public DbSet<dept2> dept2 { get; set; }
        public DbSet<items2> items2 { get; set; }
        public DbSet<exampleapp> exampleapp { get; set; }
        public DbSet<category> categories { get; set; }
        public DbSet<book> books { get;set; }
        public DbSet<department> department { get; set; }
        public DbSet<sections> sections { get; set; }
        public DbSet<employees> employees { get; set; }
        public DbSet<User> Registrations { get; set; }

    }


}
