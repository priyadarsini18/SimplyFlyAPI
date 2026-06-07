using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using NUnit.Framework;
using SimplyFlyAPI.Data;
using SimplyFlyAPI.Models;
using SimplyFlyAPI.Services;
using SimplyFlyAPI.Services.Auth;

namespace SimplyFlyAPI.Tests.Services
{
    public class AuthServiceTests
    {
        private AuthService _authService = null!;
        private AppDbContext _context = null!;

        [SetUp]
        public void Setup()
        {
            var options =
                new DbContextOptionsBuilder<AppDbContext>()
                .UseInMemoryDatabase(Guid.NewGuid().ToString())
                .Options;

            _context = new AppDbContext(options);

            var config =
                new ConfigurationBuilder()
                .AddInMemoryCollection(
                    new Dictionary<string, string?>
                    {
                        { "Jwt:Key", "ThisIsMySuperSecretKeyForTesting12345" }
                    })
                .Build();

            var jwtService =
                new JwtService(config);

            _authService =
                new AuthService(
                    _context,
                    jwtService);
        }

        [Test]
        public void Register_ValidUser_ReturnsUser()
        {
            var user =
                new User
                {
                    FullName = "Priya",
                    Email = "priya@gmail.com",
                    Password = "123456",
                    Role = "User"
                };

            var result =
                _authService.Register(user);

            Assert.That(result, Is.Not.Null);
            Assert.That(result.Email,
                Is.EqualTo("priya@gmail.com"));
        }

        [Test]
        public void Login_ValidCredentials_ReturnsToken()
        {
            var user =
                new User
                {
                    FullName = "Admin",
                    Email = "admin@gmail.com",
                    Password = BCrypt.Net.BCrypt.HashPassword("123456"),
                    Role = "Admin"
                };

            _context.Users.Add(user);
            _context.SaveChanges();

            var token =
                _authService.Login(
                    "admin@gmail.com",
                    "123456");

            Assert.That(token,
                Is.Not.Empty);
        }
        [Test]
        public void Login_InvalidCredentials_ReturnsEmptyString()
        {
            var token =
                _authService.Login(
                    "wrong@gmail.com",
                    "123456");

            Assert.That(token,
                Is.EqualTo(string.Empty));
        }

        [TearDown]
        public void TearDown()
        {
            _context.Dispose();
        }
    }
}