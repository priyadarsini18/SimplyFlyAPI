using Asp.Versioning;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using SimplyFlyAPI.Models;
using SimplyFlyAPI.Services;
using SimplyFlyAPI.Services.Flights;

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
    [FromQuery]
    PaginationParams paginationParams)
        {
            var flights =
                _flightService.GetFlights(
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
        public IActionResult SearchFlights(string fromCity,string toCity)
        {
            var flights =_flightService.SearchFlights(
                    fromCity,
                    toCity);

            return Ok(flights);
        }
    }
}