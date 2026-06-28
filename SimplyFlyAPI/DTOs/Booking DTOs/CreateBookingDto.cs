using System.ComponentModel.DataAnnotations;

namespace SimplyFlyAPI.DTOs.Booking;

public record CreateBookingDto(

    [Required]
    int FlightId,

    [Range(1,10)]
    int NumberOfSeats,

    List<int> SeatIds,
    string? SeatPreference
);