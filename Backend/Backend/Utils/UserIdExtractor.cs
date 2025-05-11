using System.Security.Claims;

namespace Backend.Utils {
    public static class UserIdExtractor {
        public static int GetUserId(this ClaimsPrincipal user)
        {
            var idValue = user.FindFirstValue(ClaimTypes.NameIdentifier);
            if (string.IsNullOrEmpty(idValue))
                throw new UnauthorizedAccessException("User ID not found in token");
            return int.Parse(idValue);
        }
    }
}
