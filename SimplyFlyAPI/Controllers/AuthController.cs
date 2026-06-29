using Asp.Versioning;
using AutoMapper;
using Google.Apis.Auth;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Logging;
using SimplyFlyAPI.Data;
using SimplyFlyAPI.DTOs.Auth;
using SimplyFlyAPI.DTOs.Auth_DTOs;
using SimplyFlyAPI.Models;
using SimplyFlyAPI.Services;
using SimplyFlyAPI.Services.Auth;

namespace SimplyFlyAPI.Controllers
{
    [ApiVersion("1.0")]
    [Route("api/v{version:apiVersion}/[controller]")]
    [ApiController]
    public class AuthController : ControllerBase
    {
        private readonly AppDbContext _context;
        private readonly JwtService _jwtService;
        private readonly IConfiguration _configuration;
        private readonly IAuthService _authService;
        private readonly IMapper _mapper;
        private readonly ILogger<AuthController> _logger;
        private readonly IEmailService _emailService;

        public AuthController(
            IAuthService authService,
            IMapper mapper,
            ILogger<AuthController> logger,
            IConfiguration configuration,
            AppDbContext context,
            JwtService jwtService,
            IEmailService emailService)
        {
            _authService = authService;
            _mapper = mapper;
            _logger = logger;
            _configuration = configuration;
            _context = context;
            _jwtService = jwtService;
            _emailService = emailService;
        }


