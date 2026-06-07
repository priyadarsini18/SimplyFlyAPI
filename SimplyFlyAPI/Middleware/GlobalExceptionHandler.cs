using Microsoft.AspNetCore.Diagnostics;
using SimplyFlyAPI.Models;

namespace SimplyFlyAPI.Middleware
{
    public class GlobalExceptionHandler
        : IExceptionHandler
    {
        private readonly ILogger<GlobalExceptionHandler>
            _logger;

        public GlobalExceptionHandler(
            ILogger<GlobalExceptionHandler> logger)
        {
            _logger = logger;
        }

        public async ValueTask<bool>
            TryHandleAsync(
                HttpContext httpContext,
                Exception exception,
                CancellationToken cancellationToken)
        {
            _logger.LogError(
                exception,
                "Unhandled exception occurred");

            var response = new ErrorResponse
            {
                StatusCode =
                    StatusCodes
                    .Status500InternalServerError,

                Message =
                    "An unexpected error occurred."
            };

            httpContext.Response.StatusCode =
                response.StatusCode;

            await httpContext.Response
                .WriteAsJsonAsync(
                    response,
                    cancellationToken);

            return true;
        }
    }
}