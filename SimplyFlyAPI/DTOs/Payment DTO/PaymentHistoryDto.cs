namespace SimplyFlyAPI.DTOs.Payment_DTO
{
    public class PaymentHistoryDto
    {
        public int PaymentId { get; set; }

        public int BookingId { get; set; }

        public decimal Amount { get; set; }

        public string PaymentMethod { get; set; } = string.Empty;

        public string PaymentStatus { get; set; } = string.Empty;

        public DateTime PaymentDate { get; set; }
    }
}
