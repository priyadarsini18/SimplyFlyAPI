namespace SimplyFlyAPI.Services
{
    public interface IEmailService
    {
        Task SendVerificationEmail(string email, string otp);

        Task SendOtpEmail(string email, string otp);
        Task SendTicketEmail(
            string email,
            string passengerName,
            int bookingId,
            string flightName,
            string flightNumber,
            string fromCity,
            string toCity,
            DateTime departureTime,
            DateTime arrivalTime,
            string seatNumber,
            string gateNumber,
            decimal amount);

        Task SendCancellationEmail(
            string email,
            string passengerName,
            int bookingId,
            string flightName,
            string fromCity,
            string toCity,
            decimal refundAmount);

        Task SendRefundApprovedEmail(
            string email,
            string passengerName,
            int bookingId,
            decimal refundAmount);
    }
}