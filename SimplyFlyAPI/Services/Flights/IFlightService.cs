using SimplyFlyAPI.Models;

namespace SimplyFlyAPI.Services.Flights
{
    public interface IFlightService
    {
        PagedResponse<Flight> GetFlights(
    PaginationParams paginationParams);
        SimplyFlyAPI.Models.Flight? GetFlightById(int id);
        List<Flight> GetMyFlights(int ownerId);
        List<SimplyFlyAPI.Models.Flight> SearchFlights(
            string fromCity,
            string toCity, DateTime journeyDate);

        void AddFlight(Flight flight);
        List<SimplyFlyAPI.Models.Booking> GetBookingsForOwner(int ownerId);

        decimal GetRevenue(int ownerId);

        bool DeleteFlight(int flightId, int ownerId);

        bool UpdateFlight(
    Flight flight,
    int ownerId);

    }
}