using System.ComponentModel.DataAnnotations;

namespace SimplyFlyAPI.Models
{
    public class FlightRoute
    {
        [Key]
        public int RouteId { get; set; }

        [Required]
        public string Source { get; set; } = string.Empty;

        [Required]
        public string Destination { get; set; } = string.Empty;

        // Navigation Property

        public ICollection<Flight>? Flights { get; set; }
    }
}