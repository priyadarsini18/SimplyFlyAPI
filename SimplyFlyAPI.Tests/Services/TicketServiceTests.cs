using Microsoft.EntityFrameworkCore;
using NUnit.Framework;
using SimplyFlyAPI.Data;
using SimplyFlyAPI.Models;
using SimplyFlyAPI.Services.Tickets;

namespace SimplyFlyAPI.Tests.Services
{
    [TestFixture]
    public class TicketServiceTests
    {
        private TicketService _ticketService = null!;
        private AppDbContext _context = null!;

        [SetUp]
        public void Setup()
        {
            var options =
                new DbContextOptionsBuilder<AppDbContext>()
                .UseInMemoryDatabase(Guid.NewGuid().ToString())
                .Options;

            _context =
                new AppDbContext(options);

            _ticketService =
                new TicketService(_context);
        }

        //==========================================
        // Generate Ticket
        //==========================================

        [Test]
        public void GenerateTicket_ValidTicket_ReturnsTicket()
        {
            var ticket =
                new Ticket
                {
                    BookingId = 1,
                    PNR = "PNR123",
                    SeatNumber = "A1"
                };

            var result =
                _ticketService.GenerateTicket(ticket);

            Assert.That(result, Is.Not.Null);

            Assert.That(
                result.PNR,
                Is.EqualTo("PNR123"));
        }

        [Test]
        public void GenerateTicket_SetsIssueDate()
        {
            var ticket =
                new Ticket
                {
                    BookingId = 1,
                    PNR = "PNR124",
                    SeatNumber = "A2"
                };

            var result =
                _ticketService.GenerateTicket(ticket);

            Assert.That(
                result.IssueDate,
                Is.Not.EqualTo(default(DateTime)));
        }

        [Test]
        public void GenerateTicket_SavesTicketInDatabase()
        {
            var ticket =
                new Ticket
                {
                    BookingId = 1,
                    PNR = "PNR125",
                    SeatNumber = "A3"
                };

            _ticketService.GenerateTicket(ticket);

            Assert.That(
                _context.Tickets.Count(),
                Is.EqualTo(1));
        }

        //==========================================
        // Get Tickets
        //==========================================

        [Test]
        public void GetTickets_Empty_ReturnsEmptyList()
        {
            var result =
                _ticketService.GetTickets();

            Assert.That(result, Is.Empty);
        }

        [Test]
        public void GetTickets_ReturnsAllTickets()
        {
            _context.Tickets.AddRange(

                new Ticket
                {
                    BookingId = 1,
                    PNR = "PNR001",
                    SeatNumber = "A1"
                },

                new Ticket
                {
                    BookingId = 2,
                    PNR = "PNR002",
                    SeatNumber = "B2"
                });

            _context.SaveChanges();

            var result =
                _ticketService.GetTickets();

            Assert.That(
                result.Count,
                Is.EqualTo(2));
        }

        //==========================================
        // Get Ticket By Id
        //==========================================

        [Test]
        public void GetTicketById_ValidId_ReturnsTicket()
        {
            var ticket =
                new Ticket
                {
                    BookingId = 1,
                    PNR = "PNR126",
                    SeatNumber = "C3"
                };

            _context.Tickets.Add(ticket);

            _context.SaveChanges();

            var result =
                _ticketService.GetTicketById(
                    ticket.TicketId);

            Assert.That(result, Is.Not.Null);

            Assert.That(
                result!.PNR,
                Is.EqualTo("PNR126"));
        }

        [Test]
        public void GetTicketById_InvalidId_ReturnsNull()
        {
            var result =
                _ticketService.GetTicketById(
                    999);

            Assert.That(result, Is.Null);
        }

        [TearDown]
        public void TearDown()
        {
            _context.Dispose();
        }
    }
}