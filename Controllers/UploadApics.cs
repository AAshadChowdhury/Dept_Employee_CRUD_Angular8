using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Net.Http.Headers;
using System.Threading.Tasks;

namespace NG6_R47.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class UploadApics : ControllerBase
    {
        private readonly IHostingEnvironment _hostingEnvironment;
        public UploadApics(IHostingEnvironment hostingEnvironment)
        {
            _hostingEnvironment = hostingEnvironment;
        }
        [HttpPost]
        public async Task<IActionResult> Post(IFormFile files)
        {
            string filename = ContentDispositionHeaderValue.Parse(files.ContentDisposition).FileName.Trim('"');
            filename = this.EnsureCorrectionFilename(filename);
            using (FileStream output = System.IO.File.Create(this.GetPathAndFilename(filename)))
                await files.CopyToAsync(output);
            return Ok();
        }
        private string EnsureCorrectionFilename(string filename)
        {
            if (filename.Contains("\\"))
                filename = filename.Substring(filename.LastIndexOf("\\") + 1);

            return filename;


        }
        private string GetPathAndFilename(string filename)
        {
            return Path.Combine(_hostingEnvironment.WebRootPath, "Uploads", filename);
        }
        [HttpGet]
        public async Task<IActionResult> Get()
        {
            return Ok("here");
        }

    }
}
