using SimplyFlyAPI.Models;

namespace SimplyFlyAPI.Services.Booking
{
    public interface IBookingService
    {
        List<Models.Booking> GetBookings();

        List<Models.Booking> GetUserBookings(
            int userId);

        bool BookFlight(
            Models.Booking booking);

        bool CancelBooking(
            int id);
    }
}