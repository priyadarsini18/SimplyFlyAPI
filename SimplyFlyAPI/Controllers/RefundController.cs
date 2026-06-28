using Asp.Versioning;
using AutoMapper;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using SimplyFlyAPI.Data;
using SimplyFlyAPI.DTOs.Refund;
using SimplyFlyAPI.DTOs.Refund_DTO;
using SimplyFlyAPI.Models;
using SimplyFlyAPI.Services.Refunds;

namespace SimplyFlyAPI.Controllers
{
    [ApiVersion("1.0")]
    [Route("api/v{version:apiVersion}/[controller]")]
    [ApiController]
    [Authorize]
    public class RefundController : ControllerBase
    {
        private readonly IRefundService
            _refundService;
        private readonly IMapper _mapper;
        private readonly AppDbContext _context;
        public RefundController(
    IRefundService refundService,
    IMapper mapper,
    AppDbContext context)
        {
            _refundService = refundService;
            _mapper = mapper;
            _context = context;
        }

        // GET ALL REFUNDS
        // GET ALL REFUNDS

        [Authorize(Roles = "Admin,FlightOwner")]
        [HttpGet]
        public IActionResult GetRefunds()
        {
            // ----------------------------
            // ADMIN -> See all refunds
            // ----------------------------

            if (User.IsInRole("Admin"))
            {
                var adminRefunds = _context.Refunds

                    .Include(r => r.Booking)
                        .ThenInclude(b => b.User)

                    .Include(r => r.Booking)
                        .ThenInclude(b => b.Flight)

                    .Select(r => new
                    {
                        r.RefundId,

                        PassengerName = r.Booking.User.FullName,

                        FlightName = r.Booking.Flight.FlightName,

                        FromCity = r.Booking.Flight.FromCity,

                        ToCity = r.Booking.Flight.ToCity,

                        TotalAmount = r.Booking.TotalAmount,

                        r.RefundAmount,

                        r.RefundStatus
                    })

                    .OrderByDescending(r => r.RefundId)

                    .ToList();

                return Ok(adminRefunds);
            }

            // -----------------------------------
            // FLIGHT OWNER -> Only own refunds
            // -----------------------------------

            var ownerId = int.Parse(
                User.FindFirst(System.Security.Claims.ClaimTypes.NameIdentifier)!.Value);

            var ownerRefunds = _context.Refunds

                .Include(r => r.Booking)
                    .ThenInclude(b => b.User)

                .Include(r => r.Booking)
                    .ThenInclude(b => b.Flight)

                .Where(r => r.Booking.Flight.FlightOwnerId == ownerId)

                .Select(r => new
                {
                    r.RefundId,

                    PassengerName = r.Booking.User.FullName,

                    FlightName = r.Booking.Flight.FlightName,

                    FromCity = r.Booking.Flight.FromCity,

                    ToCity = r.Booking.Flight.ToCity,

                    TotalAmount = r.Booking.TotalAmount,

                    r.RefundAmount,

                    r.RefundStatus
                })

                .OrderByDescending(r => r.RefundId)

                .ToList();

            return Ok(ownerRefunds);
        }
        [Authorize(Roles = "Admin,FlightOwner")]
        [HttpPut("process/{id}")]
        public async Task<IActionResult> ProcessRefund(
    int id,
    RefundProcessDto dto)
        {
            var result = await _refundService.ProcessRefund(
                id,
                dto.RefundAmount);

            if (!result)
            {
                return NotFound("Refund not found");
            }

            return Ok(new
            {
                message = "Refund Processed Successfully"
            });
        }
        // GET REFUND BY ID

        [HttpGet("{id}")]
        public IActionResult GetRefundById(
            int id)
        {
            var refund =
                _refundService
                .GetRefundById(id);

            if (refund == null)
            {
                return NotFound(
                    "Refund Not Found");
            }

            return Ok(refund);
        }

        // CREATE REFUND

        [HttpPost]
        public IActionResult AddRefund(
            CreateRefundDto dto)
        {
            var refund = _mapper.Map<Refund>(dto);

            _refundService
                .AddRefund(refund);

            return Ok(new
            {
                message =
                "Refund Processed Successfully"
            });
        }
        
    }
}