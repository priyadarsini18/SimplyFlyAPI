using Asp.Versioning;
using AutoMapper;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using SimplyFlyAPI.DTOs.Booking;
using SimplyFlyAPI.Models;
using SimplyFlyAPI.Services.Booking;
using System.Security.Claims;

namespace SimplyFlyAPI.Controllers
{
    [ApiVersion("1.0")]
    [Route("api/v{version:apiVersion}/[controller]")]
    [ApiController]
    [Authorize(Roles = "User")]
    public class BookingController : ControllerBase
    {
        private readonly IBookingService _bookingService;
        private readonly IMapper _mapper;
        public BookingController(
            IBookingService bookingService,IMapper mapper)
        {
            _bookingService = bookingService;
            _mapper = mapper;
        }

        // GET ALL BOOKINGS

        [HttpGet]
        public IActionResult GetBookings()
        {
            return Ok(
                _bookingService.GetBookings());
        }

        // GET  BOOKINGS

        [HttpGet("my-bookings")]
        public IActionResult GetMyBookings()
        {
            var userId =
                int.Parse(
                    User.FindFirst(
                        ClaimTypes.NameIdentifier)!
                    .Value);

            var bookings =
                _bookingService.GetUserBookings(userId);

            var result =
                _mapper.Map<List<BookingResponseDto>>(
                    bookings);

            return Ok(result);
        }

        // BOOK FLIGHT

        [HttpPost]
        public IActionResult BookFlight(
    CreateBookingDto dto)
        {
            var booking =
                _mapper.Map<Booking>(dto);

            booking.UserId =
                int.Parse(
                    User.FindFirst(
                        ClaimTypes.NameIdentifier)!
                    .Value);

            var result =
                _bookingService.BookFlight(
                    booking);

            if (!result)
            {
                return BadRequest(
                    "Booking Failed");
            }

            return Ok(new
            {
                message =
                "Flight Booked Successfully"
            });
        }

        // CANCEL BOOKING

        [HttpDelete("{id}")]
        public IActionResult CancelBooking(
            int id)
        {
            var result =
                _bookingService.CancelBooking(id);

            if (!result)
            {
                return NotFound(
                    "Booking Not Found");
            }

            return Ok(new
            {
                message =
                "Booking Cancelled Successfully"
            });
        }
    }
}