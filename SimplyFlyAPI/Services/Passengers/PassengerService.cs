using SimplyFlyAPI.Data;
using SimplyFlyAPI.Models;

namespace SimplyFlyAPI.Services.Passengers
{
    public class PassengerService
        : IPassengerService
    {
        private readonly AppDbContext _context;

        public PassengerService(
            AppDbContext context)
        {
            _context = context;
        }

        public List<Passenger> GetPassengers()
        {
            return _context.Passengers
                .ToList();
        }

        public Passenger AddPassenger(
            Passenger passenger)
        {
            _context.Passengers
                .Add(passenger);

            _context.SaveChanges();

            return passenger;
        }

        public Passenger? GetPassengerById(
            int id)
        {
            return _context.Passengers
                .Find(id);
        }
    }
}