using SimplyFlyAPI.DTOs.User_DTO;
using SimplyFlyAPI.Models;

namespace SimplyFlyAPI.Services.Users
{
    public interface IUserService
    {
        List<User> GetUsers();

        User? GetUserById(int id);

        bool UpdateUser(
            int id,
            UpdateUserDto dto);
    }
}