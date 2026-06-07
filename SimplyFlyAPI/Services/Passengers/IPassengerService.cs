using SimplyFlyAPI.Models;

namespace SimplyFlyAPI.Services.Passengers
{
    public interface IPassengerService
    {
        List<Passenger> GetPassengers();

        Passenger AddPassenger(
            Passenger passenger);

        Passenger? GetPassengerById(
            int id);
    }
}