namespace SimplyFlyAPI.DTOs.Booking;

public class BookingResponseDto
{
    public int BookingId { get; set; }

    public int UserId { get; set; }

    public int FlightId { get; set; }

    public string FlightName { get; set; }

    public string FlightNumber { get; set; }

    public string FromCity { get; set; }

    public string ToCity { get; set; }

    public DateTime DepartureTime { get; set; }

    public int NumberOfSeats { get; set; }

    public decimal TotalAmount { get; set; }

    public decimal RefundAmount { get; set; }
    public string? RefundStatus { get; set; }

    public DateTime? RefundDate { get; set; }

    public string? RefundReason { get; set; }

    public string BookingStatus { get; set; }

    public DateTime BookingDate { get; set; }
    public List<string> Passengers { get; set; }
}