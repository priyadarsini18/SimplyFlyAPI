namespace SimplyFlyAPI.DTOs.Booking;
public record BookingResponseDto(
    int BookingId,
    int UserId,
    int FlightId,
    decimal TotalAmount,
    string BookingStatus,
    DateTime BookingDate);