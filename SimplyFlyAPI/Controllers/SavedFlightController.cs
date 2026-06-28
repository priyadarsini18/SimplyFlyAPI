using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using SimplyFlyAPI.Data;
using SimplyFlyAPI.DTOs;
using SimplyFlyAPI.Models;
using System.Security.Claims;

namespace TodoDemoApi_New.Controllers
{
    [Route("api/v{version:apiVersion}/[controller]")]
    [ApiController]
    [Authorize]
    public class SavedFlightController : ControllerBase
    {
        private readonly AppDbContext _context;

        public SavedFlightController(AppDbContext context)
        {
            _context = context;
        }

        [HttpPost]
        public async Task<IActionResult> SaveFlight(
            SaveFlightDto dto)
        {
            var userIdClaim =
                User.FindFirst(ClaimTypes.NameIdentifier);

            if (userIdClaim == null)
            {
                return Unauthorized("User not found");
            }

            var userId =
                int.Parse(userIdClaim.Value);

            var savedFlight = new SavedFlight
            {
                UserId = userId,
                FlightId = dto.FlightId,
                SavedDate = DateTime.Now
            };
            Console.WriteLine($"UserId = {userId}");
            Console.WriteLine($"FlightId = {dto.FlightId}");
            _context.SavedFlights.Add(savedFlight);

            await _context.SaveChangesAsync();

            return Ok("Flight Saved Successfully");
        }
        [HttpGet]
        public IActionResult GetSavedFlights()
        {
            var userId = int.Parse(
                User.FindFirst(ClaimTypes.NameIdentifier)!.Value
            );

            var flights = _context.SavedFlights
                .Where(x => x.UserId == userId)
                .Select(x => new
                {
                    x.SavedFlightId,
                    x.FlightId,
                    x.Flight.FlightName,
                    x.Flight.FromCity,
                    x.Flight.ToCity,
                    x.Flight.Price,
                    x.SavedDate
                })
                .ToList();

            return Ok(flights);
        }
        [HttpDelete("{id}")]
        public async Task<IActionResult> RemoveSavedFlight(int id)
        {
            var userId = int.Parse(
                User.FindFirst(ClaimTypes.NameIdentifier)!.Value
            );

            var savedFlight = await _context.SavedFlights.FindAsync(id);

            if (savedFlight == null)
                return NotFound();

            if (savedFlight.UserId != userId)
                return Unauthorized();

            _context.SavedFlights.Remove(savedFlight);

            await _context.SaveChangesAsync();

            return Ok("Removed Successfully");
        }
    }
}