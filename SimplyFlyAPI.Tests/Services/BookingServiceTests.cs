using Microsoft.EntityFrameworkCore;
using NUnit.Framework;
using SimplyFlyAPI.Data;
using SimplyFlyAPI.Models;
using SimplyFlyAPI.Services.Booking;
using Microsoft.Extensions.Logging.Abstractions;

namespace SimplyFlyAPI.Tests.Services
{
    public class BookingServiceTests
    {
        private BookingService _bookingService = null!;
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
                    AvailableSeats = 10,
                    Price = 5000
                });

            _context.SaveChanges();

            _bookingService =
    new BookingService(
        _context,
        NullLogger<BookingService>.Instance);
        }

        [Test]
        public void BookFlight_ValidBooking_ReturnsTrue()
        {
            var booking =
                new Booking
                {
                    UserId = 1,
                    FlightId = 1,
                    NumberOfSeats = 2
                };

            var result =
                _bookingService.BookFlight(
                    booking);

            Assert.That(result, Is.True);
        }

        [Test]
        public void BookFlight_InvalidFlight_ReturnsFalse()
        {
            var booking =
                new Booking
                {
                    UserId = 1,
                    FlightId = 999,
                    NumberOfSeats = 2
                };

            var result =
                _bookingService.BookFlight(
                    booking);

            Assert.That(result, Is.False);
        }

        [Test]
        public void BookFlight_InsufficientSeats_ReturnsFalse()
        {
            var booking =
                new Booking
                {
                    UserId = 1,
                    FlightId = 1,
                    NumberOfSeats = 20
                };

            var result =
                _bookingService.BookFlight(
                    booking);

            Assert.That(result, Is.False);
        }

        [Test]
        public void BookFlight_SeatsReducedAfterBooking()
        {
            var booking =
                new Booking
                {
                    UserId = 1,
                    FlightId = 1,
                    NumberOfSeats = 2
                };

            _bookingService.BookFlight(
                booking);

            var flight =
                _context.Flights.First(
                    f => f.FlightId == 1);

            Assert.That(
                flight.AvailableSeats,
                Is.EqualTo(8));
        }

        [TearDown]
        public void TearDown()
        {
            _context.Dispose();
        }
    }
}