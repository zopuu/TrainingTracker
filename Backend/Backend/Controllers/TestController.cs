using Microsoft.AspNetCore.Mvc;


namespace Backend.Controllers {

    [ApiController]
    [Route("api/[controller]")]
    public class TestController : Controller {
        
        [HttpGet]
        public IActionResult Test() {
            return Ok("This is a test. Standby!!");
        }
    }
}
