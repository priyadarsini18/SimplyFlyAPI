using SimplyFlyAPI.Models;

public class Seat
{
    public int SeatId { get; set; }

    public int FlightId { get; set; }

    public string SeatNumber { get; set; }
    public int? BookingId { get; set; }

    public Booking? Booking { get; set; }

    public bool IsBooked { get; set; }

    public Flight Flight { get; set; }
    public string SeatType { get; set; } = "Economy";
}