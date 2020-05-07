using System;
using System.Threading.Tasks;
using Application.Comments;
using MediatR;
using Microsoft.AspNetCore.Mvc;

namespace Api.Controllers
{
    public class CommentController : BaseController
    {
        [HttpPost("{postId}")]
        public async Task<ActionResult<Unit>> Create(Guid postId, Create.Command command)
        {
            command.PostId = postId;
            return await Mediator.Send(command);
        }

        [HttpDelete("{commentId}")]
        public async Task<ActionResult<Unit>> Delete(Guid commentId, Delete.Command command)
        {
            command.CommentId = commentId;
            return await Mediator.Send(command);
        }
    }
}