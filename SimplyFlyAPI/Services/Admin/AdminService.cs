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

            int rows = (int)Math.Ceiling(
                flight.TotalSeats / 6.0);

            string[] columns =
            {
        "A","B","C","D","E","F"
    };

            int seatCount = 0;

            for (int row = 1; row <= rows; row++)
            {
                foreach (var column in columns)
                {
                    seatCount++;

                    if (seatCount > flight.TotalSeats)
                        break;

                    _context.Seats.Add(new Seat
                    {
                        FlightId = flight.FlightId,
                        SeatNumber = $"{column}{row}",
                        IsBooked = false
                    });
                }
            }

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

            flight.FromAirportName = updatedFlight.FromAirportName;
            flight.FromAirportCode = updatedFlight.FromAirportCode;

            flight.ToAirportName = updatedFlight.ToAirportName;
            flight.ToAirportCode = updatedFlight.ToAirportCode;

            flight.RouteId = updatedFlight.RouteId;

            flight.DepartureTime = updatedFlight.DepartureTime;
            flight.ArrivalTime = updatedFlight.ArrivalTime;

            flight.Price = updatedFlight.Price;

            flight.TotalSeats = updatedFlight.TotalSeats;
            flight.AvailableSeats = updatedFlight.AvailableSeats;

            flight.Status = updatedFlight.Status;

            flight.CabinClass = updatedFlight.CabinClass;

            flight.FlightType = updatedFlight.FlightType;
            flight.JourneyType = updatedFlight.JourneyType;

            flight.Stop1 = updatedFlight.Stop1;
            flight.Stop2 = updatedFlight.Stop2;

            flight.CabinBaggageKg = updatedFlight.CabinBaggageKg;
            flight.CheckInBaggageKg = updatedFlight.CheckInBaggageKg;

            flight.FoodIncluded = updatedFlight.FoodIncluded;

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