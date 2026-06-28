using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Logging;
using SimplyFlyAPI.Data;
using SimplyFlyAPI.DTOs.Booking;

namespace SimplyFlyAPI.Services.Booking
{
    public class BookingService : IBookingService
    {
        private readonly AppDbContext _context;
        private readonly ILogger<BookingService> _logger;
        private readonly IEmailService _emailService;
        public BookingService(
    AppDbContext context,
    ILogger<BookingService> logger,
    IEmailService emailService)
        {
            _context = context;
            _logger = logger;
            _emailService = emailService;
        }

        public List<Models.Booking> GetBookings()
        {
            _logger.LogInformation(
                "Fetching all bookings");

            return _context.Bookings.ToList();
        }

        
public List<BookingResponseDto> GetUserBookings(int userId)
    {
        _logger.LogInformation(
            "Fetching bookings for User ID {UserId}",
            userId);

        return _context.Bookings
            .Include(b => b.Flight)
            .Where(b => b.UserId == userId)
            .Select(b => new BookingResponseDto
            {
                BookingId = b.BookingId,
                UserId = b.UserId,
                FlightId = b.FlightId,

                FlightName = b.Flight != null
    ? b.Flight.FlightName
    : "",

                FlightNumber = b.Flight != null
    ? b.Flight.FlightNumber
    : "",

                FromCity = b.Flight != null
    ? b.Flight.FromCity
    : "",

                ToCity = b.Flight != null
    ? b.Flight.ToCity
    : "",

                DepartureTime = b.Flight != null
    ? b.Flight.DepartureTime
    : DateTime.MinValue,

                NumberOfSeats = b.NumberOfSeats,
                TotalAmount = b.TotalAmount,
                RefundAmount = b.RefundAmount,

                RefundStatus = _context.Refunds
    .Where(r => r.BookingId == b.BookingId)
    .Select(r => r.RefundStatus)
    .FirstOrDefault(),

                RefundReason = _context.Refunds
    .Where(r => r.BookingId == b.BookingId)
    .Select(r => r.RefundReason)
    .FirstOrDefault(),

                RefundDate = _context.Refunds
    .Where(r => r.BookingId == b.BookingId)
    .Select(r => (DateTime?)r.RefundDate)
    .FirstOrDefault(),
                BookingStatus = b.BookingStatus,
                BookingDate = b.BookingDate
            })
            .ToList();
    }

    public bool BookFlight(
    Models.Booking booking,
    List<int> seatIds)
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

            // Reduce available seats

            flight.AvailableSeats -=
                booking.NumberOfSeats;

            // Booking details

            booking.TotalAmount =
                flight.Price *
                booking.NumberOfSeats;

            booking.BookingStatus =
                "Booked";

            booking.PaymentStatus =
                "Pending";

            booking.BookingDate =
                DateTime.Now;

            // Save booking

            _context.Bookings.Add(
                booking);

            _context.SaveChanges();

            // Mark selected seats as booked

            foreach (var seatId in seatIds)
            {
                var seat =
                    _context.Seats
                    .FirstOrDefault(
                        s => s.SeatId == seatId);

                if (seat != null)
                {
                    seat.IsBooked = true;

                    seat.BookingId =
                        booking.BookingId;
                }
            }

            _context.SaveChanges();

            // Get user
            // Get user

            var user = _context.Users.FirstOrDefault(
            u => u.UserId == booking.UserId);

            // Get seat numbers BEFORE Task.Run

            var seatNumbers =
            seatIds.Count > 0
            ? string.Join(", ",
            _context.Seats
            .Where(s => seatIds.Contains(s.SeatId))
            .Select(s => s.SeatNumber)
            .ToList())
            : "N/A";

            // Send email

            if (user != null)
            {
                Task.Run(async () =>
                {
                    try
                    {
                        await _emailService.SendTicketEmail(
                        user.Email,
                        user.FullName,
                        booking.BookingId,
                        flight.FlightName,
                        flight.FlightNumber,
                        flight.FromCity,
                        flight.ToCity,
                        flight.DepartureTime,
                        flight.ArrivalTime,
                        seatNumbers,
                        "G12",
                        booking.TotalAmount);


        Console.WriteLine("EMAIL SENT SUCCESSFULLY");
                    }
                    catch (Exception ex)
                    {
                        Console.WriteLine("EMAIL ERROR");
                        Console.WriteLine(ex.ToString());
                    }
                });


}



            _logger.LogInformation(
                "Booking created successfully. User ID {UserId}, Flight ID {FlightId}",
                booking.UserId,
                booking.FlightId);

            return true;
        }

        public async Task<decimal> CancelBooking(int id)
        {
            var booking =
                _context.Bookings
                .Include(b => b.Flight)
                .FirstOrDefault(
                    b => b.BookingId == id);

            if (booking == null)
            {
                _logger.LogWarning(
                    "Booking cancellation failed. Booking ID {BookingId} not found",
                    id);

                return -1;
            }

            if (booking.BookingStatus == "Cancelled")
            {
                return booking.RefundAmount;
            }

            var flight = booking.Flight;

            var user =
                _context.Users
                .FirstOrDefault(
                    u => u.UserId == booking.UserId);

            booking.BookingStatus =
    "Cancelled";

            booking.PaymentStatus =
                "Refund Pending";
            

            if (flight == null)
            {
                return -1;
            }

            // Refund will be decided by Flight Owner

            booking.RefundAmount = 0;

            booking.PaymentStatus = "Refund Pending";
            flight.AvailableSeats +=
                    booking.NumberOfSeats;
            
            var bookedSeats =
    _context.Seats
    .Where(s =>
        s.BookingId == booking.BookingId)
    .ToList();

            foreach (var seat in bookedSeats)
            {
                seat.IsBooked = false;

                seat.BookingId = null;
            }
            _context.SaveChanges();
            var refund = new Models.Refund
            {
                BookingId = booking.BookingId,

                RefundAmount = 0,

                RefundStatus = "Pending",

                RefundReason = "Waiting for Flight Owner Approval",

                RefundDate = null
            };

            _context.Refunds.Add(refund);

            _context.SaveChanges();
            try
            {
                await _emailService.SendCancellationEmail(
    user.Email,
    user.FullName,
    booking.BookingId,
    flight.FlightName,
    flight.FromCity,
    flight.ToCity,
    booking.RefundAmount
);
            }
            catch (Exception ex)
            {
                Console.WriteLine(ex.Message);
            }

            _logger.LogInformation(
                "Booking ID {BookingId} cancelled",
                booking.BookingId);

            return booking.RefundAmount;
        }

        public SimplyFlyAPI.Models.Booking GetBookingById(int id)
        {
            return _context.Bookings
                .Include(b => b.Flight)
                .FirstOrDefault(b => b.BookingId == id);
        }
    }
}
