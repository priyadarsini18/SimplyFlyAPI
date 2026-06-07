namespace SimplyFlyAPI.DTOs.User;

public record UserDto(
    string FullName,
    string Email,
    string Password,
        string PhoneNumber,
        string Role);