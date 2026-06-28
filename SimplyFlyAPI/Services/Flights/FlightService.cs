using SimplyFlyAPI.Data;
using SimplyFlyAPI.Models;
using SimplyFlyAPI.Services.Flights;
using Microsoft.EntityFrameworkCore;

namespace SimplyFlyAPI.Services.Flights
{
    public class FlightService : IFlightService
    {
        private readonly AppDbContext _context;

        public FlightService(AppDbContext context)
        {
            _context = context;
        }


        public PagedResponse<Flight> GetFlights(
            PaginationParams paginationParams)
        {
            var flights = _context.Flights
                .Where(f => !f.IsDeleted)
                .Skip(
                    (paginationParams.PageNumber - 1)
                    * paginationParams.PageSize)
                .Take(paginationParams.PageSize)
                .ToList();

            var totalRecords = _context.Flights
                .Count(f => !f.IsDeleted);

            return new PagedResponse<Flight>(
                flights,
                paginationParams.PageNumber,
                paginationParams.PageSize,
                totalRecords);
        }

        public List<Flight> GetMyFlights(int ownerId)
        {
            return _context.Flights
                
                .Where(f => f.FlightOwnerId == ownerId)
                .ToList();
        }
        public Flight? GetFlightById(int id)
        {
            return _context.Flights
               
                .FirstOrDefault(f => f.FlightId == id);
        }

        public List<Flight> SearchFlights(
            string fromCity,
            string toCity,DateTime journeyDate)
        {
            return _context.Flights
        .Where(f =>
            f.FromCity == fromCity &&
            f.ToCity == toCity &&
            f.DepartureTime.Date == journeyDate.Date &&
            !f.IsDeleted)
        .ToList();
        }

        public void AddFlight(Flight flight)
        {
            _context.Flights.Add(flight);
            _context.SaveChanges();

            var seatLetters = new[] { "A", "B", "C", "D", "E", "F" };

            for (int i = 1; i <= flight.TotalSeats; i++)
            {
                var row = ((i - 1) / 6) + 1;

                var seatLetter = seatLetters[(i - 1) % 6];

                _context.Seats.Add(new Seat
                {
                    FlightId = flight.FlightId,
                    SeatNumber = $"{seatLetter}{row}",

                    SeatType = row <= 3
        ? "Business"
        : "Economy",

                    IsBooked = false
                });
            }

            _context.SaveChanges();
        }
        public List<SimplyFlyAPI.Models.Booking>
    GetBookingsForOwner(int ownerId)
        {
            return _context.Bookings
                .Where(b =>
                    _context.Flights.Any(f =>
                        f.FlightId == b.FlightId &&
                        f.FlightOwnerId == ownerId))
                .ToList();
        }


        public decimal GetRevenue(int ownerId)
        {
            return _context.Bookings
                .Where(b =>
                    b.BookingStatus != "Cancelled" &&
                    _context.Flights.Any(f =>
                        f.FlightId == b.FlightId &&
                        f.FlightOwnerId == ownerId))
                .Sum(b => b.TotalAmount);
        }

        public bool DeleteFlight(
    int flightId,
    int ownerId)
        {
            var flight = _context.Flights
                .FirstOrDefault(f =>
                    f.FlightId == flightId &&
                    f.FlightOwnerId == ownerId);

            if (flight == null)
                return false;

            flight.IsDeleted = true;

            _context.SaveChanges();

            return true;
        }

        public bool UpdateFlight(
    Flight updatedFlight,
    int ownerId)
        {
            var flight = _context.Flights
                .FirstOrDefault(f =>
                    f.FlightId ==
                    updatedFlight.FlightId &&
                    f.FlightOwnerId ==
                    ownerId);

            if (flight == null)
                return false;

            flight.FlightName =
                updatedFlight.FlightName;

            flight.FlightNumber =
                updatedFlight.FlightNumber;

            flight.FromCity =
                updatedFlight.FromCity;

            flight.ToCity =
                updatedFlight.ToCity;

            flight.Price =
                updatedFlight.Price;

            flight.AvailableSeats =
                updatedFlight.AvailableSeats;

            _context.SaveChanges();

            return true;
        }

        
    }
}