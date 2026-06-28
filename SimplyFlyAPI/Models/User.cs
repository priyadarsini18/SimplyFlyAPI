using System.ComponentModel.DataAnnotations;

namespace SimplyFlyAPI.Models
{
    public class User
    {
        [Key]
        public int UserId { get; set; }

        [Required]
        public string FullName { get; set; }
            = string.Empty;

        [Required]
        public string Email { get; set; }
            = string.Empty;

        [Required]
        public string Password { get; set; }
            = string.Empty;

        [Required]
        public string PhoneNumber { get; set; }
            = string.Empty;

        [Required]
        public string Role { get; set; }
            = "User";

        [Required]
        public DateTime CreatedAt { get; set; }
            = DateTime.Now;
        public bool IsEmailVerified { get; set; } = false;

        public string? EmailOtp { get; set; }

        public DateTime? EmailOtpExpiry { get; set; }

        public string? ResetOtp { get; set; }

        public DateTime? OtpExpiry { get; set; }
        public DateTime? DateOfBirth { get; set; }

        public string? Gender { get; set; }

        public string? Address { get; set; }

        public string? City { get; set; }

        public string? State { get; set; }

        public string? Country { get; set; }

        public string? ProfileImage { get; set; }

        // Navigation Property

        public ICollection<Booking>? Bookings { get; set; }
        public ICollection<Flight>? Flights { get; set; }
        public ICollection<SeatReservation> SeatReservations { get; set; }
    }
}