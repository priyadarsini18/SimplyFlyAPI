using SimplyFlyAPI.Models;

namespace SimplyFlyAPI.Services.Flights
{
    public interface IFlightService
    {
        PagedResponse<Flight> GetFlights(
    PaginationParams paginationParams);
        SimplyFlyAPI.Models.Flight? GetFlightById(int id);

        List<SimplyFlyAPI.Models.Flight> SearchFlights(
            string fromCity,
            string toCity);
    }
}