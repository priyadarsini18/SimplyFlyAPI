namespace SimplyFlyAPI.DTOs.Flight;

public record FlightResponseDto(
    int FlightId,
    string FlightName,
    string FlightNumber,
    string FromCity,
    string ToCity,
    decimal Price,
    int AvailableSeats,
    string Status);