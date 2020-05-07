using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using Application.Category;
using MediatR;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace Api.Controllers
{
    public class CategoryController : BaseController
    {
        [HttpGet]
        public async Task<ActionResult<List<Domain.Category>>> List()
        {
            return await Mediator.Send(new List.Query());
        }

        [HttpGet("{categoryCode}")]
        public async Task<ActionResult<Domain.Category>> Details(string categoryCode)
        {
            return await Mediator.Send(new Details.Query {CategoryCode = categoryCode});
        }

        [HttpPost]
        [Authorize]
        public async Task<ActionResult<Unit>> Create(Create.Command command)
        {
            return await Mediator.Send(command);
        }

        [HttpPut("{categoryId}")]
        [Authorize]
        public async Task<ActionResult<Unit>> Update(Guid categoryId, Update.Command command)
        {
            command.Id = categoryId;
            return await Mediator.Send(command);
        }

        [HttpDelete("{categoryId}")]
        [Authorize]
        public async Task<ActionResult<Unit>> Delete(Guid categoryId)
        {
            return await Mediator.Send(new Delete.Command {Id = categoryId});
        }
    }
}