using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Azure.Documents;
using Microsoft.Extensions.Configuration;
using Microsoft.IdentityModel.Tokens;
using NG6_R47.Context;
using System;
using System.Collections.Generic;
using System.IdentityModel.Tokens.Jwt;
using System.Linq;
using System.Security.Claims;
using System.Text;
using System.Threading.Tasks;
using User = NG6_R47.Context.User;

namespace NG6_R47.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    [AllowAnonymous]
    public class LoginController : ControllerBase
    {
        private MyDBContext db;
        private IConfiguration _config;
        public LoginController(MyDBContext _db, IConfiguration config)
        {
            _config = config;
            db = _db;
        }

        [System.Web.Http.HttpPost]
        public IActionResult Login([System.Web.Http.FromBody] User login)
        {
            IActionResult response = Unauthorized();
            var user = AuthenticateUser(login);
            if (user != null)
            {
                var tokenString = GenerateJSONWebToken(user);
                response = Ok(new { token = tokenString });
            }
            return response;
        }
        private string GenerateJSONWebToken(User userInfo)
        {
            var securityKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(_config["Jwt:Key"]));
            var credentials = new SigningCredentials(securityKey, SecurityAlgorithms.HmacSha256);
            var claims = new[] {
 new Claim(JwtRegisteredClaimNames.Sub,userInfo.UserName),
 new Claim(JwtRegisteredClaimNames.Email,userInfo.Email),
 new Claim(JwtRegisteredClaimNames.Jti, Guid.NewGuid().ToString())
 };
            var token = new JwtSecurityToken(_config["Jwt:Issuer"],
            _config["Jwt:Issuer"],
            claims,
            expires: DateTime.Now.AddMinutes(120),
            signingCredentials: credentials);
            return new JwtSecurityTokenHandler().WriteToken(token);
        }
        private User AuthenticateUser(User login)
        {
            User user = new User();
            var a = db.Registrations.Where(xx => xx.UserName == login.UserName && xx.Password == login.Password).FirstOrDefault();
            if (a != null)
            {
                user.UserName = a.UserName;
                user.Email = a?.Email;
            }
            return user;
        }

    }
}
