using SimplyFlyAPI.Data;
using SimplyFlyAPI.Models;

namespace SimplyFlyAPI.Services.Refunds
{
    public class RefundService : IRefundService
    {
        private readonly AppDbContext _context;

        public RefundService(
            AppDbContext context)
        {
            _context = context;
        }

        public List<Refund> GetRefunds()
        {
            return _context.Refunds.ToList();
        }

        public Refund? GetRefundById(
            int id)
        {
            return _context.Refunds.Find(id);
        }

        public Refund AddRefund(
            Refund refund)
        {
            var booking =
                _context.Bookings
                .Find(refund.BookingId);

            if (booking == null)
            {
                throw new Exception(
                    "Booking Not Found");
            }

            refund.RefundDate =
                DateTime.Now;

            refund.RefundStatus =
                "Processed";

            _context.Refunds.Add(
                refund);

            _context.SaveChanges();

            return refund;
        }
    }
}