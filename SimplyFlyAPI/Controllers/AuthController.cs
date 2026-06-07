using Asp.Versioning;
using AutoMapper;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using SimplyFlyAPI.DTOs.Auth;
using SimplyFlyAPI.Models;
using SimplyFlyAPI.Services.Auth;

namespace SimplyFlyAPI.Controllers
{
    [ApiVersion("1.0")]
    [Route("api/v{version:apiVersion}/[controller]")]
    [ApiController]
    public class AuthController : ControllerBase
    {
        private readonly IAuthService _authService;
        private readonly IMapper _mapper;
        private readonly ILogger<AuthController> _logger;

        public AuthController(
            IAuthService authService,
            IMapper mapper,
            ILogger<AuthController> logger)
        {
            _authService = authService;
            _mapper = mapper;
            _logger = logger;
        }

        // REGISTER ADMIN

        [HttpPost("register-Admin")]
        public IActionResult Register(RegisterAdminDto dto)
        {
            if (dto.AdminKey != "2026")
            {
                _logger.LogWarning(
                    "Invalid Admin Registration Attempt. Email: {Email}",
                    dto.Email);

                return Unauthorized("Invalid Admin Key");
            }

            var user = _mapper.Map<User>(dto);
            user.Role = "Admin";

            _authService.Register(user);

            _logger.LogInformation(
                "Admin Registered Successfully. Email: {Email}",
                user.Email);

            return Ok(new
            {
                Message = "Admin Registered Successfully"
            });
        }

        // REGISTER USER

        [HttpPost("register-user")]
        public IActionResult RegisterUser(RegisterUserDto dto)
        {
            var user = _mapper.Map<User>(dto);

            user.Role = "User";

            var registeredUser =
                _authService.Register(user);

            _logger.LogInformation(
                "User Registered Successfully. Email: {Email}",
                user.Email);

            return Ok(new
            {
                Message = "User Registered Successfully",
                UserId = registeredUser.UserId
            });
        }

        // REGISTER FLIGHT OWNER

        [HttpPost("register-flightowner")]
        public IActionResult RegisterFlightOwner(
            RegisterFlightOwnerDto dto)
        {
            if (dto.FlightOwnerKey != "FLY2026")
            {
                _logger.LogWarning(
                    "Invalid Flight Owner Registration Attempt. Email: {Email}",
                    dto.Email);

                return Unauthorized(
                    "Invalid Flight Owner Key");
            }

            var user =
                _mapper.Map<User>(dto);

            user.Role = "FlightOwner";

            var registeredUser =
                _authService.Register(user);

            _logger.LogInformation(
                "Flight Owner Registered Successfully. Email: {Email}",
                user.Email);

            return Ok(new
            {
                Message =
                    "Flight Owner Registered Successfully",
                UserId =
                    registeredUser.UserId
            });
        }

        // LOGIN

        [HttpPost("login")]
        public IActionResult Login(LoginDto dto)
        {
            var token =
                _authService.Login(
                    dto.Email,
                    dto.Password);

            if (string.IsNullOrEmpty(token))
            {
                _logger.LogWarning(
                    "Failed Login Attempt. Email: {Email}",
                    dto.Email);

                return Unauthorized(
                    "Invalid Credentials");
            }

            _logger.LogInformation(
                "User Logged In Successfully. Email: {Email}",
                dto.Email);

            return Ok(new
            {
                Message = "Login Successful",
                Token = token
            });
        }
    }
}