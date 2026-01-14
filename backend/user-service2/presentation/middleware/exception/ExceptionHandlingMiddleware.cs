using application.exceptions;
using application.exeptions;
using System.Xml;

namespace presentation.middleware.exception
{
    public class ExceptionHandlingMiddleware
    {
        private readonly RequestDelegate _next;

        public ExceptionHandlingMiddleware(RequestDelegate next) 
        {
            _next = next;
        }

        public async Task Invoke(HttpContext context)
        {
            try
            {
                await _next(context);
            }
            catch (BadRequestException ex)
            {
                await WriteError(context, 400, ex.Code, ex.Message);
            }
            catch (ConflictException ex)
            {
                await WriteError(context, 409, ex.Code, ex.Message);
            }
            catch (Exception)
            {
                await WriteError(context, 500, "internal_error", "Internal server error");
            }
        }

        public async Task WriteError
        (
            HttpContext context, 
            int statusCode, 
            string code, 
            string message
        )
        {
            context.Response.StatusCode = statusCode;
            context.Response.ContentType = "application/json";

            var response = new ApiErrorResponseDTO()
            {
                StatusCode = statusCode,
                Code = code,
                Message = message
            };

            await context.Response.WriteAsJsonAsync(response);
        }
    }
}
