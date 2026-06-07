using SimplyFlyAPI.Models;

namespace SimplyFlyAPI.Services.Payments
{
    public interface IPaymentService
    {
        List<Payment> GetPayments();

        Payment AddPayment(
            Payment payment);

        Payment? GetPaymentById(
            int id);
    }
}