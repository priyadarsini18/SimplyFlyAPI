using Asp.Versioning;
using AutoMapper;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using SimplyFlyAPI.DTOs.Route;
using SimplyFlyAPI.Models;
using SimplyFlyAPI.Services.Routes;

namespace SimplyFlyAPI.Controllers
{
    [ApiVersion("1.0")]
    [Route("api/v{version:apiVersion}/[controller]")]
    [ApiController]
    
    public class RouteController : ControllerBase
    {
        private readonly IRouteService _routeService;
        private readonly IMapper _mapper;
        public RouteController(
            IRouteService routeService, IMapper mapper)
        {
            _routeService = routeService;
            _mapper = mapper;
        }

        // GET ALL ROUTES

        [HttpGet]
        public IActionResult GetRoutes()
        {
            var routes =
                _routeService.GetRoutes();

            return Ok(routes);
        }

        // GET ROUTE BY ID

        [HttpGet("{id}")]
        public IActionResult GetRouteById(
            int id)
        {
            var route =
                _routeService.GetRouteById(id);

            if (route == null)
            {
                return NotFound(
                    "Route Not Found");
            }

            return Ok(route);
        }

        // ADD ROUTE

        [HttpPost]
        public IActionResult AddRoute(RouteDto dto)
        {
            var route = _mapper.Map<FlightRoute>(dto);

            _routeService.AddRoute(route);

            return Ok(new
            {
                message = "Route Added Successfully"
            });
        }
    }
}