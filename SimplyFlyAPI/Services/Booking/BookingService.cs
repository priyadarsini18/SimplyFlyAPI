using SimplyFlyAPI.Data;
using Microsoft.Extensions.Logging;

namespace SimplyFlyAPI.Services.Booking
{
    public class BookingService : IBookingService
    {
        private readonly AppDbContext _context;
        private readonly ILogger<BookingService> _logger;

        public BookingService(
            AppDbContext context,
            ILogger<BookingService> logger)
        {
            _context = context;
            _logger = logger;
        }

        public List<Models.Booking> GetBookings()
        {
            _logger.LogInformation(
                "Fetching all bookings");

            return _context.Bookings.ToList();
        }

        public List<Models.Booking> GetUserBookings(
            int userId)
        {
            _logger.LogInformation(
                "Fetching bookings for User ID {UserId}",
                userId);

            return _context.Bookings
                .Where(b => b.UserId == userId)
                .ToList();
        }

        public bool BookFlight( Models.Booking booking)
        {
            var flight =
                _context.Flights.FirstOrDefault(
                    f => f.FlightId == booking.FlightId);

            if (flight == null)
            {
                _logger.LogWarning(
                    "Booking failed. Flight ID {FlightId} not found",
                    booking.FlightId);

                return false;
            }

            if (flight.AvailableSeats <
                booking.NumberOfSeats)
            {
                _logger.LogWarning(
                    "Booking failed. Not enough seats available for Flight ID {FlightId}",
                    booking.FlightId);

                return false;
            }

            flight.AvailableSeats -=
                booking.NumberOfSeats;

            booking.TotalAmount =
                flight.Price *
                booking.NumberOfSeats;

            booking.BookingStatus =
                "Booked";

            booking.PaymentStatus =
                "Pending";

            booking.BookingDate =
                DateTime.Now;

            _context.Bookings.Add(
                booking);

            _context.SaveChanges();

            _logger.LogInformation(
                "Booking created successfully. User ID {UserId}, Flight ID {FlightId}",
                booking.UserId,
                booking.FlightId);

            return true;
        }

        public bool CancelBooking(
            int id)
        {
            var booking =
                _context.Bookings.Find(id);

            if (booking == null)
            {
                _logger.LogWarning(
                    "Booking cancellation failed. Booking ID {BookingId} not found",
                    id);

                return false;
            }

            booking.BookingStatus =
                "Cancelled";

            _context.SaveChanges();

            _logger.LogWarning(
                "Booking ID {BookingId} cancelled successfully",
                id);

            return true;
        }
    }
}