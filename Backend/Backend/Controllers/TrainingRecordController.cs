using System.Security.Claims;
using Backend.Models;
using Backend.Services;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace Backend.Controllers;

[ApiController]
[Route("api/[controller]")]
public class TrainingRecordController : Controller
{
    private readonly ITrainingRecordService _service;

    public TrainingRecordController(ITrainingRecordService service)
    {
        _service = service;

    }

    [HttpGet]
    [Authorize]
    public async Task<IActionResult> GetAll() =>
        Ok(await _service.GetAllAsync());

    [HttpGet("{id:int}")]
    public async Task<IActionResult> Get(int id) {
        var t = await _service.GetAsync(id);
        return t is null ? NotFound() : Ok(t);
    }

    [HttpPost]
    [Authorize]
    public async Task<IActionResult> Create([FromBody] TrainingRecord t)
    {
        var userId = int.Parse(User.FindFirstValue(ClaimTypes.NameIdentifier)!);
        t.UserId = userId;

        var created = await _service.CreateAsync(t);
        return CreatedAtAction(nameof(Get), new { id = created.Id }, created);
    }

    [HttpPut("{id:int}")]
    public async Task<IActionResult> Update(int id, [FromBody] TrainingRecord t) =>
        await _service.UpdateAsync(id, t) ? NoContent() : BadRequest();

    [HttpDelete("{id:int}")]
    public async Task<IActionResult> Delete(int id) {
        await _service.DeleteAsync(id);
        return NoContent();
    }
}

