using System.ComponentModel.DataAnnotations;

namespace SimplyFlyAPI.DTOs.Auth;

public record RegisterUserDto(
    [Required(ErrorMessage = "Full Name is required")]
    string FullName,

    [Required(ErrorMessage = "Email is required")]
    [EmailAddress(ErrorMessage = "Invalid Email Format")]
    string Email,

    [Required(ErrorMessage = "Password is required")]
    [MinLength(6,
        ErrorMessage = "Password must be at least 6 characters")]
    string Password,

    [Required(ErrorMessage = "Phone Number is required")]
    [Phone]
    string PhoneNumber
);