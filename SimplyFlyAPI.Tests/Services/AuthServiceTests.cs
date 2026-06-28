using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using NUnit.Framework;
using SimplyFlyAPI.Data;
using SimplyFlyAPI.Models;
using SimplyFlyAPI.Services;
using SimplyFlyAPI.Services.Auth;

namespace SimplyFlyAPI.Tests.Services
{
    [TestFixture]
    public class AuthServiceTests
    {
        private AuthService _authService = null!;
        private AppDbContext _context = null!;
        private JwtService _jwtService = null!;

        [SetUp]
        public void Setup()
        {
            var options = new DbContextOptionsBuilder<AppDbContext>()
                .UseInMemoryDatabase(Guid.NewGuid().ToString())
                .Options;

            _context = new AppDbContext(options);

            var configuration = new ConfigurationBuilder()
                .AddInMemoryCollection(new Dictionary<string, string?>
                {
                    { "Jwt:Key", "ThisIsMySuperSecretKeyForTesting12345" }
                })
                .Build();

            _jwtService = new JwtService(configuration);

            _authService = new AuthService(
                _context,
                _jwtService);
        }

        [TearDown]
        public void TearDown()
        {
            _context.Dispose();
        }

        // ===========================
        // REGISTER TESTS
        // ===========================

        [Test]
        public void Register_ValidUser_ReturnsUser()
        {
            var user = new User
            {
                FullName = "Priya",
                Email = "priya@gmail.com",
                Password = "123456",
                Role = "User"
            };

            var result = _authService.Register(user);

            Assert.That(result, Is.Not.Null);
            Assert.That(result.Email, Is.EqualTo("priya@gmail.com"));
            Assert.That(result.Password, Is.Not.EqualTo("123456"));
        }

        [Test]
        public void Register_UserPassword_IsHashed()
        {
            var user = new User
            {
                FullName = "John",
                Email = "john@gmail.com",
                Password = "mypassword",
                Role = "User"
            };

            var result = _authService.Register(user);

            Assert.That(
                BCrypt.Net.BCrypt.Verify(
                    "mypassword",
                    result.Password),
                Is.True);
        }

        // ===========================
        // LOGIN TESTS
        // ===========================

        [Test]
        public void Login_ValidCredentials_ReturnsJwtToken()
        {
            var user = new User
            {
                FullName = "Admin",
                Email = "admin@gmail.com",
                Password = BCrypt.Net.BCrypt.HashPassword("123456"),
                Role = "Admin",
                IsEmailVerified = true
            };

            _context.Users.Add(user);
            _context.SaveChanges();

            var token = _authService.Login(
                "admin@gmail.com",
                "123456");

            Assert.That(token, Is.Not.Empty);
            Assert.That(token, Does.StartWith("eyJ"));
        }

        [Test]
        public void Login_UserNotFound_ReturnsEmptyString()
        {
            var token = _authService.Login(
                "unknown@gmail.com",
                "123456");

            Assert.That(token, Is.EqualTo(string.Empty));
        }

        [Test]
        public void Login_WrongPassword_ReturnsEmptyString()
        {
            var user = new User
            {
                FullName = "Admin",
                Email = "admin@gmail.com",
                Password = BCrypt.Net.BCrypt.HashPassword("123456"),
                Role = "Admin",
                IsEmailVerified = true
            };

            _context.Users.Add(user);
            _context.SaveChanges();

            var token = _authService.Login(
                "admin@gmail.com",
                "wrongpassword");

            Assert.That(token, Is.EqualTo(string.Empty));
        }

        [Test]
        public void Login_EmailNotVerified_ReturnsEmailNotVerified()
        {
            var user = new User
            {
                FullName = "Priya",
                Email = "priya@gmail.com",
                Password = BCrypt.Net.BCrypt.HashPassword("123456"),
                Role = "User",
                IsEmailVerified = false
            };

            _context.Users.Add(user);
            _context.SaveChanges();

            var result = _authService.Login(
                "priya@gmail.com",
                "123456");

            Assert.That(result, Is.EqualTo("EMAIL_NOT_VERIFIED"));
        }

        // ===========================
        // GET USER TESTS
        // ===========================

        [Test]
        public void GetUserByEmail_ExistingUser_ReturnsUser()
        {
            var user = new User
            {
                FullName = "Priya",
                Email = "priya@gmail.com",
                Password = "123456",
                Role = "User"
            };

            _context.Users.Add(user);
            _context.SaveChanges();

            var result = _authService.GetUserByEmail(
                "priya@gmail.com");

            Assert.That(result, Is.Not.Null);
            Assert.That(result.Email,
                Is.EqualTo("priya@gmail.com"));
        }

        [Test]
        public void GetUserByEmail_UserNotFound_ReturnsNull()
        {
            var result =
                _authService.GetUserByEmail(
                    "notfound@gmail.com");

            Assert.That(result, Is.Null);
        }
    }
}