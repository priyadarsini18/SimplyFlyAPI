using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace SimplyFlyAPI.Models
{
    public class Ticket
    {
        [Key]
        public int TicketId { get; set; }

        [Required]
        [ForeignKey(nameof(Booking))]
        public int BookingId { get; set; }

        [Required]
        public string PNR { get; set; }
            = string.Empty;

        [Required]
        public string SeatNumber { get; set; }
            = string.Empty;

        [Required]
        public DateTime IssueDate { get; set; }
            = DateTime.Now;

        [Required]
        public string TicketStatus { get; set; }
            = "Confirmed";

        // Navigation Property

        public Booking? Booking { get; set; }
    }
}