namespace SimplyFlyAPI.DTOs.Auth_DTOs
{
    public class RegisterFlightOwnerDto
    {
        public string FullName { get; set; }
        public string Email { get; set; }
        public string Password { get; set; }
        public string PhoneNumber { get; set; }

        public string RegistrationKey { get; set; }
    }
}
