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
    [Authorize(Roles = "User,Admin")]
    public class BookingController : ControllerBase
    {
        private readonly IBookingService _bookingService;
        private readonly IMapper _mapper;

        public BookingController(
            IBookingService bookingService,
            IMapper mapper)
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

        // GET LOGGED-IN USER BOOKINGS
        [HttpGet("my-bookings")]
        public IActionResult GetMyBookings()
        {
            var userId =
    int.Parse(
        User.FindFirst(ClaimTypes.NameIdentifier)!.Value
    );

            var bookings =
                _bookingService.GetUserBookings(userId);

            return Ok(bookings);
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
        booking,
        dto.SeatIds);

            if (!result)
            {
                return BadRequest(
                    "Booking Failed");
            }

            return Ok(new
            {
                bookingId = booking.BookingId,
                message =
                "Flight Booked Successfully"
            });
        }

        // CANCEL BOOKING
        [HttpDelete("{id}")]
        public async Task<IActionResult> CancelBooking(int id)
        {
            var refund =
                await _bookingService
                .CancelBooking(id);

            if (refund == -1)
            {
                return NotFound();
            }

            return Ok(new
            {
                RefundAmount = refund
            });
        }

        [HttpGet("{id}")]
        public IActionResult GetBookingById(int id)
        {
            var booking = _bookingService.GetBookingById(id);

            if (booking == null)
            {
                return NotFound("Booking not found");
            }

            return Ok(booking);
        }
    }
}