        // REGISTER USER
        [HttpPost("register-user")]
        public async Task<IActionResult> RegisterUser(
    RegisterUserDto dto)
        {
            var existingUser =
    _context.Users
    .FirstOrDefault(
        x => x.Email == dto.Email);

            if (existingUser != null)
            {
                return BadRequest(
                    "Email already registered");
            }
            var otp =
                new Random()
                .Next(100000, 999999)
                .ToString();

            Console.WriteLine($"Generated OTP: {otp}");

            var user =
                _mapper.Map<User>(dto);

            user.Role = "User";
            user.IsEmailVerified = false;
            user.EmailOtp = otp;
            user.EmailOtpExpiry =
                DateTime.Now.AddMinutes(10);

            var registeredUser =
                _authService.Register(user);

            Console.WriteLine(
                $"About to send email to: {user.Email}");

            await _emailService
                .SendVerificationEmail(
                    user.Email,
                    otp);

            Console.WriteLine(
                "Verification email method completed");

            return Ok(new
            {
                Message =
                    "Registration Successful. OTP Sent.",
                Email = user.Email
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

            if (token == "EMAIL_NOT_VERIFIED")
            {
                return BadRequest(
                    "Please verify your email first.");
            }

            if (string.IsNullOrEmpty(token))
            {
                return Unauthorized(
                    "Invalid Credentials");
            }

            var user =
                _authService.GetUserByEmail(
                    dto.Email);

            return Ok(new
            {
                Message = "Login Successful",
                Token = token,
                UserId = user.UserId,
                FullName = user.FullName,
                Email = user.Email,
                PhoneNumber = user.PhoneNumber,
                Role = user.Role
            });
        }
        /*[HttpPost("login")]
        public IActionResult Login(LoginDto dto)
        {
            try
            {
                var token = _authService.Login(dto.Email, dto.Password);

                if (token == "EMAIL_NOT_VERIFIED")
                {
                    return BadRequest("Please verify your email first.");
                }

                if (string.IsNullOrEmpty(token))
                {
                    return Unauthorized("Invalid Credentials");
                }

                var user = _authService.GetUserByEmail(dto.Email);

                return Ok(new
                {
                    Message = "Login Successful",
                    Token = token,
                    UserId = user.UserId,
                    FullName = user.FullName,
                    Email = user.Email,
                    PhoneNumber = user.PhoneNumber,
                    Role = user.Role
                });
            }
            catch (Exception ex)
            {
                return BadRequest(ex.ToString());
            }
        }*/


        [HttpPost("register-flightowner")]
        public async Task<IActionResult> RegisterFlightOwner(
    RegisterFlightOwnerDto dto)
        {
            var existingUser =
    _context.Users
    .FirstOrDefault(
        x => x.Email == dto.Email);

            if (existingUser != null)
            {
                return BadRequest(
                    "Email already registered");
            }
            var key =
                _configuration[
                    "FlightOwnerSettings:RegistrationKey"];

            if (dto.RegistrationKey != key)
            {
                return BadRequest(
                    "Invalid Flight Owner Registration Key");
            }

            var otp =
                new Random()
                .Next(100000, 999999)
                .ToString();

            var user =
                _mapper.Map<User>(dto);

            user.Role = "FlightOwner";

            user.IsEmailVerified = false;

            user.EmailOtp = otp;

            user.EmailOtpExpiry =
                DateTime.Now.AddMinutes(10);

            _authService.Register(user);

            await _emailService
                .SendVerificationEmail(
                    user.Email,
                    otp);

            return Ok(new
            {
                Message =
                    "Flight Owner Registered Successfully. OTP Sent.",
                Email = user.Email
            });
        }

        [HttpPost("forgot-password")]
        public async Task<IActionResult> ForgotPassword(
    ForgotPasswordDto dto)
        {
            var user =
                _context.Users
                .FirstOrDefault(
                    u => u.Email == dto.Email);

            if (user == null)
            {
                return NotFound(
                    "User not found");
            }

            var otp =
                new Random()
                .Next(100000, 999999)
                .ToString();

            user.ResetOtp =
                otp;

            user.OtpExpiry =
                DateTime.Now
                .AddMinutes(10);

            _context.SaveChanges();

            await _emailService
                .SendOtpEmail(
                    user.Email,
                    otp);

            return Ok(
                "OTP Sent Successfully");
        }
        [HttpPost("verify-otp")]
        public IActionResult VerifyOtp(
    VerifyOtpDto dto)
        {
            var user =
                _context.Users
                .FirstOrDefault(
                    u => u.Email == dto.Email);

            if (user == null)
            {
                return NotFound();
            }

            if (user.ResetOtp != dto.Otp)
            {
                return BadRequest(
                    "Invalid OTP");
            }

            if (user.OtpExpiry < DateTime.Now)
            {
                return BadRequest(
                    "OTP Expired");
            }

            return Ok(
                "OTP Verified");
        }

        [HttpPost("google-login")]
        public async Task<IActionResult> GoogleLogin(
    GoogleLoginDto dto)
        {
            try
            {
                var payload =
                    await GoogleJsonWebSignature
                    .ValidateAsync(dto.Token);

                var user =
                    _context.Users
                    .FirstOrDefault(
                        u => u.Email == payload.Email);

                if (user == null)
                {
                    user = new User
                    {
                        FullName = payload.Name,
                        Email = payload.Email,
                        Role = "User",
                        IsEmailVerified = true,
                        CreatedAt = DateTime.Now,

                        // Temporary password
                        Password = BCrypt.Net.BCrypt.HashPassword(
                            Guid.NewGuid().ToString())
                    };

                    _context.Users.Add(user);

                    _context.SaveChanges();
                }

                var token =
    _jwtService.GenerateToken(
        user.UserId,
        user.Email,
        user.Role
    );

                return Ok(new
                {
                    Token = token,
                    UserId = user.UserId,
                    FullName = user.FullName,
                    Email = user.Email,
                    Role = user.Role
                });
            }
            catch (Exception ex)
            {
                return BadRequest(
                    $"Google Login Failed: {ex.Message}");
            }
        }
        [HttpPost("reset-password")]
        public IActionResult ResetPassword(
    ResetPasswordDto dto)
        {
            var user = _context.Users
                .FirstOrDefault(u => u.Email == dto.Email);

            if (user == null)
            {
                return NotFound("User not found");
            }

            user.Password =
                BCrypt.Net.BCrypt.HashPassword(
                    dto.NewPassword);

            user.ResetOtp = null;
            user.OtpExpiry = null;

            _context.SaveChanges();

            return Ok("Password Updated Successfully");
        }
        [HttpPost("verify-email")]
        public IActionResult VerifyEmail(
    VerifyEmailDto dto)
        {
            var user =
                _context.Users
                .FirstOrDefault(
                    x => x.Email == dto.Email);

            if (user == null)
            {
                Console.WriteLine("USER NOT FOUND");
                return NotFound();
            }

            Console.WriteLine($"Entered OTP = {dto.Otp}");
            Console.WriteLine($"DB OTP      = {user.EmailOtp}");

            if (user.EmailOtp != dto.Otp)
            {
                Console.WriteLine("OTP MISMATCH");
                return BadRequest("Invalid OTP");
            }

            Console.WriteLine($"Expiry = {user.EmailOtpExpiry}");
            Console.WriteLine($"Now    = {DateTime.Now}");


            if (user.EmailOtpExpiry == null ||
    user.EmailOtpExpiry < DateTime.Now)
            {
                Console.WriteLine("OTP EXPIRED");
                return BadRequest("OTP Expired");
            }

            user.IsEmailVerified = true;
            user.EmailOtp = null;
            user.EmailOtpExpiry = null;

            _context.SaveChanges();

            Console.WriteLine("EMAIL VERIFIED");

            return Ok("Email Verified Successfully");
        }
    }
}