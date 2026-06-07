using System.ComponentModel.DataAnnotations;

namespace SimplyFlyAPI.DTOs.Ticket;

public record TicketDto(
    [Required]
    int BookingId,

    [Required]
    string PNR,

    [Required]
    string SeatNumber
);