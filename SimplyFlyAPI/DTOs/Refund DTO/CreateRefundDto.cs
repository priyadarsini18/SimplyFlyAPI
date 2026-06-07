using System.ComponentModel.DataAnnotations;

namespace SimplyFlyAPI.DTOs.Refund
{
    public record CreateRefundDto(
        [Required]
        int BookingId,

        [Range(1, 100000)]
        decimal RefundAmount,

        [Required]
        string RefundReason
    );
}