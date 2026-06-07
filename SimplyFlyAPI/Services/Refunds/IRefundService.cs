using SimplyFlyAPI.Models;

namespace SimplyFlyAPI.Services.Refunds
{
    public interface IRefundService
    {
        List<Refund> GetRefunds();

        Refund? GetRefundById(int id);

        Refund AddRefund(Refund refund);
    }
}