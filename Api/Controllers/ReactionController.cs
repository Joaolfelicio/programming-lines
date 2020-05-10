using System.Threading.Tasks;
using Application.Reaction;
using Application.Reaction.Model;
using MediatR;
using Microsoft.AspNetCore.Mvc;

namespace Api.Controllers
{
    public class ReactionController : BaseController
    {
        [HttpPost]
        public async Task<ActionResult<ReactionDto>> Create(React.Command command)
        {
            return await Mediator.Send(command);
        }
    }
}