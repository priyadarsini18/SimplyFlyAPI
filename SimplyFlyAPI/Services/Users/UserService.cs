using SimplyFlyAPI.Data;
using SimplyFlyAPI.Models;

namespace SimplyFlyAPI.Services.Users
{
    public class UserService : IUserService
    {
        private readonly AppDbContext _context;

        public UserService(
            AppDbContext context)
        {
            _context = context;
        }

        public List<User> GetUsers()
        {
            return _context.Users.ToList();
        }

        public User? GetUserById(
            int id)
        {
            return _context.Users.Find(id);
        }

    }
}
