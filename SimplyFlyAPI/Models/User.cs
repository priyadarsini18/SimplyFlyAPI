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

        // Navigation Property

        public ICollection<Booking>? Bookings { get; set; }
    }
}