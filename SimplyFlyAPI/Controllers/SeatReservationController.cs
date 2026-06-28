using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using SimplyFlyAPI.Data;
using SimplyFlyAPI.DTOs;
using SimplyFlyAPI.Models;
using System.Security.Claims;

namespace SimplyFlyAPI.Controllers
{
    [ApiController]
    [Route("api/v{version:apiVersion}/[controller]")]
    [Authorize]
    public class SeatReservationController : ControllerBase
    {
        private readonly AppDbContext _context;

        public SeatReservationController(AppDbContext context)
        {
            _context = context;
        }

        // ==========================
        // Reserve Seat
        // ==========================

        [HttpPost]
        public async Task<IActionResult> ReserveSeat(
            SeatReservationDto dto)
        {
            var userIdClaim =
                User.FindFirst(ClaimTypes.NameIdentifier);

            if (userIdClaim == null)
                return Unauthorized();

            int userId =
                int.Parse(userIdClaim.Value);

            var flight =
                await _context.Flights.FindAsync(dto.FlightId);

            if (flight == null)
                return NotFound("Flight not found.");

            bool alreadyReserved =
                await _context.SeatReservations.AnyAsync(x =>
                    x.FlightId == dto.FlightId &&
                    x.SeatNumber == dto.SeatNumber);

            if (alreadyReserved)
            {
                return BadRequest("Seat already reserved.");
            }

            var reservation = new SeatReservation
            {
                UserId = userId,
                FlightId = dto.FlightId,
                SeatNumber = dto.SeatNumber,
                ReservedDate = DateTime.Now
            };

            _context.SeatReservations.Add(reservation);

            await _context.SaveChangesAsync();

            return Ok(new
            {
                message = "Seat reserved successfully"
            });
        }

        // ==========================
        // Reserved Seats of Flight
        // ==========================

        [HttpGet("{flightId}")]
        public async Task<IActionResult> GetReservedSeats(
            int flightId)
        {
            var seats =
                await _context.SeatReservations
                .Where(x => x.FlightId == flightId)
                .Select(x => x.SeatNumber)
                .ToListAsync();

            return Ok(seats);
        }

        // ==========================
        // My Reservations
        // ==========================

        [HttpGet("my-reservations")]
        public async Task<IActionResult> MyReservations()
        {
            var userId =
                int.Parse(
                    User.FindFirst(ClaimTypes.NameIdentifier)!.Value
                );

            var reservations =
                await _context.SeatReservations
                .Include(x => x.Flight)
                .Where(x => x.UserId == userId)
                .OrderByDescending(x => x.ReservedDate)
                .ToListAsync();

            return Ok(reservations);
        }

        // ==========================
        // Cancel Reservation
        // ==========================

        [HttpDelete("{reservationId}")]
        public async Task<IActionResult> CancelReservation(
            int reservationId)
        {
            var reservation =
                await _context.SeatReservations
                .FindAsync(reservationId);

            if (reservation == null)
                return NotFound();

            _context.SeatReservations.Remove(reservation);

            await _context.SaveChangesAsync();

            return Ok("Reservation Cancelled");
        }
    }
}