namespace SimplyFlyAPI.Models
{
    public class SavedFlight
    {
        public int SavedFlightId { get; set; }

        public int UserId { get; set; }

        public int FlightId { get; set; }

        public DateTime SavedDate { get; set; }

        public User User { get; set; }

        public Flight Flight { get; set; }
    }
}
