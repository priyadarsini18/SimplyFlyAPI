using System.ComponentModel.DataAnnotations;

namespace SimplyFlyAPI.DTOs.Auth;

public record RegisterAdminDto(
    [Required]
    string FullName,

    [Required]
    [EmailAddress]
    string Email,

    [Required]
    [MinLength(6)]
    string Password,

    [Required]
    [Phone]
    string PhoneNumber,

    [Required]
    string AdminKey
);