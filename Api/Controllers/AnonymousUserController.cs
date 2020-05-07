using System.Collections.Generic;
using System.Threading.Tasks;
using Application.AnonymousUser;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace Api.Controllers
{
    public class AnonymousUserController : BaseController
    {
        [HttpGet]
        [Authorize]
        public async Task<ActionResult<List<Domain.AnonymousUser>>> List()
        {
            return await Mediator.Send(new List.Query());
        }

        [HttpPost]
        public async Task<ActionResult<Domain.AnonymousUser>> Create(Create.Command command)
        {
            return await Mediator.Send(command);
        }
    }
}