using SimplyFlyAPI.Models;

namespace SimplyFlyAPI.Services.Admin
{
    public interface IAdminService
    {
        List<Flight> GetFlights();

        Flight? GetFlightById(int id);

        Flight AddFlight(Flight flight);

        bool UpdateFlight(int id, Flight flight);

        bool DeleteFlight(int id);

        bool CancelFlight(int id);
    }
}