using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace SimplyFlyAPI.Models
{
    public class Flight
    {
        [Key]
        public int FlightId { get; set; }

        [Required]
        public string FlightName { get; set; } = string.Empty;

        [Required]
        public string FlightNumber { get; set; } = string.Empty;

        [Required]
        public string FromCity { get; set; } = string.Empty;

        [Required]
        public string ToCity { get; set; } = string.Empty;

        [Required]
        [ForeignKey(nameof(Route))]
        public int RouteId { get; set; }

        [Required]
        public DateTime DepartureTime { get; set; }

        [Required]
        public DateTime ArrivalTime { get; set; }

        [Required]
        public decimal Price { get; set; }

        [Required]
        public int TotalSeats { get; set; }

        [Required]
        public int AvailableSeats { get; set; }

        [Required]
        public string Status { get; set; }
            = "Available";

        // Navigation Property

        public FlightRoute? Route { get; set; }

        // other properties

        public bool IsDeleted { get; set; } = false;
    }
}