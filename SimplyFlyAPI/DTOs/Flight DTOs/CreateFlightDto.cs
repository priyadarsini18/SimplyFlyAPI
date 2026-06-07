using System.ComponentModel.DataAnnotations;

namespace SimplyFlyAPI.DTOs.Flight;

public record CreateFlightDto(
    [Required]
    string FlightName,

    [Required]
    string FlightNumber,

    [Required]
    string FromCity,

    [Required]
    string ToCity,

    [Required]
    int RouteId,

    [Required]
    DateTime DepartureTime,

    [Required]
    DateTime ArrivalTime,

    [Range(1, 100000)]
    decimal Price,

    [Range(1, 500)]
    int TotalSeats,

    [Range(0, 500)]
    int AvailableSeats,

    [Required]
    string Status
);