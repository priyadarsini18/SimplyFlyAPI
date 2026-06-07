using System.ComponentModel.DataAnnotations;

namespace SimplyFlyAPI.DTOs.Booking;

public record CreateBookingDto(

    [Required]
    int FlightId,

    [Range(1, 10,
        ErrorMessage = "Seats must be between 1 and 10")]
    int NumberOfSeats
);