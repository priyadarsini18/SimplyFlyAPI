using SimplyFlyAPI.Data;
using SimplyFlyAPI.Models;

namespace SimplyFlyAPI.Services.Payments
{
    public class PaymentService
        : IPaymentService
    {
        private readonly AppDbContext _context;

        public PaymentService(
            AppDbContext context)
        {
            _context = context;
        }

        public List<Payment> GetPayments()
        {
            return _context.Payments.ToList();
        }

        public Payment AddPayment(
            Payment payment)
        {
            payment.PaymentStatus =
                "Success";

            payment.PaymentDate =
                DateTime.Now;

            _context.Payments.Add(payment);

            _context.SaveChanges();

            return payment;
        }

        public Payment? GetPaymentById(
            int id)
        {
            return _context.Payments.Find(id);
        }
    }
}