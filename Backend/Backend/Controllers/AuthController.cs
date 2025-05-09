using Backend.Data;
using Backend.DTOs;
using Backend.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace Backend.Controllers;

[ApiController]
[Route("api/auth")]
public class AuthController : ControllerBase
{
    private readonly AppDbContext _dbContext;
    private readonly IConfiguration _configuration;

    public AuthController(AppDbContext dbContext, IConfiguration configuration) {
        _dbContext = dbContext;
        _configuration = configuration;
    }

    [HttpPost("register")]
    public async Task<IActionResult> Register([FromBody] RegistrationDto dto)
    {
        if (await _dbContext.Users.AnyAsync(u => u.Username == dto.Username))
            return Conflict("Username already exists!");
        var user = new User
        {
            Username = dto.Username,
            Name = dto.Name,
            Surname = dto.Surname,
            PasswordHash = PasswordHasher.Hash(dto.Password)
        };
        _dbContext.Add(user);
        await _dbContext.SaveChangesAsync();
        return Created("", new { user.Id, user.Username });
    }

    [HttpPost("login")]
    [AllowAnonymous]
    public async Task<IActionResult> Login([FromBody] LoginDto dto)
    {
        var user = await _dbContext.Users.SingleOrDefaultAsync(u => u.Username == dto.Username);
        if (user is null || !PasswordHasher.Verify(dto.Password, user.PasswordHash))
            return Unauthorized("Invalid credentials");
        var jwt = JwtHelper.Generate(user, _configuration);
        Response.Cookies.Append("X-Access-Token", jwt, new CookieOptions
        {
            HttpOnly = true, Secure = false, SameSite = SameSiteMode.Lax, MaxAge = TimeSpan.FromHours(1)
        });
        return Ok(new { message = "Logged in" });
    }

    [HttpPost("logout")]
    [AllowAnonymous]
    public IActionResult Logout()
    {
        Response.Cookies.Delete("X-Access-Token");
        return NoContent();
    }

    [HttpGet("ping")]
    [Authorize]
    public IActionResult Ping() => Ok();
}
public record LoginDto(string Username, string Password);

