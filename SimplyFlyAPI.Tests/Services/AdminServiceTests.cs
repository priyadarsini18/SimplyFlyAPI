using Microsoft.EntityFrameworkCore;
using NUnit.Framework;
using SimplyFlyAPI.Data;
using SimplyFlyAPI.Models;
using SimplyFlyAPI.Services.Admin;

namespace SimplyFlyAPI.Tests.Services
{
    public class AdminServiceTests
    {
        private AdminService _adminService = null!;
        private AppDbContext _context = null!;

        [SetUp]
        public void Setup()
        {
            var options =
                new DbContextOptionsBuilder<AppDbContext>()
                .UseInMemoryDatabase(
                    Guid.NewGuid().ToString())
                .Options;

            _context =
                new AppDbContext(options);

            _context.Flights.Add(
                new Flight
                {
                    FlightId = 1,
                    FlightName = "Air India",
                    FlightNumber = "AI101",
                    FromCity = "Chennai",
                    ToCity = "Delhi",
                    TotalSeats = 100,
                    AvailableSeats = 100,
                    Price = 5000,
                    Status = "Available",
                    IsDeleted = false
                });

            _context.SaveChanges();

            _adminService =
                new AdminService(_context);
        }

        [Test]
        public void AddFlight_ValidFlight_ReturnsFlight()
        {
            var flight =
                new Flight
                {
                    FlightName = "Indigo",
                    FlightNumber = "IN101",
                    FromCity = "Mumbai",
                    ToCity = "Bangalore",
                    TotalSeats = 50,
                    Price = 4000
                };

            var result =
                _adminService.AddFlight(flight);

            Assert.That(result, Is.Not.Null);
            Assert.That(result.FlightName,
                Is.EqualTo("Indigo"));
        }

        [Test]
        public void GetFlightById_ValidId_ReturnsFlight()
        {
            var result =
                _adminService.GetFlightById(1);

            Assert.That(result, Is.Not.Null);
            Assert.That(result!.FlightName,
                Is.EqualTo("Air India"));
        }

        [Test]
        public void UpdateFlight_ValidId_ReturnsTrue()
        {
            var updatedFlight =
                new Flight
                {
                    FlightName = "Updated Flight",
                    FlightNumber = "UP101",
                    FromCity = "Chennai",
                    ToCity = "Mumbai",
                    TotalSeats = 120,
                    AvailableSeats = 120,
                    Price = 6000,
                    Status = "Available"
                };

            var result =
                _adminService.UpdateFlight(
                    1,
                    updatedFlight);

            Assert.That(result, Is.True);
        }

        [Test]
        public void DeleteFlight_ValidId_ReturnsTrue()
        {
            var result =
                _adminService.DeleteFlight(1);

            Assert.That(result, Is.True);

            var flight =
                _context.Flights.Find(1);

            Assert.That(
                flight!.IsDeleted,
                Is.True);
        }

        [Test]
        public void CancelFlight_ValidId_ReturnsTrue()
        {
            var result =
                _adminService.CancelFlight(1);

            Assert.That(result, Is.True);

            var flight =
                _context.Flights.Find(1);

            Assert.That(
                flight!.Status,
                Is.EqualTo("Cancelled"));
        }

        [TearDown]
        public void TearDown()
        {
            _context.Dispose();
        }
    }
}