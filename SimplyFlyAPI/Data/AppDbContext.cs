using Microsoft.EntityFrameworkCore;
using SimplyFlyAPI.Models;

namespace SimplyFlyAPI.Data
{
    public class AppDbContext : DbContext
    {
        public AppDbContext(DbContextOptions<AppDbContext> options): base(options)
        {
        }

        public DbSet<User> Users { get; set; }

        public DbSet<Flight> Flights { get; set; }
        public DbSet<FlightRoute> Routes { get; set; }
        public DbSet<Booking> Bookings { get; set; }

        public DbSet<Passenger> Passengers { get; set; }
        public DbSet<Payment> Payments { get; set; }
        public DbSet<Ticket> Tickets { get; set; }
        public DbSet<Refund> Refunds { get; set; }
    }
}