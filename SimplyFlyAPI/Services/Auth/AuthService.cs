using SimplyFlyAPI.Data;
using SimplyFlyAPI.Models;

namespace SimplyFlyAPI.Services.Auth
{
    public class AuthService : IAuthService
    {
        private readonly AppDbContext _context;
        private readonly JwtService _jwtService;

        public AuthService(
            AppDbContext context,
            JwtService jwtService)
        {
            _context = context;
            _jwtService = jwtService;
        }

        public User Register(User user)
        {
            user.Password =
                BCrypt.Net.BCrypt.HashPassword(
                    user.Password);

            _context.Users.Add(user);

            _context.SaveChanges();

            return user;
        }

        public string Login(
            string email,
            string password)
        {
            var user =
                _context.Users
                .FirstOrDefault(
                    u => u.Email == email);

            if (user == null)
            {
                return string.Empty;
            }

            if (!user.IsEmailVerified)
            {
                return "EMAIL_NOT_VERIFIED";
            }

            bool isPasswordValid =
                BCrypt.Net.BCrypt.Verify(
                    password,
                    user.Password);

            if (!isPasswordValid)
            {
                return string.Empty;
            }

            return _jwtService.GenerateToken(
                user.UserId,
                user.Email,
                user.Role);
        }

        public User GetUserByEmail(string email)
        {
            return _context.Users
                .FirstOrDefault(
                    u => u.Email == email);
        }
    }
}