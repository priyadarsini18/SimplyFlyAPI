using Asp.Versioning;
using AutoMapper;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Razorpay.Api;
using SimplyFlyAPI.Data;
using SimplyFlyAPI.DTOs.Payment;

using SimplyFlyAPI.DTOs.Payment_DTO;
using SimplyFlyAPI.Models;
using SimplyFlyAPI.Services.Payments;

namespace SimplyFlyAPI.Controllers
{
    [ApiVersion("1.0")]
    [Route("api/v{version:apiVersion}/[controller]")]
    [ApiController]
    [Authorize(Roles = "User,Admin")]
    public class PaymentController : ControllerBase
    {
        private readonly IPaymentService _paymentService;
        private readonly IConfiguration _configuration;

        private readonly IMapper _mapper;
        private readonly AppDbContext _context;
        public PaymentController(
            IPaymentService paymentService, AppDbContext context, IMapper mapper, IConfiguration configuration)
        {
            _paymentService = paymentService;
            _mapper = mapper;
            _context = context;
            _configuration = configuration;
        }

        // GET ALL PAYMENTS

        [HttpGet]
        public IActionResult GetPayments()
        {
            return Ok(_paymentService.GetPayments());
        }

        // GET PAYMENT BY ID

        [HttpGet("{id}")]
        public IActionResult GetPaymentById(
            int id)
        {
            var payment =_paymentService.GetPaymentById(id);

            if (payment == null)
            {
                return NotFound("Payment Not Found");
            }

            return Ok(payment);
        }

        // ADD PAYMENT

        [HttpPost]
        public IActionResult AddPayment(PaymentDto dto)
        {
            var payment = _mapper.Map<Models.Payment>(dto);

            _paymentService.AddPayment(payment);

            return Ok(new
            {
                message ="Payment Successful"
            });
        }

        [HttpPost("create-order")]
        public IActionResult CreateOrder(
   CreateOrderDto dto)
        {
            var key =
                _configuration["Razorpay:Key"];

            var secret =
                _configuration["Razorpay:Secret"];

            RazorpayClient client =
                new RazorpayClient(
                    key,
                    secret);

            Dictionary<string, object> options =
                new Dictionary<string, object>();

            options.Add(
                "amount",
                dto.Amount * 100);

            options.Add(
                "currency",
                "INR");

            options.Add(
                "receipt",
                Guid.NewGuid().ToString());

            try
            {
                Console.WriteLine($"Key: rzp_test_T3z52kKg47L8s1");
                Console.WriteLine($"Secret = D3YZwd0dFcOJnzAUx543S1HA");
                Console.WriteLine($"Amount = {dto.Amount}");
                Order order = client.Order.Create(options);

                return Ok(new
                {
                    id = order["id"].ToString(),
                    amount = Convert.ToInt32(order["amount"]),
                    currency = order["currency"].ToString()
                });
            }
            catch (Exception ex)
            {
                return BadRequest(ex.ToString());
            }

            
        }
        [Authorize]
        [HttpGet("history")]
        public async Task<IActionResult> PaymentHistory()
        {
            var userIdClaim = User.FindFirst(System.Security.Claims.ClaimTypes.NameIdentifier);

            if (userIdClaim == null)
                return Unauthorized();

            int userId = int.Parse(userIdClaim.Value);

            var payments = await _context.Payments
                .Include(p => p.Booking)
                .Where(p => p.Booking.UserId == userId)
                .OrderByDescending(p => p.PaymentDate)
                .Select(p => new PaymentHistoryDto
                {
                    PaymentId = p.PaymentId,
                    BookingId = p.BookingId,
                    Amount = p.Amount,
                    PaymentMethod = p.PaymentMethod,
                    PaymentStatus = p.PaymentStatus,
                    PaymentDate = p.PaymentDate
                })
                .ToListAsync();

            return Ok(payments);
        }
    }
}