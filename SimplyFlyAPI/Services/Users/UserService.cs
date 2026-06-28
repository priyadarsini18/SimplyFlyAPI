using SimplyFlyAPI.Data;
using SimplyFlyAPI.DTOs.User_DTO;
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
        public bool UpdateUser(int id, UpdateUserDto dto)
        {
            var user = _context.Users.FirstOrDefault(u => u.UserId == id);

            if (user == null)
                return false;

            user.FullName = dto.FullName;
            user.Email = dto.Email;
            user.PhoneNumber = dto.PhoneNumber;
            user.DateOfBirth = dto.DateOfBirth;
            user.Gender = dto.Gender;
            user.Address = dto.Address;
            user.City = dto.City;
            user.State = dto.State;
            user.Country = dto.Country;
            user.ProfileImage = dto.ProfileImage;

            _context.SaveChanges();

            return true;
        }
    }
}
