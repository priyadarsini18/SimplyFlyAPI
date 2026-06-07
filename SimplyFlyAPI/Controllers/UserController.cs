using Asp.Versioning;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using SimplyFlyAPI.DTOs.User;
using SimplyFlyAPI.Models;
using SimplyFlyAPI.Services.Users;

namespace SimplyFlyAPI.Controllers
{
    [ApiVersion("1.0")]
    [Route("api/v{version:apiVersion}/[controller]")]
    [ApiController]
    public class UserController : ControllerBase
    {
        private readonly IUserService _userService;

        public UserController(
            IUserService userService)
        {
            _userService = userService;
        }
        

        // GET ALL USERS

        [HttpGet]
        public IActionResult GetUsers()
        {
            return Ok(
                _userService.GetUsers());
        }

        // GET USER BY ID

        [HttpGet("{id}")]
        public IActionResult GetUserById(
            int id)
        {
            var user =
                _userService.GetUserById(id);

            if (user == null)
            {
                return NotFound(
                    "User Not Found");
            }

            return Ok(user);
        }

        
    }
}