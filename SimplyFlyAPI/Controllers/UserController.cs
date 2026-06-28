using Asp.Versioning;
using Microsoft.AspNetCore.Mvc;
using SimplyFlyAPI.DTOs.User_DTO;
using SimplyFlyAPI.Services.Users;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Http;

namespace SimplyFlyAPI.Controllers
{
    [ApiVersion("1.0")]
    [Route("api/v{version:apiVersion}/[controller]")]
    [ApiController]
    public class UserController : ControllerBase
    {
        private readonly IUserService _userService;
        private readonly IWebHostEnvironment _environment;
        public UserController(
    IUserService userService,
    IWebHostEnvironment environment)
        {
            _userService = userService;
            _environment = environment;
        }

        // GET ALL USERS
        [HttpGet]
        public IActionResult GetUsers()
        {
            return Ok(_userService.GetUsers());
        }

        // GET USER BY ID
        [HttpGet("{id}")]
        public IActionResult GetUserById(int id)
        {
            var user = _userService.GetUserById(id);

            if (user == null)
            {
                return NotFound("User Not Found");
            }

            return Ok(user);
        }

        [HttpPut("{id}")]
        public IActionResult UpdateUser(
    int id,
    UpdateUserDto dto)
        {
            var result = _userService.UpdateUser(id, dto);

            if (!result)
                return NotFound("User Not Found");

            return Ok(new
            {
                message = "Profile Updated Successfully"
            });
        }
        [HttpPost("upload-profile")]
        public async Task<IActionResult> UploadProfile(
    IFormFile file)
        {
            if (file == null || file.Length == 0)
            {
                return BadRequest("No file selected.");
            }

            var fileName =
                Guid.NewGuid().ToString() +
                Path.GetExtension(file.FileName);

            var folderPath =
                Path.Combine(
                    _environment.WebRootPath,
                    "ProfileImages");

            if (!Directory.Exists(folderPath))
            {
                Directory.CreateDirectory(folderPath);
            }

            var filePath =
                Path.Combine(folderPath, fileName);

            using (var stream =
                new FileStream(filePath, FileMode.Create))
            {
                await file.CopyToAsync(stream);
            }

            return Ok(new
            {
                imageUrl = $"/ProfileImages/{fileName}"
            });
        }
    }
}