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
        public DbSet<Seat> Seats { get; set; }
        public DbSet<SavedFlight> SavedFlights { get; set; }
        public DbSet<SeatReservation> SeatReservations { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);

            modelBuilder.Entity<Flight>()
                .HasOne(f => f.FlightOwner)
                .WithMany(u => u.Flights)
                .HasForeignKey(f => f.FlightOwnerId)
                .OnDelete(DeleteBehavior.Restrict);
        }
    }
}