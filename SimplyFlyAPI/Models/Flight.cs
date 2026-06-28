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
        public string? FromAirportName { get; set; }

        public string? FromAirportCode { get; set; }

        public string? ToAirportName { get; set; }

        public string? ToAirportCode { get; set; }

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
        public string? CabinClass { get; set; }
        public string? Stop1 { get; set; }

        public string? Stop2 { get; set; }

        public string? FlightType { get; set; }

        public string? JourneyType { get; set; }

        public bool FoodIncluded { get; set; }

        public int FlightOwnerId { get; set; }

        public User? FlightOwner { get; set; }
        public int CabinBaggageKg { get; set; }

        public int CheckInBaggageKg { get; set; }

        // Navigation Property

        public FlightRoute? Route { get; set; }

        // other properties

        public bool IsDeleted { get; set; } = false;
        public ICollection<SeatReservation> SeatReservations { get; set; }
    }
}