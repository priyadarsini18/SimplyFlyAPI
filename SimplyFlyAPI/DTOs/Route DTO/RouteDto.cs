using System.ComponentModel.DataAnnotations;

namespace SimplyFlyAPI.DTOs.Route;

public record RouteDto(
    [Required]
    string Source,

    [Required]
    string Destination
);