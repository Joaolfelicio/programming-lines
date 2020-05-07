using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using Api.Controllers;
using Application.Newsletter;
using MediatR;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace Api.Controllers
{
    public class NewsletterController : BaseController
    {
        [HttpGet]
        [Authorize]
        public async Task<ActionResult<List<Domain.Newsletter>>> List()
        {
            return await Mediator.Send(new List.Query());
        }
        
        [HttpPost]
        public async Task<ActionResult<Unit>> Create(Create.Command command)
        {
            return await Mediator.Send(command);
        }

        [HttpDelete("{newsletterId}")]
        public async Task<ActionResult<Unit>> Delete(Guid newsletterId)
        {
            return await Mediator.Send(new Delete.Command {Id = newsletterId});
        }
    }
}