using SimplyFlyAPI.Data;
using SimplyFlyAPI.Models;

namespace SimplyFlyAPI.Services.Refunds
{
    public class RefundService : IRefundService
    {
        private readonly AppDbContext _context;
        private readonly IEmailService _emailService;
        public RefundService(
    AppDbContext context,
    IEmailService emailService)
        {
            _context = context;
            _emailService = emailService;
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
        public Refund AddRefund(Refund refund)
        {
            var booking = _context.Bookings.Find(refund.BookingId);

            if (booking == null)
            {
                throw new Exception("Booking Not Found");
            }

            refund.RefundAmount = booking.TotalAmount;
            refund.RefundDate = DateTime.Now;
            refund.RefundStatus = "Pending";

            _context.Refunds.Add(refund);

            _context.SaveChanges();

            return refund;
        }

        public async Task<bool> ProcessRefund(
    int refundId,
    decimal refundAmount)
        {
            var refund = _context.Refunds
                .FirstOrDefault(r => r.RefundId == refundId);

            if (refund == null)
                return false;

            refund.RefundAmount = refundAmount;
            refund.RefundStatus = "Processed";
            refund.RefundDate = DateTime.Now;

            var booking = _context.Bookings
                .FirstOrDefault(b => b.BookingId == refund.BookingId);

            if (booking != null)
            {
                booking.RefundAmount = refundAmount;
                booking.PaymentStatus = "Refunded";

                var user = _context.Users
                    .FirstOrDefault(u => u.UserId == booking.UserId);

                if (user != null)
                {
                    try
                    {
                        await _emailService.SendRefundApprovedEmail(
                            user.Email,
                            user.FullName,
                            booking.BookingId,
                            refundAmount);
                    }
                    catch (Exception ex)
                    {
                        Console.WriteLine(ex.Message);
                    }
                }
            }

            await _context.SaveChangesAsync();

            return true;
        }
    }
}