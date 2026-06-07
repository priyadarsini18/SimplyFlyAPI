using SimplyFlyAPI.Data;
using SimplyFlyAPI.Models;
using System.Net.Sockets;

namespace SimplyFlyAPI.Services.Tickets
{
    public class TicketService
        : ITicketService
    {
        private readonly AppDbContext _context;

        public TicketService(
            AppDbContext context)
        {
            _context = context;
        }

        public List<Ticket> GetTickets()
        {
            return _context.Tickets
                .ToList();
        }

        public Ticket? GetTicketById(
            int id)
        {
            return _context.Tickets
                .Find(id);
        }

        public Ticket GenerateTicket(
            Ticket ticket)
        {
            ticket.IssueDate =
                DateTime.Now;

            _context.Tickets
                .Add(ticket);

            _context.SaveChanges();

            return ticket;
        }
    }
}