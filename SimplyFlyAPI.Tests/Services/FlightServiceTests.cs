using Microsoft.EntityFrameworkCore;
using NUnit.Framework;
using SimplyFlyAPI.Data;
using SimplyFlyAPI.Models;
using SimplyFlyAPI.Services.Flights;

namespace SimplyFlyAPI.Tests.Services
{
    [TestFixture]
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
                    DepartureTime = new DateTime(2026, 7, 3, 10, 0, 0),
                    Price = 5000,
                    TotalSeats = 100,
                    AvailableSeats = 50,
                    FlightOwnerId = 1,
                    Status = "Available",
                    IsDeleted = false
                },

                new Flight
                {
                    FlightId = 2,
                    FlightName = "Indigo",
                    FlightNumber = "6E202",
                    FromCity = "Mumbai",
                    ToCity = "Bangalore",
                    DepartureTime = new DateTime(2026, 7, 4, 11, 30, 0),
                    Price = 4000,
                    TotalSeats = 80,
                    AvailableSeats = 40,
                    FlightOwnerId = 2,
                    Status = "Available",
                    IsDeleted = false
                });

            _context.Bookings.Add(

                new Booking
                {
                    BookingId = 1,
                    FlightId = 1,
                    UserId = 1,
                    NumberOfSeats = 2,
                    TotalAmount = 10000,
                    BookingStatus = "Confirmed"
                });

            _context.SaveChanges();

            _flightService =
                new FlightService(_context);
        }

        //===========================================
        // GetFlightById
        //===========================================

        [Test]
        public void GetFlightById_ExistingFlight_ReturnsFlight()
        {
            var result =
                _flightService.GetFlightById(1);

            Assert.That(result, Is.Not.Null);
            Assert.That(result!.FlightName,
                Is.EqualTo("Air India"));
        }

        [Test]
        public void GetFlightById_InvalidFlight_ReturnsNull()
        {
            var result =
                _flightService.GetFlightById(999);

            Assert.That(result, Is.Null);
        }

        //===========================================
        // SearchFlights
        //===========================================

        [Test]
        public void SearchFlights_ValidRoute_ReturnsFlight()
        {
            var result =
                _flightService.SearchFlights(
                    "Chennai",
                    "Delhi",
                    new DateTime(2026, 7, 3));

            Assert.That(result.Count,
                Is.EqualTo(1));

            Assert.That(result[0].FlightName,
                Is.EqualTo("Air India"));
        }

        [Test]
        public void SearchFlights_InvalidRoute_ReturnsEmpty()
        {
            var result =
                _flightService.SearchFlights(
                    "Chennai",
                    "Dubai",
                    new DateTime(2026, 7, 3));

            Assert.That(result.Count,
                Is.EqualTo(0));
        }

        //===========================================
        // GetFlights (Pagination)
        //===========================================

        [Test]
        public void GetFlights_ReturnsPagedFlights()
        {
            var pagination =
                new PaginationParams
                {
                    PageNumber = 1,
                    PageSize = 10
                };

            var result =
                _flightService.GetFlights(pagination);

            Assert.That(result, Is.Not.Null);

            Assert.That(result.Data.Count,
                Is.EqualTo(2));

            Assert.That(result.TotalRecords,
                Is.EqualTo(2));
        }

        //===========================================
        // My Flights
        //===========================================

        [Test]
        public void GetMyFlights_ExistingOwner_ReturnsFlights()
        {
            var result =
                _flightService.GetMyFlights(1);

            Assert.That(result.Count,
                Is.EqualTo(1));

            Assert.That(result[0].FlightOwnerId,
                Is.EqualTo(1));
        }

        [Test]
        public void GetMyFlights_InvalidOwner_ReturnsEmpty()
        {
            var result =
                _flightService.GetMyFlights(500);

            Assert.That(result.Count,
                Is.EqualTo(0));
        }
        //===========================================
        // Add Flight
        //===========================================

        [Test]
        public void AddFlight_ValidFlight_AddsFlightAndSeats()
        {
            var flight = new Flight
            {
                FlightId = 3,
                FlightName = "SpiceJet",
                FlightNumber = "SG303",
                FromCity = "Hyderabad",
                ToCity = "Goa",
                DepartureTime = new DateTime(2026, 7, 10, 8, 0, 0),
                Price = 3500,
                TotalSeats = 12,
                AvailableSeats = 12,
                FlightOwnerId = 3,
                Status = "Available",
                IsDeleted = false
            };

            _flightService.AddFlight(flight);

            var addedFlight =
                _context.Flights
                .FirstOrDefault(f => f.FlightId == 3);

            Assert.That(addedFlight, Is.Not.Null);

            Assert.That(
                _context.Seats.Count(s => s.FlightId == 3),
                Is.EqualTo(12));
        }

        //===========================================
        // Update Flight
        //===========================================

        [Test]
        public void UpdateFlight_ValidFlight_ReturnsTrue()
        {
            var updatedFlight = new Flight
            {
                FlightId = 1,
                FlightName = "Air India Express",
                FlightNumber = "AI101",
                FromCity = "Chennai",
                ToCity = "Delhi",
                Price = 6500,
                AvailableSeats = 40
            };

            var result =
                _flightService.UpdateFlight(
                    updatedFlight,
                    1);

            Assert.That(result, Is.True);

            var flight =
                _context.Flights.First(f => f.FlightId == 1);

            Assert.That(
                flight.FlightName,
                Is.EqualTo("Air India Express"));

            Assert.That(
                flight.Price,
                Is.EqualTo(6500));
        }

        [Test]
        public void UpdateFlight_InvalidOwner_ReturnsFalse()
        {
            var updatedFlight = new Flight
            {
                FlightId = 1,
                FlightName = "Modified Flight"
            };

            var result =
                _flightService.UpdateFlight(
                    updatedFlight,
                    999);

            Assert.That(result, Is.False);
        }

        //===========================================
        // Delete Flight
        //===========================================

        [Test]
        public void DeleteFlight_ValidOwner_ReturnsTrue()
        {
            var result =
                _flightService.DeleteFlight(
                    1,
                    1);

            Assert.That(result, Is.True);

            var flight =
                _context.Flights.First(f => f.FlightId == 1);

            Assert.That(
                flight.IsDeleted,
                Is.True);
        }

        [Test]
        public void DeleteFlight_InvalidOwner_ReturnsFalse()
        {
            var result =
                _flightService.DeleteFlight(
                    1,
                    500);

            Assert.That(result, Is.False);
        }

        //===========================================
        // Revenue
        //===========================================

        [Test]
        public void GetRevenue_ExistingOwner_ReturnsRevenue()
        {
            var revenue =
                _flightService.GetRevenue(1);

            Assert.That(
                revenue,
                Is.EqualTo(10000));
        }

        [Test]
        public void GetRevenue_InvalidOwner_ReturnsZero()
        {
            var revenue =
                _flightService.GetRevenue(999);

            Assert.That(
                revenue,
                Is.EqualTo(0));
        }

        //===========================================
        // Owner Bookings
        //===========================================

        [Test]
        public void GetBookingsForOwner_ReturnsBookings()
        {
            var bookings =
                _flightService.GetBookingsForOwner(1);

            Assert.That(
                bookings.Count,
                Is.EqualTo(1));
        }

        [Test]
        public void GetBookingsForOwner_InvalidOwner_ReturnsEmpty()
        {
            var bookings =
                _flightService.GetBookingsForOwner(999);

            Assert.That(
                bookings.Count,
                Is.EqualTo(0));
        }

        [TearDown]
        public void TearDown()
        {
            _context.Dispose();
        }
    }
}