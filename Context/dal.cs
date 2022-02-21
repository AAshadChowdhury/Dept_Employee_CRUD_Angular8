using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;

namespace NG6_R47.Context
{
    public class dal
    {
    }
    public class dept2
    {
        [Key]
        public string deptid { get; set; }
        public string deptname { get; set; }
        public string location { get; set; }
        public IList<items2> items2 { get; set; }
    }
    public partial class items2
    {
        [Key]
        public string itemcode { get; set; }
        public string itemname { get; set; }
        [ForeignKey("dept2")]
        public string deptid { get; set; }
        [Column(TypeName = "decimal(18,4)")]
        public Nullable<decimal> cost { get; set; }
        [Column(TypeName = "decimal(18,4)")]
        public Nullable<decimal> rate { get; set; }
        public DateTime date { get; set; }
        public string picture { get; set; }
        public dept2 dept2 { get; set; }
    }
    public class exampleapp
    {
        [Key]
        public int id { get; set; }
        public string name { get; set; }
        public string category { get; set; }
        public int price { get; set; }

    }
    public class category
    {
        [Key]
        public string catid { get; set; }
        public string catname { get; set; }
        public string location { get; set; }
        public IList<book> book { get; set; }
    }
    public partial class book
    {
        [Key]
        public string bookcode { get; set; }
        public string bookname { get; set; }
        [ForeignKey("category")]
        public string catid { get; set; }
        [Column(TypeName = "decimal(18,4)")]
        public Nullable<decimal> cost { get; set; }
        [Column(TypeName = "decimal(18,4)")]
        public Nullable<decimal> rate { get; set; }
        public bool? instock { get; set; }
        public DateTime purchasedate { get; set; }
        public string picture { get; set; }
        public category category { get; set; }
    }
    public class department
    {
        [Key]
        [Required]
        public string deptid { get; set; }
        [Required]
        public string deptname { get; set; }
        [Required]
        public string location { get; set; }

        public IList<employees> employees { get; set; }
    }
    public class sections
    {
        [Key]
        public string sectionid { get; set; }
        [Required]
        public int dayOfWeek { get; set; }
        [Required]
        public TimeSpan startTime { get; set; }
        [Required]
        public TimeSpan endTime { get; set; }

        public IList<employees> employees { get; set; }

    }

    public partial class employees
    {
        [Key]
        public string employeeid { get; set; }
        [Required]
        public string employeeNo { get; set; }
        [Required]
        public string name { get; set; }
        [ForeignKey("department")]
        public string deptid { get; set; }
        [ForeignKey("sections")]
        public string permanentsectionid { get; set; }
        [Required]
        public string activesection { get; set; }
        [Required]
        public string address { get; set; }
        [Required]
        public string fatherName { get; set; }
        [Required]
        public int nationalId { get; set; }
        [Required]
        public DateTime joindate { get; set; }
        public string picture { get; set; }
        [Required]
        public bool? isActive { get; set; }
        public department department { get; set; }
        public sections sections { get; set; }
    }
    public class User
    {
        [Key]
        public int Id { get; set; }

        [Required, MinLength(3), MaxLength(50)]
        public string UserName { get; set; }

        [Required, MinLength(3), MaxLength(50)]
        public string Password { get; set; }
        public string Role { get; set; }
        public string Email { get; set; }
    }

}
