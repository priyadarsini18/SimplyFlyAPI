using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.Logging.Abstractions;
using NUnit.Framework;
using SimplyFlyAPI.Data;
using SimplyFlyAPI.DTOs.Booking;
using SimplyFlyAPI.Models;
using SimplyFlyAPI.Services;
using SimplyFlyAPI.Services.Booking;
using Moq;
namespace SimplyFlyAPI.Tests.Services
{
    [TestFixture]
    public class BookingServiceTests
    {
        private BookingService _bookingService = null!;
        private AppDbContext _context = null!;
        private Mock<IEmailService> _emailMock = null!;
        [SetUp]
        public void Setup()
        {
            var options =
                new DbContextOptionsBuilder<AppDbContext>()
                .UseInMemoryDatabase(Guid.NewGuid().ToString())
                .Options;

            _context = new AppDbContext(options);
            _emailMock = new Mock<IEmailService>();
            _emailMock
    .Setup(x => x.SendTicketEmail(
        It.IsAny<string>(),
        It.IsAny<string>(),
        It.IsAny<int>(),
        It.IsAny<string>(),
        It.IsAny<string>(),
        It.IsAny<string>(),
        It.IsAny<string>(),
        It.IsAny<DateTime>(),
        It.IsAny<DateTime>(),
        It.IsAny<string>(),
        It.IsAny<string>(),
        It.IsAny<decimal>()))
    .Returns(Task.CompletedTask);

            _emailMock
                .Setup(x => x.SendCancellationEmail(
                    It.IsAny<string>(),
                    It.IsAny<string>(),
                    It.IsAny<int>(),
                    It.IsAny<string>(),
                    It.IsAny<string>(),
                    It.IsAny<string>(),
                    It.IsAny<decimal>()))
                .Returns(Task.CompletedTask);
            // Flight

            _context.Flights.Add(
                new Flight
                {
                    FlightId = 1,
                    FlightName = "Air India",
                    FlightNumber = "AI101",
                    FromCity = "Chennai",
                    ToCity = "Delhi",
                    DepartureTime = new DateTime(2026, 7, 3, 10, 0, 0),
                    ArrivalTime = new DateTime(2026, 7, 3, 12, 30, 0),
                    TotalSeats = 100,
                    AvailableSeats = 10,
                    Price = 5000
                });

            // User

            _context.Users.Add(
                new User
                {
                    UserId = 1,
                    FullName = "Priya",
                    Email = "priya@gmail.com",
                    Password = "123456"
                });

            _context.SaveChanges();



            _bookingService =
    new BookingService(
        _context,
        NullLogger<BookingService>.Instance,
        _emailMock.Object);
        }

        //==========================================
        // GetBookings
        //==========================================

        [Test]
        public void GetBookings_Empty_ReturnsEmptyList()
        {
            var result =
                _bookingService.GetBookings();

            Assert.That(result, Is.Empty);
        }

        [Test]
        public void GetBookings_ReturnsBookings()
        {
            _context.Bookings.Add(
                new Booking
                {
                    BookingId = 1,
                    FlightId = 1,
                    UserId = 1,
                    NumberOfSeats = 2,
                    TotalAmount = 10000,
                    BookingStatus = "Booked"
                });

            _context.SaveChanges();

            var result =
                _bookingService.GetBookings();

            Assert.That(result.Count,
                Is.EqualTo(1));
        }

        //==========================================
        // Book Flight
        //==========================================

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
                    booking,
                    new List<int>());

