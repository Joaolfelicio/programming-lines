using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using Application.Post;
using Application.Post.Model;
using Domain;
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

        [HttpDelete("{id}")]
        [Authorize]
        public async Task<ActionResult<Unit>> Delete(Guid id)
        {
            return await Mediator.Send(new Delete.Command { Id = id });
        }

        [HttpPut("{id}")]
        [Authorize]
        public async Task<ActionResult<Unit>> Update(Guid id, Update.Command command)
        {
            command.Id = id;
            return await Mediator.Send(command);
        }

        [HttpGet("{slug}")]
        public async Task<ActionResult<PostDto>> Details(string slug)
        {
            return await Mediator.Send(new Details.Query { Slug = slug });
        }
    }
}