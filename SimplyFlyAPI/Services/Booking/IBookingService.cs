using SimplyFlyAPI.DTOs.Booking;
using SimplyFlyAPI.Models;

namespace SimplyFlyAPI.Services.Booking
{
    public interface IBookingService
    {
        List<Models.Booking> GetBookings();

        List<BookingResponseDto> GetUserBookings(int userId);

        bool BookFlight(
    Models.Booking booking,
    List<int> seatIds);

        Task<decimal> CancelBooking(int id);
        SimplyFlyAPI.Models.Booking GetBookingById(int id);
    }
}