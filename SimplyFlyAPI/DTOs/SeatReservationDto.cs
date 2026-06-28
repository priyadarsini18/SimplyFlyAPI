namespace SimplyFlyAPI.DTOs
{
    public class SeatReservationDto
    {
        public int FlightId { get; set; }

        public string SeatNumber { get; set; } = string.Empty;
    }
}