using System.ComponentModel.DataAnnotations;
namespace SimplyFlyAPI.DTOs.Passenger;
public record PassengerDto(
    [Required]
    string PassengerName,

    [Range(1, 120)]
    int Age,

    [Required]
    string Gender,

    [Required]
    string PassportNumber,

    [Required]
    string SeatNumber
);