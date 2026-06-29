namespace SimplyFlyAPI.DTOs.Flight_DTOs
{
    public class UpdateFlightDto
    {
        public int FlightId { get; set; }

        public string FlightName { get; set; }

        public string FlightNumber { get; set; }

        public string FromCity { get; set; }

        public string ToCity { get; set; }

        public string? FromAirportName { get; set; }

        public string? FromAirportCode { get; set; }

        public string? ToAirportName { get; set; }

        public string? ToAirportCode { get; set; }

        public int RouteId { get; set; }

        public DateTime DepartureTime { get; set; }

        public DateTime ArrivalTime { get; set; }

        public decimal Price { get; set; }

        public int TotalSeats { get; set; }

        public int AvailableSeats { get; set; }

        public string Status { get; set; }

        public string? CabinClass { get; set; }

        public string? Stop1 { get; set; }

        public string? Stop2 { get; set; }

        public string? FlightType { get; set; }

        public string? JourneyType { get; set; }

        public bool FoodIncluded { get; set; }

        public int CabinBaggageKg { get; set; }

        public int CheckInBaggageKg { get; set; }
    }
}
