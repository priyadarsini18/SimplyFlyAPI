using Asp.Versioning;
using AutoMapper;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using SimplyFlyAPI.DTOs.Ticket;
using SimplyFlyAPI.Models;
using SimplyFlyAPI.Services.Tickets;

namespace SimplyFlyAPI.Controllers
{
    [ApiVersion("1.0")]
    [Route("api/v{version:apiVersion}/[controller]")]
    [ApiController]
    [Authorize(Roles = "User")]
    public class TicketController : ControllerBase
    {
        private readonly ITicketService
            _ticketService;
        private readonly IMapper _mapper;
        public TicketController(
            ITicketService ticketService, IMapper mapper)
        {
            _ticketService =
                ticketService;
            _mapper = mapper;
        }

        // GET ALL TICKETS

        [HttpGet]
        public IActionResult GetTickets()
        {
            return Ok(_ticketService.GetTickets());
        }

        // GET TICKET BY ID

        [HttpGet("{id}")]
        public IActionResult GetTicketById(int id)
        {
            var ticket =_ticketService.GetTicketById(id);

            if (ticket == null)
            {
                return NotFound(
                    "Ticket Not Found");
            }

            return Ok(ticket);
        }

        // GENERATE TICKET

        [HttpPost]
        public IActionResult GenerateTicket(TicketDto dto)
        {

            var ticket = _mapper.Map<Ticket>(dto);

            return Ok(new
            {
                message =
                "Ticket Generated Successfully"
            });
        }
    }
}