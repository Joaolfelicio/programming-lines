#nullable enable
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
    public class PostController : BaseController
    {
        [HttpGet]
        public async Task<ActionResult<List.PostEnvelope>> List(int? limit, int? offset, string? categoryCode, string? filter, string? order)
        {
            return await Mediator.Send(new List.Query(limit, offset, categoryCode, filter, order));
        }

        [HttpPost]
        [Authorize]
        public async Task<ActionResult<Unit>> Create(Create.Command command)
        {
            return await Mediator.Send(command);
        }

        [HttpDelete("{postId}")]
        [Authorize]
        public async Task<ActionResult<Unit>> Delete(Guid postId)
        {
            return await Mediator.Send(new Delete.Command { Id = postId });
        }

        [HttpPut("{postId}")]
        [Authorize]
        public async Task<ActionResult<Unit>> Update(Guid postId, Update.Command command)
        {
            command.Id = postId;
            return await Mediator.Send(command);
        }

        [HttpGet("{slug}")]
        public async Task<ActionResult<PostDto>> Details(string slug)
        {
            return await Mediator.Send(new Details.Query { Slug = slug });
        }

        [HttpGet("SearchablePosts")]
        public async Task<ActionResult<List<SearchablePostDto>>> ListSearchable()
        {
            return await Mediator.Send(new ListSearchable.Query());
        }
    }
}