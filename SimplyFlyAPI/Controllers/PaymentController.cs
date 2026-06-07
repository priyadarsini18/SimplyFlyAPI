using Asp.Versioning;
using AutoMapper;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using SimplyFlyAPI.DTOs.Payment;
using SimplyFlyAPI.Models;
using SimplyFlyAPI.Services.Payments;

namespace SimplyFlyAPI.Controllers
{
    [ApiVersion("1.0")]
    [Route("api/v{version:apiVersion}/[controller]")]
    [ApiController]
    [Authorize(Roles = "User")]
    public class PaymentController : ControllerBase
    {
        private readonly IPaymentService
            _paymentService;

        private readonly IMapper _mapper;
        public PaymentController(
            IPaymentService paymentService, IMapper mapper)
        {
            _paymentService =paymentService;
            _mapper = mapper;
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
            var payment = _mapper.Map<Payment>(dto);

            _paymentService.AddPayment(payment);

            return Ok(new
            {
                message ="Payment Successful"
            });
        }
    }
}