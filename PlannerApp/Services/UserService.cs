using Microsoft.Extensions.Options;
using Microsoft.IdentityModel.Tokens;
using PlannerApp.Helpers;
using PlannerApp.Models;
using PlannerApp.Models.Generic;
using PlannerApp.Repository;
using PlannerApp.Services.Abstractions;
using System;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;

namespace PlannerApp.Services
{
    public class UserService : IUserService
    {
        private readonly IRepository<Employee> _employeeRepository;
        private readonly AppSettings _appSettings;

        public UserService(IRepository<Employee> employeeRepository, IOptions<AppSettings> appSettings)
        {
            _employeeRepository = employeeRepository;
            _appSettings = appSettings.Value;
        }

        public Employee Authenticate(string username, string password)
        {
            var user = _employeeRepository.FindFirstBy(x => x.Username == username && x.Password == password);

            // return null if user not found
            if (user == null)
                return null;

            // authentication successful so generate jwt token
            var tokenHandler = new JwtSecurityTokenHandler();
            var key = Encoding.ASCII.GetBytes(_appSettings.Secret);
            var tokenDescriptor = new SecurityTokenDescriptor
            {
                Subject = new ClaimsIdentity(new Claim[]
                {
                    new Claim(ClaimTypes.Name, user.Id.ToString()),
                    new Claim(ClaimTypes.Role, user.Role)
                }),
                Expires = DateTime.UtcNow.AddDays(7),
                SigningCredentials = new SigningCredentials(new SymmetricSecurityKey(key), SecurityAlgorithms.HmacSha256Signature)
            };
            var token = tokenHandler.CreateToken(tokenDescriptor);
            user.Token = tokenHandler.WriteToken(token);
            //_employeeRepository.Update(user);
            return user.WithoutPassword();
        }

        public Employee AuthenticateWithCreation(string username, string password)
        {
            var user = new Employee { Username = username, Password = password, Role = Role.JuniorDeveloper };
            _employeeRepository.Insert(user);

            // authentication successful so generate jwt token
            var tokenHandler = new JwtSecurityTokenHandler();
            var key = Encoding.ASCII.GetBytes(_appSettings.Secret);
            var tokenDescriptor = new SecurityTokenDescriptor
            {
                Subject = new ClaimsIdentity(new Claim[]
                {
                    new Claim(ClaimTypes.Name, user.Id.ToString()),
                    new Claim(ClaimTypes.Role, user.Role)
                }),
                Expires = DateTime.UtcNow.AddDays(7),
                SigningCredentials = new SigningCredentials(new SymmetricSecurityKey(key), SecurityAlgorithms.HmacSha256Signature)
            };
            var token = tokenHandler.CreateToken(tokenDescriptor);
            user.Token = tokenHandler.WriteToken(token);
            //_employeeRepository.Update(user);
            return user.WithoutPassword();
        }

        public Employee GetById(int userId)
        {
            return _employeeRepository.GetById(userId);
        }
    }
}

