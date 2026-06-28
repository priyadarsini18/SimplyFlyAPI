using System.ComponentModel.DataAnnotations;

namespace SimplyFlyAPI.DTOs.Flight;

public record CreateFlightDto(

    string FlightName,
    string FlightNumber,

    string FromCity,
    string ToCity,

    string? FromAirportName,
    string? FromAirportCode,

    string? ToAirportName,
    string? ToAirportCode,

    int RouteId,

    DateTime DepartureTime,
    DateTime ArrivalTime,

    decimal Price,

    int TotalSeats,
    int AvailableSeats,

    string Status,

    string? CabinClass,
    string? Stop1,
string? Stop2,
    string? FlightType,
    string? JourneyType,

    bool FoodIncluded,

    int CabinBaggageKg,
    int CheckInBaggageKg
);