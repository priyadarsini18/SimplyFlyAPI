using SimplyFlyAPI.Models;

namespace SimplyFlyAPI.Services.Routes
{
    public interface IRouteService
    {
        List<FlightRoute> GetRoutes();

        FlightRoute? GetRouteById(int id);

        FlightRoute AddRoute(
            FlightRoute route);
    }
}