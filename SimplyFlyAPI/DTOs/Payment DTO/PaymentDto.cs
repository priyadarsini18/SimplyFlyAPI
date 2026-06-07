using System.ComponentModel.DataAnnotations;

namespace SimplyFlyAPI.DTOs.Payment;

public record PaymentDto(
    [Required]
    int BookingId,

    [Range(1, 100000)]
    decimal Amount,

    [Required]
    string PaymentMethod
);