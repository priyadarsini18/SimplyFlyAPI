using Asp.Versioning;
using AutoMapper;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using SimplyFlyAPI.DTOs.Flight;
using SimplyFlyAPI.Models;
using SimplyFlyAPI.Services.Admin;

namespace SimplyFlyAPI.Controllers
{
    [ApiVersion("1.0")]
    [Route("api/v{version:apiVersion}/[controller]")]
    [ApiController]
    [Authorize(Roles = "Admin,FlightOwner")]
    public class AdminController : ControllerBase
    {
        private readonly IAdminService _adminService;
        private readonly IMapper _mapper;
        private readonly ILogger<AdminController> _logger;

        public AdminController(
            IAdminService adminService,
            IMapper mapper,
            ILogger<AdminController> logger)
        {
            _adminService = adminService;
            _mapper = mapper;
            _logger = logger;
        }

        // GET ALL FLIGHTS

        [HttpGet("flights")]
        public IActionResult GetFlights()
        {
            _logger.LogInformation(
                "Fetching all flights");

            return Ok(_adminService.GetFlights());
        }

        // GET FLIGHT BY ID

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
    }
}