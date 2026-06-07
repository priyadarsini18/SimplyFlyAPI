
namespace SimplyFlyAPI.Models
{
    public class ErrorResponse
    {
        // Standardized error response structure
        public int StatusCode { get; set; }

        public string Message { get; set; } = string.Empty;
    }
}