            Assert.That(result, Is.True);
            _emailMock.Verify(x => x.SendTicketEmail(
    It.IsAny<string>(),
    It.IsAny<string>(),
    It.IsAny<int>(),
    It.IsAny<string>(),
    It.IsAny<string>(),
    It.IsAny<string>(),
    It.IsAny<string>(),
    It.IsAny<DateTime>(),
    It.IsAny<DateTime>(),
    It.IsAny<string>(),
    It.IsAny<string>(),
    It.IsAny<decimal>()),
    Times.Once);
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
                    booking,
                    new List<int>());

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
                    booking,
                    new List<int>());

            Assert.That(result, Is.False);
        }

        [Test]
        public void BookFlight_ReducesAvailableSeats()
        {
            var booking =
                new Booking
                {
                    UserId = 1,
                    FlightId = 1,
                    NumberOfSeats = 3
                };

            _bookingService.BookFlight(
                booking,
                new List<int>());

            var flight =
                _context.Flights
                .First(f => f.FlightId == 1);

            Assert.That(
                flight.AvailableSeats,
                Is.EqualTo(7));
        }

        [Test]
        public void BookFlight_CalculatesTotalAmount()
        {
            var booking =
                new Booking
                {
                    UserId = 1,
                    FlightId = 1,
                    NumberOfSeats = 2
                };

            _bookingService.BookFlight(
                booking,
                new List<int>());

            Assert.That(
                booking.TotalAmount,
                Is.EqualTo(10000));
        }
        //==========================================
        // GetUserBookings
        //==========================================

        [Test]
        public void GetUserBookings_ExistingUser_ReturnsBookings()
        {
            _context.Bookings.Add(
                new Booking
                {
                    BookingId = 1,
                    UserId = 1,
                    FlightId = 1,
                    NumberOfSeats = 2,
                    TotalAmount = 10000,
                    BookingStatus = "Booked",
                    BookingDate = DateTime.Now
                });

            _context.SaveChanges();

            var result =
                _bookingService.GetUserBookings(1);

            Assert.That(result, Is.Not.Null);
            Assert.That(result.Count, Is.EqualTo(1));
            Assert.That(result[0].FlightName,
                Is.EqualTo("Air India"));
        }

        [Test]
        public void GetUserBookings_InvalidUser_ReturnsEmpty()
        {
            var result =
                _bookingService.GetUserBookings(999);

            Assert.That(result.Count,
                Is.EqualTo(0));
        }

        //==========================================
        // GetBookingById
        //==========================================

        [Test]
        public void GetBookingById_ExistingBooking_ReturnsBooking()
        {
            var booking = new Booking
            {
                BookingId = 1,
                UserId = 1,
                FlightId = 1,
                NumberOfSeats = 2,
                BookingStatus = "Booked",
                TotalAmount = 10000
            };

            _context.Bookings.Add(booking);
            _context.SaveChanges();

            var result =
                _bookingService.GetBookingById(1);

            Assert.That(result, Is.Not.Null);
            Assert.That(result.BookingId,
                Is.EqualTo(1));
        }

        [Test]
        public void GetBookingById_InvalidBooking_ReturnsNull()
        {
            var result =
                _bookingService.GetBookingById(999);

            Assert.That(result, Is.Null);
        }

        //==========================================
        // Cancel Booking
        //==========================================

        [Test]
        public async Task CancelBooking_ValidBooking_ReturnsRefundAmount()
        {
            var booking = new Booking
            {
                BookingId = 1,
                UserId = 1,
                FlightId = 1,
                NumberOfSeats = 2,
                BookingStatus = "Booked",
                PaymentStatus = "Paid",
                TotalAmount = 10000
            };

            _context.Bookings.Add(booking);
            _context.SaveChanges();

            var refund =
                await _bookingService.CancelBooking(1);

            Assert.That(refund,
                Is.EqualTo(0));

            Assert.That(
                booking.BookingStatus,
                Is.EqualTo("Cancelled"));
            _emailMock.Verify(x => x.SendCancellationEmail(
    It.IsAny<string>(),
    It.IsAny<string>(),
    It.IsAny<int>(),
    It.IsAny<string>(),
    It.IsAny<string>(),
    It.IsAny<string>(),
    It.IsAny<decimal>()),
    Times.Once);
        }

        [Test]
        public async Task CancelBooking_InvalidBooking_ReturnsMinusOne()
        {
            var refund =
                await _bookingService.CancelBooking(999);

            Assert.That(refund,
                Is.EqualTo(-1));
        }

        [Test]
        public async Task CancelBooking_IncreasesAvailableSeats()
        {
            var booking = new Booking
            {
                BookingId = 1,
                UserId = 1,
                FlightId = 1,
                NumberOfSeats = 2,
                BookingStatus = "Booked",
                PaymentStatus = "Paid",
                TotalAmount = 10000
            };

            _context.Bookings.Add(booking);
            _context.SaveChanges();

            var before =
                _context.Flights
                .First()
                .AvailableSeats;

            await _bookingService.CancelBooking(1);

            var after =
                _context.Flights
                .First()
                .AvailableSeats;

            Assert.That(after,
                Is.EqualTo(before + 2));
        }

        [Test]
        public async Task CancelBooking_CreatesRefundRequest()
        {
            var booking = new Booking
            {
                BookingId = 1,
                UserId = 1,
                FlightId = 1,
                NumberOfSeats = 2,
                BookingStatus = "Booked",
                PaymentStatus = "Paid",
                TotalAmount = 10000
            };

            _context.Bookings.Add(booking);
            _context.SaveChanges();

            await _bookingService.CancelBooking(1);

            Assert.That(
                _context.Refunds.Count(),
                Is.EqualTo(1));

            Assert.That(
                _context.Refunds.First().RefundStatus,
                Is.EqualTo("Pending"));
        }

        [TearDown]
        public void TearDown()
        {
            _context.Dispose();
        }
    }
}