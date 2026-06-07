using SimplyFlyAPI.Data;
using SimplyFlyAPI.Models;

namespace SimplyFlyAPI.Services.Routes
{
    public class RouteService : IRouteService
    {
        private readonly AppDbContext _context;

        public RouteService(
            AppDbContext context)
        {
            _context = context;
        }

        public List<FlightRoute> GetRoutes()
        {
            return _context.Routes.ToList();
        }

        public FlightRoute? GetRouteById(
            int id)
        {
            return _context.Routes.Find(id);
        }

        public FlightRoute AddRoute(
            FlightRoute route)
        {
            _context.Routes.Add(route);

            _context.SaveChanges();

            return route;
        }
    }
}