using System;
using System.Threading.Tasks;
using MediatR;
using Microsoft.AspNetCore.Mvc;
using Application.Reply;

namespace Api.Controllers
{
    public class ReplyController : BaseController
    {
        [HttpPost("{commentId}")]
        public async Task<ActionResult<Unit>> Create(Guid commentId, Create.Command command)
        {
            command.CommentId = commentId;
            return await Mediator.Send(command);
        }

        [HttpDelete("{replyId}")]
        public async Task<ActionResult<Unit>> Delete(Guid replyId, Delete.Command command)
        {
            command.ReplyId = replyId;
            return await Mediator.Send(command);
        }
    }
}