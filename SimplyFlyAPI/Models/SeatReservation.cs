using System.ComponentModel.DataAnnotations;

namespace SimplyFlyAPI.Models
{
    public class SeatReservation
    {
        [Key]
        public int ReservationId { get; set; }

        public int UserId { get; set; }

        public int FlightId { get; set; }

        public string SeatNumber { get; set; }

        public DateTime ReservedDate { get; set; }
        public User User { get; set; }

        public Flight Flight { get; set; }
    }
}