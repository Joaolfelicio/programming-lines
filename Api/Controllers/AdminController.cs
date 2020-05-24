using System.Threading.Tasks;
using Application.Admin;
using Microsoft.AspNetCore.Mvc;

namespace Api.Controllers
{
    public class AdminController : BaseController
    {
        [HttpPost("UploadImage")]
        public async Task<ActionResult<string>> Add([FromForm] UploadImage.Command command)
        {
            return await Mediator.Send(command);
        }
    }
}