using System.ComponentModel.DataAnnotations;

namespace SimplyFlyAPI.DTOs.Auth
{
    public class ResetPasswordDto
    {
        public string Email { get; set; }

        [RegularExpression(
        @"^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&]).{8,}$",
        ErrorMessage =
        "Password must contain Uppercase, Lowercase, Number, Special Character and minimum 8 characters")]
        public string NewPassword { get; set; }
    }
}