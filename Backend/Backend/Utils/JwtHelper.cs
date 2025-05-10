using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using Backend.Models;
using Microsoft.IdentityModel.Tokens;

public static class JwtHelper {
    public static string Generate(User user, IConfiguration cfg) {
        var key = new SymmetricSecurityKey(
            System.Text.Encoding.UTF8.GetBytes(cfg["Jwt:Key"]!));
        var creds = new SigningCredentials(key, SecurityAlgorithms.HmacSha256);

        var token = new JwtSecurityToken(
            issuer: cfg["Jwt:Issuer"],
            audience: cfg["Jwt:Audience"],
            claims: new[]
            {
                new Claim(ClaimTypes.NameIdentifier, user.Id.ToString()),
                new Claim("username", user.Username),
                new Claim("name", $"{user.Name} {user.Surname}")
            },
            expires: DateTime.UtcNow.AddHours(1),
            signingCredentials: creds);

        return new JwtSecurityTokenHandler().WriteToken(token);
    }
}