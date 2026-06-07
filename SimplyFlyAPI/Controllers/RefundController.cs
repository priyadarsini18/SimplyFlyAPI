using Asp.Versioning;
using AutoMapper;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using SimplyFlyAPI.DTOs.Refund;
using SimplyFlyAPI.Models;
using SimplyFlyAPI.Services.Refunds;

namespace SimplyFlyAPI.Controllers
{
    [ApiVersion("1.0")]
    [Route("api/v{version:apiVersion}/[controller]")]
    [ApiController]
    [Authorize(Roles = "User")]
    public class RefundController : ControllerBase
    {
        private readonly IRefundService
            _refundService;
        private readonly IMapper _mapper;
        public RefundController(
            IRefundService refundService, IMapper mapper)
        {
            _refundService =
                refundService;
            _mapper = mapper;
        }

        // GET ALL REFUNDS

        [HttpGet]
        public IActionResult GetRefunds()
        {
            return Ok(
                _refundService.GetRefunds());
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