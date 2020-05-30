using System.Threading.Tasks;
using Application.Admin;
using Microsoft.AspNetCore.Mvc;

namespace Api.Controllers
{
    public class AdminController : BaseController
    {
        [HttpPost("UploadPostImage")]
        public async Task<ActionResult<string>> AddPostImage([FromForm] UploadPostImage.Command command)
        {
            return await Mediator.Send(command);
        }

        [HttpPost("UploadCategoryImage")]
        public async Task<ActionResult<string>> AddCategoryImage([FromForm] UploadCategoryImage.Command command)
        {
            return await Mediator.Send(command);
        }
    }
}