using System.Collections.Generic;
using System.Threading.Tasks;
using Application.Post;
using Application.Post.Model;
using MediatR;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace Api.Controllers
{
    public class PostsController : BaseController
    {
        [HttpGet]
        public async Task<ActionResult<List<PostDto>>> List()
        {
            return await Mediator.Send(new List.Query());
        }

        [HttpPost]
        [Authorize]
        public async Task<ActionResult<Unit>> Create(Create.Command command)
        {
            return await Mediator.Send(command);
        }

        [HttpDelete("{slug}")]
        [Authorize]
        public async Task<ActionResult<Unit>> Delete(string slug)
        {
            return await Mediator.Send(new Delete.Command { Slug = slug });
        }
    }
}