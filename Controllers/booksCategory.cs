using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using NG6_R47.Context;
using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Net.Http.Headers;
using System.Threading.Tasks;

namespace NG6_R47.Controllers
{
    public class booksCategory : Controller
    {
        private MyDBContext db;
        private IHostingEnvironment _HostEnvironment;
       public booksCategory(MyDBContext _db,IHostingEnvironment HostEnvironment)
        {
            db = _db;
            _HostEnvironment = HostEnvironment;
        }
        [HttpPost]
        public async Task<IActionResult> Post(IFormFile files)
        {
            string filename = ContentDispositionHeaderValue.Parse(files.ContentDisposition).FileName.Trim('"');
            filename = this.EnsureCorrectFilename(filename);
            using (FileStream output = System.IO.File.Create(this.GetPathAndFilename(filename)))
                await files.CopyToAsync(output);
            return Ok();
        }
        private string EnsureCorrectFilename(string filename)
        {
            if (filename.Contains("\\"))
                filename = filename.Substring(filename.LastIndexOf("\\") + 1);

            return filename;
        }
        private string GetPathAndFilename(string filename)
        {
            return Path.Combine(_HostEnvironment.WebRootPath, "uploads", filename);
        }
        
        public JsonResult InsertCategory(category cat)
        {
           
            category a = new category();      
            a.catid = cat.catid;
            a.catname = cat.catname;
            a.location = cat.location;
            db.categories.Add(a);
            db.SaveChanges();
            return Json(a);
        }
        public JsonResult InsertBooks(book Book)
        {
            book B = new book();
            B.bookcode = Book.bookcode;
            B.bookname = Book.bookname;
            B.catid = Book.catid;
            B.purchasedate =DateTime.Parse (Book.purchasedate.ToShortDateString());
            B.picture = Book.picture;
            B.cost = Book.cost;
            B.rate = Book.rate;
            B.instock = Book.instock;
            db.books.Add(B);
            db.SaveChanges();
            return Json(B);
        }
        public JsonResult DeleteBooksByBookCode(string id)
        {

            List<book> st5 = db.books.Where(xx => xx.bookcode == id).ToList();
            db.books.RemoveRange(st5);

            db.SaveChanges();
            return Json("OK");
        }
        public JsonResult DeleteBooks(string id)
        {

            List<book> st5 = db.books.Where(xx => xx.catid == id).ToList();
            db.books.RemoveRange(st5);

            db.SaveChanges();
            return Json("OK");
        }
        public JsonResult DeleteAll(string id)
        {

            List<book> st5 = db.books.Where(xx => xx.catid == id).ToList();
            db.books.RemoveRange(st5);

            category st6 = db.categories.Find(id);
            if (st6 != null)
            {
                db.categories.Remove(st6);
            }
            db.SaveChanges();
            return Json("OK");
        }
        public JsonResult GetAllCategories()
        {
            var a = (from d in db.categories select new { d.catid, d.catname, d.location });
            return Json(a);
        }
        public JsonResult GetCategorybycatid(string id)
        {
            var a = (from d in db.categories where d.catid == id select new { d.catid, d.catname, d.location });
            return Json(a);
        }
        public JsonResult GetBooksbycatid(string id)
        {
            var a = (from d in db.books where d.catid == id select new { d.bookcode, d.bookname, d.cost, d.rate, d.purchasedate, d.picture,d.instock });
            return Json(a);
        }
        public JsonResult GetAllBooks()
        {
            var a = (from d in db.books select new { d.bookcode,d.bookname, d.cost, d.rate, d.purchasedate, d.picture, d.catid,d.instock });
            return Json(a);
        }

        public string GenerateCodeDP()
        {
            string a1 = "";
            string b1 = "";

            try
            {
                var a = (from det in db.categories select det.catid.Substring(3)).Max();
                int b = int.Parse(a.ToString()) + 1;
                if (b < 10)
                {
                    b1 = "000" + b.ToString();
                }
                else if (b < 100)
                {
                    b1 = "00" + b.ToString();
                }
                else if (b < 1000)
                {
                    b1 = "0" + b.ToString();
                }
                else
                {
                    b1 = b.ToString();
                }
                a1 = "DP-" + b1.ToString();
            }
            catch (Exception ex)
            {
                a1 = "AC-0001";
            }
            return a1;
        }
        public string GenerateCodeItems()
        {
            string a1 = "";
            string b1 = "";

            try
            {
                var a = (from det in db.books select det.bookcode.Substring(3)).Max();
                int b = int.Parse(a.ToString()) + 1;
                if (b < 10)
                {
                    b1 = "000" + b.ToString();
                }
                else if (b < 100)
                {
                    b1 = "00" + b.ToString();
                }
                else if (b < 1000)
                {
                    b1 = "0" + b.ToString();
                }
                else
                {
                    b1 = b.ToString();
                }
                a1 = "IT-" + b1.ToString();
            }
            catch (Exception ex)
            {
                a1 = "IT-0001";
            }
            return a1;
        }
    }
}
