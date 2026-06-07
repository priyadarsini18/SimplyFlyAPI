using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace SimplyFlyAPI.Models
{
    public class Payment
    {
        [Key]
        public int PaymentId { get; set; }

        [Required]
        [ForeignKey(nameof(Booking))]
        public int BookingId { get; set; }

        [Required]
        public decimal Amount { get; set; }

        [Required]
        public string PaymentMethod { get; set; } = string.Empty;

        [Required]
        public string PaymentStatus { get; set; } = "Pending";

        [Required]
        public DateTime PaymentDate { get; set; }
            = DateTime.Now;

        // Navigation Property

        public Booking? Booking { get; set; }
    }
}