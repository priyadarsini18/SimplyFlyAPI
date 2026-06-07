using System.ComponentModel.DataAnnotations;

namespace SimplyFlyAPI.DTOs.Auth;

public record LoginDto(
    [Required]
    [EmailAddress]
    string Email,

    [Required]
    string Password
);