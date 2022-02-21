using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace NG6_R47.Controllers
{
    public class MyChat : Controller
    {
        public IActionResult Index()
        {
            return View();
        }
    }
}
