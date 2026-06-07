using SimplyFlyAPI.Models;

namespace SimplyFlyAPI.Services.Auth
{
    public interface IAuthService
    {
        User Register(User user);

        string Login(
            string email,
            string password);
    }
}