using Microsoft.EntityFrameworkCore;
using NUnit.Framework;
using SimplyFlyAPI.Data;
using SimplyFlyAPI.Models;
using SimplyFlyAPI.Services.Payments;

namespace SimplyFlyAPI.Tests.Services
{
    [TestFixture]
    public class PaymentServiceTests
    {
        private PaymentService _paymentService = null!;
        private AppDbContext _context = null!;

        [SetUp]
        public void Setup()
        {
            var options =
                new DbContextOptionsBuilder<AppDbContext>()
                .UseInMemoryDatabase(Guid.NewGuid().ToString())
                .Options;

            _context = new AppDbContext(options);

            _paymentService =
                new PaymentService(_context);
        }

        //==========================================
        // Add Payment
        //==========================================

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
                _paymentService.AddPayment(payment);

            Assert.That(result, Is.Not.Null);
            Assert.That(result.PaymentStatus,
                Is.EqualTo("Success"));
        }

        [Test]
        public void AddPayment_SetsPaymentDate()
        {
            var payment =
                new Payment
                {
                    BookingId = 1,
                    Amount = 3000,
                    PaymentMethod = "Card"
                };

            var result =
                _paymentService.AddPayment(payment);

            Assert.That(
                result.PaymentDate,
                Is.Not.EqualTo(default(DateTime)));
        }

        [Test]
        public void AddPayment_SavesPaymentInDatabase()
        {
            var payment =
                new Payment
                {
                    BookingId = 1,
                    Amount = 4500,
                    PaymentMethod = "Net Banking"
                };

            _paymentService.AddPayment(payment);

            Assert.That(
                _context.Payments.Count(),
                Is.EqualTo(1));
        }

        //==========================================
        // Get Payments
        //==========================================

        [Test]
        public void GetPayments_Empty_ReturnsEmptyList()
        {
            var result =
                _paymentService.GetPayments();

            Assert.That(result, Is.Empty);
        }

        [Test]
        public void GetPayments_ReturnsAllPayments()
        {
            _context.Payments.AddRange(

                new Payment
                {
                    BookingId = 1,
                    Amount = 5000,
                    PaymentMethod = "UPI",
                    PaymentStatus = "Success"
                },

                new Payment
                {
                    BookingId = 2,
                    Amount = 7000,
                    PaymentMethod = "Card",
                    PaymentStatus = "Success"
                });

            _context.SaveChanges();

            var result =
                _paymentService.GetPayments();

            Assert.That(result.Count,
                Is.EqualTo(2));
        }

        //==========================================
        // Get Payment By Id
        //==========================================

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

            Assert.That(result!.Amount,
                Is.EqualTo(5000));
        }

        [Test]
        public void GetPaymentById_InvalidId_ReturnsNull()
        {
            var result =
                _paymentService.GetPaymentById(999);

            Assert.That(result, Is.Null);
        }

        [Test]
        public void GetPaymentById_ReturnsCorrectPaymentMethod()
        {
            var payment =
                new Payment
                {
                    BookingId = 1,
                    Amount = 6000,
                    PaymentMethod = "Debit Card"
                };

            _context.Payments.Add(payment);

            _context.SaveChanges();

            var result =
                _paymentService.GetPaymentById(
                    payment.PaymentId);

            Assert.That(
                result!.PaymentMethod,
                Is.EqualTo("Debit Card"));
        }

        [TearDown]
        public void TearDown()
        {
            _context.Dispose();
        }
    }
}