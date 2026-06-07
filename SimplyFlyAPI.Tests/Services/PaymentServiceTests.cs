using Microsoft.EntityFrameworkCore;
using NUnit.Framework;
using SimplyFlyAPI.Data;
using SimplyFlyAPI.Models;
using SimplyFlyAPI.Services.Payments;

namespace SimplyFlyAPI.Tests.Services
{
    public class PaymentServiceTests
    {
        private PaymentService _paymentService = null!;
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

            _paymentService =
                new PaymentService(_context);
        }

        [Test]
        public void AddPayment_ValidPayment_ReturnsPayment()
        {
            var payment =
                new Payment
                {
                    BookingId = 1,
                    Amount = 5000,
                    PaymentMethod = "UPI"
                };

            var result =
                _paymentService.AddPayment(
                    payment);

            Assert.That(result, Is.Not.Null);
            Assert.That(
                result.PaymentStatus,
                Is.EqualTo("Success"));
        }

        [Test]
        public void GetPaymentById_ValidId_ReturnsPayment()
        {
            var payment =
                new Payment
                {
                    BookingId = 1,
                    Amount = 5000,
                    PaymentMethod = "Card"
                };

            _context.Payments.Add(payment);
            _context.SaveChanges();

            var result =
                _paymentService.GetPaymentById(
                    payment.PaymentId);

            Assert.That(result, Is.Not.Null);
        }

        [Test]
        public void GetPaymentById_InvalidId_ReturnsNull()
        {
            var result =
                _paymentService.GetPaymentById(
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