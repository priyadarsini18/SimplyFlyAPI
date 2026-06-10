using Asp.Versioning;
using AutoMapper;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using SimplyFlyAPI.DTOs.Auth;
using SimplyFlyAPI.DTOs.Flight;
using SimplyFlyAPI.Models;
using SimplyFlyAPI.Services.Admin;
using SimplyFlyAPI.Services.Auth;

namespace SimplyFlyAPI.Controllers
{
    [ApiVersion("1.0")]
    [Route("api/v{version:apiVersion}/[controller]")]
    [ApiController]
    [Authorize]
    public class AdminController : ControllerBase
    {
        private readonly IAdminService _adminService;
        private readonly IMapper _mapper;
        private readonly ILogger<AdminController> _logger;
        private readonly IAuthService _authService;

        public AdminController(
            IAdminService adminService,
            IMapper mapper,
            ILogger<AdminController> logger,
            IAuthService authService)
        {
            _adminService = adminService;
            _mapper = mapper;
            _logger = logger;
            _authService = authService;
        }

        // GET ALL FLIGHTS

        [Authorize(Roles = "Admin,FlightOwner")]
        [HttpGet("flights")]
        public IActionResult GetFlights()
        {
            _logger.LogInformation(
                "Fetching all flights");

            return Ok(_adminService.GetFlights());
        }

        // GET FLIGHT BY ID

        [Authorize(Roles = "Admin,FlightOwner")]
        [HttpGet("flights/{id}")]
        public IActionResult GetFlightById(int id)
        {
            var flight =
                _adminService.GetFlightById(id);

            if (flight == null)
            {
                _logger.LogWarning(
                    "Flight with ID {FlightId} not found",
                    id);

                return NotFound("Flight Not Found");
            }

            _logger.LogInformation(
                "Flight with ID {FlightId} retrieved successfully",
                id);

            return Ok(flight);
        }

        // ADD FLIGHT

        [Authorize(Roles = "Admin,FlightOwner")]
        [HttpPost("flights")]
        public IActionResult AddFlight(CreateFlightDto dto)
        {
            var flight =
                _mapper.Map<Flight>(dto);

            _adminService.AddFlight(flight);

            _logger.LogInformation(
                "Flight {FlightName} added successfully",
                flight.FlightName);

            return Ok(new
            {
                Message = "Flight Added Successfully"
            });
        }

        // UPDATE FLIGHT

        [Authorize(Roles = "Admin,FlightOwner")]
        [HttpPut("flights/{id}")]
        public IActionResult UpdateFlight(
            int id,
            CreateFlightDto dto)
        {
            var flight =
                _mapper.Map<Flight>(dto);

            var result =
                _adminService.UpdateFlight(
                    id,
                    flight);

            if (!result)
            {
                _logger.LogWarning(
                    "Update failed. Flight ID {FlightId} not found",
                    id);

                return NotFound("Flight Not Found");
            }

            _logger.LogInformation(
                "Flight ID {FlightId} updated successfully",
                id);

            return Ok(new
            {
                Message = "Flight Updated Successfully"
            });
        }

        // CANCEL FLIGHT

        [Authorize(Roles = "Admin,FlightOwner")]
        [HttpPut("flights/cancel/{id}")]
        public IActionResult CancelFlight(int id)
        {
            var result =
                _adminService.CancelFlight(id);

            if (!result)
            {
                _logger.LogWarning(
                    "Cancel failed. Flight ID {FlightId} not found",
                    id);

                return NotFound("Flight Not Found");
            }

            _logger.LogWarning(
                "Flight ID {FlightId} cancelled",
                id);

            return Ok(new
            {
                Message = "Flight Cancelled Successfully"
            });
        }

        // DELETE FLIGHT (SOFT DELETE)

        [Authorize(Roles = "Admin")]
        [HttpDelete("flights/{id}")]
        public IActionResult DeleteFlight(int id)
        {
            var result =
                _adminService.DeleteFlight(id);

            if (!result)
            {
                _logger.LogWarning(
                    "Delete failed. Flight ID {FlightId} not found",
                    id);

                return NotFound("Flight Not Found");
            }

            _logger.LogWarning(
                "Flight ID {FlightId} soft deleted",
                id);

            return Ok(new
            {
                Message = "Flight Deleted Successfully"
            });
        }

        // CREATE FLIGHT OWNER

        [Authorize(Roles = "Admin")]
        [HttpPost("create-flightowner")]
        public IActionResult CreateFlightOwner(
            CreateFlightOwnerDto dto)
        {
            var user =
                _mapper.Map<User>(dto);

            user.Role = "FlightOwner";

            var createdUser =
                _authService.Register(user);

            _logger.LogInformation(
                "FlightOwner {Email} created by Admin",
                user.Email);

            return Ok(new
            {
                Message = "FlightOwner Created Successfully",
                UserId = createdUser.UserId
            });
        }
    }
}