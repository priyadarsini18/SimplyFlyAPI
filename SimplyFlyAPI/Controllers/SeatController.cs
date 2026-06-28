using Microsoft.AspNetCore.Mvc;
using SimplyFlyAPI.Data;
using Microsoft.EntityFrameworkCore;

namespace SimplyFlyAPI.Controllers
{
    [ApiController]
    [Route("api/v1/[controller]")]
    public class SeatController : ControllerBase
    {
        private readonly AppDbContext _context;

        public SeatController(AppDbContext context)
        {
            _context = context;
        }

        [HttpGet("{flightId}")]
        public IActionResult GetSeats(int flightId)
        {
            var seats = _context.Seats
                .Where(s => s.FlightId == flightId)
                .ToList();

            return Ok(seats);
        }

        [HttpPut("book-seat/{seatId}")]
        public IActionResult BookSeat(int seatId)
        {
            var seat = _context.Seats
                .FirstOrDefault(s => s.SeatId == seatId);

            if (seat == null)
                return NotFound();

            seat.IsBooked = true;

            _context.SaveChanges();

            return Ok();
        }
    }
}