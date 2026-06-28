using Asp.Versioning;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using SimplyFlyAPI.DTOs.Flight;
using SimplyFlyAPI.Models;
using SimplyFlyAPI.Services;
using SimplyFlyAPI.Services.Flights;
using System.Security.Claims;

namespace SimplyFlyAPI.Controllers
{
    [ApiVersion("1.0")]
    [Route("api/v{version:apiVersion}/[controller]")]
    [ApiController]
    
    public class FlightsController : ControllerBase
    {
        private readonly IFlightService _flightService;

        public FlightsController(
            IFlightService flightService)
        {
            _flightService = flightService;
        }

        // GET ALL FLIGHTS

        [HttpGet]
        public IActionResult GetFlights(
    [FromQuery] PaginationParams paginationParams)
        {
            var flights = _flightService.GetFlights(
                paginationParams);

            return Ok(flights);
        }


        // GET FLIGHT BY ID

        [HttpGet("{id}")]
        public IActionResult GetFlightById(
            int id)
        {
            var flight= _flightService.GetFlightById(id);

            if (flight == null)
            {
                return NotFound("Flight Not Found");
            }
            return Ok(flight);
        }

        // SEARCH FLIGHTS

        [HttpGet("search")]
        public IActionResult SearchFlights(
    string fromCity,
    string toCity,
    DateTime journeyDate)
        {
            var flights = _flightService.SearchFlights(
                fromCity,
                toCity,
                journeyDate);

            return Ok(flights);
        }
        [Authorize(Roles = "FlightOwner")]
        [HttpGet("my-flights")]
        public IActionResult GetMyFlights()
        {
            var ownerId = int.Parse(
                User.FindFirst(ClaimTypes.NameIdentifier)!
                .Value);

            var flights =
                _flightService.GetMyFlights(ownerId);

            return Ok(flights);
        }

        [HttpPost]
        [Authorize(Roles = "FlightOwner")]
        public IActionResult AddFlight(CreateFlightDto dto)
        {
            var ownerId = int.Parse(
                User.FindFirst(ClaimTypes.NameIdentifier)!
                .Value);

            var flight = new Flight
            {
                FlightName = dto.FlightName,
                FlightNumber = dto.FlightNumber,
                FromCity = dto.FromCity,
                ToCity = dto.ToCity,
                RouteId = dto.RouteId,
                DepartureTime = dto.DepartureTime,
                ArrivalTime = dto.ArrivalTime,
                Price = dto.Price,
                TotalSeats = dto.TotalSeats,
                AvailableSeats = dto.AvailableSeats,
                FromAirportName = dto.FromAirportName,
                FromAirportCode = dto.FromAirportCode,

                ToAirportName = dto.ToAirportName,
                ToAirportCode = dto.ToAirportCode,

                CabinClass = dto.CabinClass,
                FlightType = dto.FlightType,
                JourneyType = dto.JourneyType,
                Stop1 = dto.Stop1,
                Stop2 = dto.Stop2,

                FoodIncluded = dto.FoodIncluded,
                Status = dto.Status,
                CabinBaggageKg = dto.CabinBaggageKg,
                CheckInBaggageKg = dto.CheckInBaggageKg,
                FlightOwnerId = ownerId
            };

            _flightService.AddFlight(flight);

            return Ok(new
            {
                Message = "Flight Added Successfully"
            });
        }

        [HttpGet("owner-bookings")]
        [Authorize(Roles = "FlightOwner")]
        public IActionResult GetOwnerBookings()
        {
            var ownerId = int.Parse(
                User.FindFirst(ClaimTypes.NameIdentifier)!
                .Value);

            var bookings =
                _flightService.GetBookingsForOwner(
                    ownerId);

            return Ok(bookings);
        }


        [HttpGet("owner-revenue")]
        [Authorize(Roles = "FlightOwner")]
        public IActionResult GetRevenue()
        {
            var ownerId = int.Parse(
                User.FindFirst(ClaimTypes.NameIdentifier)!
                .Value);

            var revenue =
                _flightService.GetRevenue(ownerId);

            return Ok(new
            {
                Revenue = revenue
            });
        }

        [HttpDelete("{id}")]
        [Authorize(Roles = "FlightOwner")]
        public IActionResult DeleteFlight(int id)
        {
            var ownerId = int.Parse(
                User.FindFirst(ClaimTypes.NameIdentifier)!
                .Value);

            var result =
                _flightService.DeleteFlight(
                    id,
                    ownerId);

            if (!result)
            {
                return NotFound(
                    "Flight Not Found");
            }

            return Ok(new
            {
                Message =
                "Flight Deleted Successfully"
            });
        }

        [HttpPut]
        [Authorize(Roles = "FlightOwner")]
        public IActionResult UpdateFlight([FromBody]
    Flight flight)
        {
            var ownerId = int.Parse(
                User.FindFirst(
                    ClaimTypes.NameIdentifier)!
                .Value);

            var result =
                _flightService.UpdateFlight(
                    flight,
                    ownerId);

            if (!result)
            {
                return NotFound();
            }

            return Ok(new
            {
                Message =
                "Flight Updated Successfully"
            });
        }
    }
}