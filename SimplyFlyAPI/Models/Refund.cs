using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace SimplyFlyAPI.Models
{
    public class Refund
    {
        [Key]
        public int RefundId { get; set; }

        [Required]
        [ForeignKey(nameof(Booking))]
        public int BookingId { get; set; }

        [Required]
        public decimal RefundAmount { get; set; }

        [Required]
        public DateTime RefundDate { get; set; }
            = DateTime.Now;

        [Required]
        public string RefundStatus { get; set; }
            = "Pending";

        public string? RefundReason { get; set; }

        // Navigation Property

        public Booking? Booking { get; set; }
    }
}