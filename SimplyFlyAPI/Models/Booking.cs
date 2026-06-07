using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace SimplyFlyAPI.Models
{
    public class Booking
    {
        [Key]
        public int BookingId { get; set; }

        [Required]
        [ForeignKey(nameof(User))]
        public int UserId { get; set; }

        [Required]
        [ForeignKey(nameof(Flight))]
        public int FlightId { get; set; }

        [Required]
        public DateTime BookingDate { get; set; }
            = DateTime.Now;

        [Required]
        public int NumberOfSeats { get; set; }

        [Required]
        public decimal TotalAmount { get; set; }

        [Required]
        public string BookingStatus { get; set; }
            = "Booked";

        public string? PaymentStatus { get; set; }

        // Navigation Properties

        public User? User { get; set; }

        public Flight? Flight { get; set; }
    }
}