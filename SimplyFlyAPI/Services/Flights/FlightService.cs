using SimplyFlyAPI.Data;
using SimplyFlyAPI.Models;
using SimplyFlyAPI.Services.Flights;
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
            .Take(
                paginationParams.PageSize)
            .ToList();

            var totalRecords = _context.Flights
            .Count(f => !f.IsDeleted);

            return new PagedResponse<Flight>(
            flights,
            paginationParams.PageNumber,
            paginationParams.PageSize,
            totalRecords);
    }

    public Flight? GetFlightById(int id)
        {
            return _context.Flights
        .FirstOrDefault(
            f => f.FlightId == id &&
                 !f.IsDeleted);
        }

        public List<Flight> SearchFlights(
            string fromCity,
            string toCity)
        {
            return _context.Flights
        .Where(f =>
            f.FromCity == fromCity &&
            f.ToCity == toCity &&
            !f.IsDeleted)
        .ToList();
        }
    }
}