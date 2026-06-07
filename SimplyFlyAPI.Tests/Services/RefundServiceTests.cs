using Microsoft.EntityFrameworkCore;
using NUnit.Framework;
using SimplyFlyAPI.Data;
using SimplyFlyAPI.Models;
using SimplyFlyAPI.Services.Refunds;

namespace SimplyFlyAPI.Tests.Services
{
    public class RefundServiceTests
    {
        private RefundService _refundService = null!;
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

            _context.Bookings.Add(
                new Booking
                {
                    BookingId = 1,
                    UserId = 1,
                    FlightId = 1,
                    NumberOfSeats = 2,
                    TotalAmount = 10000
                });

            _context.SaveChanges();

            _refundService =
                new RefundService(_context);
        }

        [Test]
        public void AddRefund_ValidBooking_ReturnsRefund()
        {
            var refund =
                new Refund
                {
                    BookingId = 1,
                    RefundAmount = 5000,
                    RefundReason = "Flight Cancelled"
                };

            var result =
                _refundService.AddRefund(refund);

            Assert.That(result, Is.Not.Null);

            Assert.That(
                result.RefundStatus,
                Is.EqualTo("Processed"));
        }

        [Test]
        public void AddRefund_InvalidBooking_ThrowsException()
        {
            var refund =
                new Refund
                {
                    BookingId = 999,
                    RefundAmount = 5000,
                    RefundReason = "Flight Cancelled"
                };

            Assert.Throws<Exception>(
                () => _refundService.AddRefund(refund));
        }

        [Test]
        public void GetRefundById_ValidId_ReturnsRefund()
        {
            var refund =
                new Refund
                {
                    BookingId = 1,
                    RefundAmount = 5000,
                    RefundReason = "Cancelled",
                    RefundStatus = "Processed"
                };

            _context.Refunds.Add(refund);
            _context.SaveChanges();

            var result =
                _refundService.GetRefundById(
                    refund.RefundId);

            Assert.That(result, Is.Not.Null);
        }

        [Test]
        public void GetRefundById_InvalidId_ReturnsNull()
        {
            var result =
                _refundService.GetRefundById(
                    999);

            Assert.That(result, Is.Null);
        }

        [TearDown]
        public void TearDown()
        {
            _context.Dispose();
        }
    }
}