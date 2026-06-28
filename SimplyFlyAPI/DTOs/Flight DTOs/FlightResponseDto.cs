namespace SimplyFlyAPI.DTOs.Flight;

public record FlightResponseDto(
    int FlightId,

    string FlightName,

    string FlightNumber,

    string FromCity,

    string ToCity,

    string? FromAirportName,

    string? FromAirportCode,

    string? ToAirportName,

    string? ToAirportCode,

    decimal Price,

    int AvailableSeats,

    string Status,

    string? CabinClass,

    string? FlightType,

    string? JourneyType,

    bool FoodIncluded,

    int CabinBaggageKg,

    int CheckInBaggageKg
);