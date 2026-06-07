using SimplyFlyAPI.Data;
using SimplyFlyAPI.Models;

namespace SimplyFlyAPI.Services.Admin
{
    public class AdminService : IAdminService
    {
        private readonly AppDbContext _context;

        public AdminService(AppDbContext context)
        {
            _context = context;
        }

        public List<Flight> GetFlights()
        {
            return _context.Flights
        .Where(f => !f.IsDeleted)
        .ToList();
        }

        public Flight? GetFlightById(int id)
        {
            return _context.Flights
        .FirstOrDefault(
            f => f.FlightId == id &&
                 !f.IsDeleted);
        }

        public Flight AddFlight(Flight flight)
        {
            flight.AvailableSeats = flight.TotalSeats;
            flight.Status = "Available";

            _context.Flights.Add(flight);
            _context.SaveChanges();

            return flight;
        }

        public bool UpdateFlight(int id, Flight updatedFlight)
        {
            var flight = _context.Flights.Find(id);

            if (flight == null)
                return false;

            flight.FlightName = updatedFlight.FlightName;
            flight.FlightNumber = updatedFlight.FlightNumber;
            flight.FromCity = updatedFlight.FromCity;
            flight.ToCity = updatedFlight.ToCity;
            flight.DepartureTime = updatedFlight.DepartureTime;
            flight.ArrivalTime = updatedFlight.ArrivalTime;
            flight.Price = updatedFlight.Price;
            flight.TotalSeats = updatedFlight.TotalSeats;
            flight.AvailableSeats = updatedFlight.AvailableSeats;
            flight.Status = updatedFlight.Status;

            _context.SaveChanges();

            return true;
        }

        public bool DeleteFlight(int id)
        {
            var flight =
                _context.Flights.Find(id);

            if (flight == null)
            {
                return false;
            }

            flight.IsDeleted = true;

            _context.SaveChanges();

            return true;
        }

        public bool CancelFlight(int id)
        {
            var flight = _context.Flights.Find(id);

            if (flight == null)
                return false;

            flight.Status = "Cancelled";

            _context.SaveChanges();

            return true;
        }
    }
}