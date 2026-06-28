using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using NUnit.Framework;
using SimplyFlyAPI.Data;
using SimplyFlyAPI.Models;
using SimplyFlyAPI.Services;
using SimplyFlyAPI.Services.Refunds;
using Moq;
namespace SimplyFlyAPI.Tests.Services
{
    [TestFixture]
    public class RefundServiceTests
    {
        private RefundService _refundService = null!;
        private AppDbContext _context = null!;
        private Mock<IEmailService> _emailMock = null!;
        [SetUp]
        public void Setup()
        {
            var options =
                new DbContextOptionsBuilder<AppDbContext>()
                .UseInMemoryDatabase(Guid.NewGuid().ToString())
                .Options;

            _context =
                new AppDbContext(options);
            _emailMock = new Mock<IEmailService>();
            _emailMock
    .Setup(x => x.SendRefundApprovedEmail(
        It.IsAny<string>(),
        It.IsAny<string>(),
        It.IsAny<int>(),
        It.IsAny<decimal>()))
    .Returns(Task.CompletedTask);

            // User

            _context.Users.Add(
                new User
                {
                    UserId = 1,
                    FullName = "Priya",
                    Email = "priya@gmail.com"
                });

            // Booking

            _context.Bookings.Add(
                new Booking
                {
                    BookingId = 1,
                    UserId = 1,
                    FlightId = 1,
                    NumberOfSeats = 2,
                    TotalAmount = 10000,
                    PaymentStatus = "Paid"
                });

            _context.SaveChanges();
            _refundService =
    new RefundService(
        _context,
        _emailMock.Object);

        }

        //==========================================
        // Add Refund
        //==========================================

        [Test]
        public void AddRefund_ValidBooking_ReturnsRefund()
        {
            var refund =
                new Refund
                {
                    BookingId = 1,
                    RefundReason = "Flight Cancelled"
                };

            var result =
                _refundService.AddRefund(refund);

            Assert.That(result, Is.Not.Null);

            Assert.That(
                result.RefundStatus,
                Is.EqualTo("Pending"));

            Assert.That(
                result.RefundAmount,
                Is.EqualTo(10000));
        }

        [Test]
        public void AddRefund_InvalidBooking_ThrowsException()
        {
            var refund =
                new Refund
                {
                    BookingId = 999,
                    RefundReason = "Cancelled"
                };

            Assert.Throws<Exception>(
                () => _refundService.AddRefund(refund));
        }

        //==========================================
        // Get Refund
        //==========================================

        [Test]
        public void GetRefundById_ValidId_ReturnsRefund()
        {
            var refund =
                new Refund
                {
                    BookingId = 1,
                    RefundAmount = 5000,
                    RefundReason = "Cancelled",
                    RefundStatus = "Pending"
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

        //==========================================
        // Get Refunds
        //==========================================

        [Test]
        public void GetRefunds_ReturnsRefunds()
        {
            _context.Refunds.Add(
                new Refund
                {
                    BookingId = 1,
                    RefundAmount = 10000,
                    RefundStatus = "Pending"
                });

            _context.SaveChanges();

            var result =
                _refundService.GetRefunds();

            Assert.That(result.Count,
                Is.EqualTo(1));
        }

        [Test]
        public void GetRefunds_Empty_ReturnsEmptyList()
        {
            var newOptions =
                new DbContextOptionsBuilder<AppDbContext>()
                .UseInMemoryDatabase(Guid.NewGuid().ToString())
                .Options;

            using var db =
                new AppDbContext(newOptions);

            var configuration =
                new ConfigurationBuilder()
                .AddInMemoryCollection(
                    new Dictionary<string, string?>
                    {
                        {"MailSettings:Mail","test@gmail.com"},
                        {"MailSettings:Password","test"},
                        {"MailSettings:Host","smtp.gmail.com"},
                        {"MailSettings:Port","587"}
                    })
                .Build();

            var email =
                new EmailService(
                    configuration,
                    new TicketPdfService());

            var service =
                new RefundService(
                    db,
                    email);

            var result =
                service.GetRefunds();

            Assert.That(result,
                Is.Empty);
        }

        //==========================================
        // Process Refund
        //==========================================

        [Test]
        public async Task ProcessRefund_InvalidRefund_ReturnsFalse()
        {
            var result =
                await _refundService.ProcessRefund(
                    999,
                    5000);

            Assert.That(result,
                Is.False);
        }

        [Test]
        public async Task ProcessRefund_ValidRefund_ReturnsTrue()
        {
            var refund =
                new Refund
                {
                    BookingId = 1,
                    RefundAmount = 0,
                    RefundStatus = "Pending"
                };

            _context.Refunds.Add(refund);

            _context.SaveChanges();

            var result =
                await _refundService.ProcessRefund(
                    refund.RefundId,
                    8000);

            Assert.That(result,
                Is.True);

            Assert.That(
                refund.RefundStatus,
                Is.EqualTo("Processed"));

            Assert.That(
                refund.RefundAmount,
                Is.EqualTo(8000));
        }

        [TearDown]
        public void TearDown()
        {
            _context.Dispose();
        }
    }
}