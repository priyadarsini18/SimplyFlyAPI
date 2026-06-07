using Asp.Versioning;
using AutoMapper;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using SimplyFlyAPI.DTOs.Passenger;
using SimplyFlyAPI.Models;
using SimplyFlyAPI.Services.Passengers;

namespace SimplyFlyAPI.Controllers
{
    [ApiVersion("1.0")]
    [Route("api/v{version:apiVersion}/[controller]")]
    [ApiController]
    [Authorize(Roles = "User")]
    public class PassengerController : ControllerBase
    {
        private readonly IPassengerService
            _passengerService;
        private readonly IMapper _mapper;
        public PassengerController(
            IPassengerService passengerService, IMapper mapper)
        {
            _passengerService =
                passengerService;
            _mapper = mapper;
        }

        // GET ALL PASSENGERS

        [HttpGet]
        public IActionResult GetPassengers()
        {
            var passengers =
                _passengerService
                .GetPassengers();

            return Ok(passengers);
        }

        // ADD PASSENGER

        [HttpPost]
        public IActionResult AddPassenger(
            PassengerDto dto)
        {
            var passenger =
    _mapper.Map<Passenger>(dto);

            _passengerService
                .AddPassenger(passenger);

            return Ok(new
            {
                message =
                "Passenger Added Successfully"
            });
        }
    }
}