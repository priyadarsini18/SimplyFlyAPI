using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;
using Microsoft.OpenApi;
using SimplyFlyAPI.Data;
using SimplyFlyAPI.Middleware;
using SimplyFlyAPI.Services;
using SimplyFlyAPI.Services.Admin;
using SimplyFlyAPI.Services.Auth;
using SimplyFlyAPI.Services.Booking;
using SimplyFlyAPI.Services.Flights;
using SimplyFlyAPI.Services.Passengers;
using SimplyFlyAPI.Services.Payments;
using SimplyFlyAPI.Services.Refunds;
using SimplyFlyAPI.Services.Routes;
using SimplyFlyAPI.Services.Tickets;
using SimplyFlyAPI.Services.Users;
using SimplyFlyAPI.Mappings;
using System.Text;
using Asp.Versioning;

var builder = WebApplication.CreateBuilder(args);

// Controllers

builder.Services.AddControllers();

//API Versioning

// 1. Add standard API Versioning
builder.Services.AddApiVersioning(options =>
{
    options.DefaultApiVersion = new Asp.Versioning.ApiVersion(1, 0);
    options.AssumeDefaultVersionWhenUnspecified = true;
    options.ReportApiVersions = true;
})
// 2. Add the API Explorer that formats the version string for Swagger
.AddApiExplorer(options =>
{
    options.GroupNameFormat = "'v'VVV"; // Formats version as v1.0
    options.SubstituteApiVersionInUrl = true; // This forces Swagger to replace '{version}' in routes
});


//AutoMapper

builder.Services.AddAutoMapper(typeof(MappingProfile));


// Swagger
// Swagger Configuration
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen(c =>
{
    c.SwaggerDoc(
        "v1",
        new OpenApiInfo 
        {
            Title = "SimplyFly API",
            Version = "v1"
        });

    c.AddSecurityDefinition(
        "Bearer",
        new OpenApiSecurityScheme // 🔑 Uses root Microsoft.OpenApi namespace implicitly
        {
            Name = "Authorization",
            Type = SecuritySchemeType.Http,
            Scheme = "bearer",
            BearerFormat = "JWT",
            In = ParameterLocation.Header,
            Description = "Enter JWT Token"
        });

    c.AddSecurityRequirement(document => new OpenApiSecurityRequirement
    {
        {
            new OpenApiSecuritySchemeReference("Bearer", document),
            new List<string>()
        }
    });
});


// Database

builder.Services.AddDbContext<AppDbContext>(options =>
    options.UseSqlServer(
        builder.Configuration.GetConnectionString(
            "DefaultConnection")));

// JWT Service

builder.Services.AddScoped<JwtService>();

// Service Registrations

builder.Services.AddScoped<IFlightService, FlightService>();
builder.Services.AddScoped<IAdminService, AdminService>();
builder.Services.AddScoped<IBookingService, BookingService>();
builder.Services.AddScoped<IAuthService, AuthService>();
builder.Services.AddScoped<IPassengerService, PassengerService>();
builder.Services.AddScoped<IPaymentService, PaymentService>();
builder.Services.AddScoped<IRouteService, RouteService>();
builder.Services.AddScoped<ITicketService, TicketService>();
builder.Services.AddScoped<IUserService, UserService>();
builder.Services.AddScoped<IRefundService,RefundService>();

// JWT Authentication

builder.Services
    .AddAuthentication(
        JwtBearerDefaults.AuthenticationScheme)
    .AddJwtBearer(options =>
    {
        options.TokenValidationParameters =
            new TokenValidationParameters
            {
                ValidateIssuer = false,
                ValidateAudience = false,
                ValidateLifetime = true,
                ValidateIssuerSigningKey = true,

                IssuerSigningKey =
    new SymmetricSecurityKey(
        Encoding.UTF8.GetBytes(
            builder.Configuration["Jwt:Key"]!))
            };
    });

// Authorization

builder.Services.AddAuthorization();

builder.Services
    .AddExceptionHandler<GlobalExceptionHandler>();

builder.Services
    .AddProblemDetails();

// Build

var app = builder.Build();

// Swagger Middleware

if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI(c =>
    {
        // Points Swagger UI specifically to your v1 endpoint configuration
        c.SwaggerEndpoint("/swagger/v1/swagger.json", "SimplyFly API v1");
    });
}

// Middleware

app.UseExceptionHandler();

app.UseHttpsRedirection();

app.UseAuthentication();

app.UseAuthorization();

app.MapControllers();

app.Run();