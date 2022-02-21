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
    public class deptEmployees : Controller
    {
        private MyDBContext db;
        private IHostingEnvironment _HostEnvironment;
        public deptEmployees(MyDBContext _db, IHostingEnvironment HostEnvironment)
        {
            db = _db;
            _HostEnvironment = HostEnvironment;
        }

        [HttpPost]
        public async Task<IActionResult> Post(IFormFile files)
        {
            if (files != null)
            {
                string filename = ContentDispositionHeaderValue.Parse(files.ContentDisposition).FileName.Trim('"');
                filename = this.EnsureCorrectFilename(filename);
                using (FileStream output = System.IO.File.Create(this.GetPathAndFilename(filename)))
                    await files.CopyToAsync(output);
            }
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

        public JsonResult InsertDept(department d)
        {
            department a = new department();
            a.deptid = d.deptid;
            a.deptname = d.deptname;
            a.location = d.location;
            db.department.Add(a);
            db.SaveChanges();
            return Json(a);
        }

        public JsonResult InsertEmployees(employees e)
        {
            employees a1 = new employees();
            a1.employeeid = e.employeeid;
            a1.employeeNo = e.employeeNo;
            a1.name = e.name;
            a1.deptid = e.deptid;
            a1.permanentsectionid = e.permanentsectionid;
            a1.activesection = e.activesection;
            a1.address = e.address;

            a1.fatherName = e.fatherName;
            a1.nationalId = e.nationalId;
            a1.joindate = DateTime.Parse(e.joindate.ToShortDateString());
            a1.picture = e.picture;
            a1.isActive = e.isActive;
            db.employees.Add(a1);
            db.SaveChanges();
            return Json(a1);
        }
        public JsonResult DeleteEmployeesByEmployeeId(string id)
        {
            List<employees> emp = db.employees.Where(xx => xx.employeeid == id).ToList();
            db.employees.RemoveRange(emp);
            db.SaveChanges();
            return Json(emp);
        }
        public JsonResult DeleteAllEmployess(string id)
        {

            List<employees> emp = db.employees.Where(xx => xx.deptid == id).ToList();
            db.employees.RemoveRange(emp);

            db.SaveChanges();
            return Json("OK");
        }
        public JsonResult DeleteAll(string id)
        {

            List<employees> emp = db.employees.Where(xx => xx.deptid == id).ToList();
            db.employees.RemoveRange(emp);

            department d = db.department.Find(id);
            if (d != null)
            {
                db.department.Remove(d);
            }
            db.SaveChanges();
            return Json("OK");
        }

        public JsonResult GetAllDepts()
        {
            var a = (from d in db.department select new { d.deptid, d.deptname, d.location });
            return Json(a);
        }
        public JsonResult GetAllEmployees()
        {
            var a = (from d in db.employees select new { d.employeeid, d.employeeNo, d.name, d.permanentsectionid, d.activesection, d.address, d.fatherName, d.nationalId, d.joindate, d.picture, d.deptid,d.isActive });
            return Json(a);
        }
        public JsonResult GetAllSections()
        {
            var a = (from d in db.sections select new { d.sectionid, d.dayOfWeek, d.startTime,d.endTime,d.employees });
            return Json(a);
        }
        public JsonResult GetDept(string id)
        {
            var a = (from d in db.department where d.deptid == id select new { d.deptid, d.deptname, d.location });
            return Json(a);
        }
        public JsonResult GetEmployeesbydepid(string id)
        {
            var a = (from d in db.employees where d.deptid == id select new { d.employeeid, d.employeeNo, d.name, d.permanentsectionid, d.activesection, d.address, d.fatherName, d.nationalId, d.joindate, d.picture,d.isActive });
            return Json(a);
        }
        public JsonResult GetEmployee(string id)
        {
            var a = (from d in db.employees where d.employeeid == id select d);
            return Json(a);
        }

    }
}
