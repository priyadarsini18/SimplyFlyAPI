using SimplyFlyAPI.Models;
using System.Net.Sockets;

namespace SimplyFlyAPI.Services.Tickets
{
    public interface ITicketService
    {
        List<Ticket> GetTickets();

        Ticket? GetTicketById(int id);

        Ticket GenerateTicket(
            Ticket ticket);
    }
}