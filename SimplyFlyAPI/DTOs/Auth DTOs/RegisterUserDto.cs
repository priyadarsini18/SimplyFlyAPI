using System.ComponentModel.DataAnnotations;

namespace SimplyFlyAPI.DTOs.Auth;

public record RegisterUserDto(
    [Required(ErrorMessage = "Full Name is required")]
    string FullName,

    [Required(ErrorMessage = "Email is required")]
    [EmailAddress(ErrorMessage = "Invalid Email Format")]
    string Email,

   [RegularExpression(
        @"^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&]).{8,}$",
        ErrorMessage =
        "Password must contain Uppercase, Lowercase, Number, Special Character and minimum 8 characters")]
    string Password,

    [Required(ErrorMessage = "Phone Number is required")]
    [Phone]
    string PhoneNumber
     
);