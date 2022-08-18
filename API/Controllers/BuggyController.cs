using API.Errors;
using Infrastructure.Data;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;

namespace API.Controllers
{
    public class BuggyController : BaseApiController
    {
        private readonly ILogger<BuggyController> _logger;
        private readonly ShopContext context;

        public BuggyController(ILogger<BuggyController> logger, ShopContext context)
        {
            _logger = logger;
            this.context = context;
        }

        // public IActionResult Index()
        // {
        //     return View();
        // }

        // [ResponseCache(Duration = 0, Location = ResponseCacheLocation.None, NoStore = true)]
        // public IActionResult Error()
        // {
        //     return View("Error!");
        // }

        [HttpGet("Notfound")]
        public ActionResult GetNotFoundRequest()
        {
            var thing = context.Products.Find(42);
            if (thing == null)
            {
                return NotFound(new APIMessageResponse(404));
            }
            return Ok();
        }

        [HttpGet("ServerError")]
        public ActionResult GetServerError()
        {
            var thing = context.Products.Find(42);
            if (thing == null)
            {
                return Ok(new APIMessageResponse(500));
            }
            return Ok();
        }

        [HttpGet("NullRef")]
        public ActionResult GetNullRef()
        {
            var thing = context.Products.Find(42);
            var x = thing.ToString();
            return Ok();
        }

        [HttpGet("BadRequest")]
        public ActionResult GetBadRequest()
        {
            return BadRequest(new APIMessageResponse(400));
        }

        // [HttpGet("BadRequest/{id}")]
        // public ActionResult GetNotFoundRequest(int id)
        // {
        //     return Ok(new APIMessageResponse(400));
        // }
    }
}