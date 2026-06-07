using Microsoft.EntityFrameworkCore;
using NUnit.Framework;
using SimplyFlyAPI.Data;
using SimplyFlyAPI.Models;
using SimplyFlyAPI.Services.Flights;

namespace SimplyFlyAPI.Tests.Services
{
    public class FlightServiceTests
    {
        private FlightService _flightService = null!;
        private AppDbContext _context = null!;

        [SetUp]
        public void Setup()
        {
            var options =
                new DbContextOptionsBuilder<AppDbContext>()
                .UseInMemoryDatabase(Guid.NewGuid().ToString())
                .Options;

            _context = new AppDbContext(options);

            _context.Flights.AddRange(
                new Flight
                {
                    FlightId = 1,
                    FlightName = "Air India",
                    FlightNumber = "AI101",
                    FromCity = "Chennai",
                    ToCity = "Delhi",
                    Price = 5000,
                    TotalSeats = 100,
                    AvailableSeats = 50,
                    Status = "Available",
                    IsDeleted = false
                },
                new Flight
                {
                    FlightId = 2,
                    FlightName = "Indigo",
                    FlightNumber = "IN102",
                    FromCity = "Mumbai",
                    ToCity = "Bangalore",
                    Price = 4000,
                    TotalSeats = 80,
                    AvailableSeats = 40,
                    Status = "Available",
                    IsDeleted = false
                });

            _context.SaveChanges();

            _flightService = new FlightService(_context);
        }

        [Test]
        public void GetFlightById_ValidId_ReturnsFlight()
        {
            var result =
                _flightService.GetFlightById(1);

            Assert.That(result, Is.Not.Null);
            Assert.That(result!.FlightName,
                Is.EqualTo("Air India"));
        }

        [Test]
        public void GetFlightById_InvalidId_ReturnsNull()
        {
            var result =
                _flightService.GetFlightById(100);

            Assert.That(result, Is.Null);
        }

        [Test]
        public void SearchFlights_ValidRoute_ReturnsFlights()
        {
            var result =
                _flightService.SearchFlights(
                    "Chennai",
                    "Delhi");

            Assert.That(result.Count,
                Is.EqualTo(1));
        }

        [TearDown]
        public void TearDown()
        {
            _context.Dispose();
        }
    }
}