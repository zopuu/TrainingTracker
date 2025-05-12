using Backend.Models;
using Backend.Services;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Backend.Utils;

namespace Backend.Controllers {
    [ApiController]
    [Route("api/stats")]
    [Authorize]
    public class StatisticsController : ControllerBase
    {
        private readonly IStatisticsService _service;
        public StatisticsController(IStatisticsService svc) => _service = svc;

        [HttpGet("month")]
        public async Task<IActionResult> Month([FromQuery] int year, int month)
        {
            var userId = User.GetUserId();
            var result = await _service.GetMonthAsync(userId, year, month);
            return Ok(result);
        }

        [HttpGet("week")]
        public async Task<IActionResult> Week([FromQuery] int year, int month, int week)
        {
            int userId = User.GetUserId();
            var result = await _service.GetWeekAsync(userId, year, month, week);
            return Ok(result);
        }

    }
}
