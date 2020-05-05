using System;
using System.Net;
using System.Threading;
using System.Threading.Tasks;
using Application.Exceptions;
using Application.Interface;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Persistence;

namespace Application.Post
{
    public class Delete
    {
        public class Command : IRequest
        {
            public string Slug { get; set; }
        }

        public class Handler : IRequestHandler<Command>
        {
            private readonly DataContext _context;
            private readonly IUserAccessor _userAccessor;
            public Handler(DataContext context, IUserAccessor userAccessor)
            {
                _userAccessor = userAccessor;
                _context = context;
            }

            public async Task<Unit> Handle(Command request, CancellationToken cancellationToken)
            {
                var post = await _context.Posts.FirstOrDefaultAsync(x => x.Slug == request.Slug);

                if (post == null)
                {
                    throw new RestException(HttpStatusCode.NotFound, new { Post = "Post was not found." });
                }

                if (post.Author.UserName != _userAccessor.GetCurrentusername())
                {
                    throw new RestException(HttpStatusCode.Unauthorized, "You don't have enough permission to delete this post.");
                }

                _context.Posts.Remove(post);

                var success = await _context.SaveChangesAsync() > 0;

                if (success)
                {
                    return Unit.Value;
                }

                throw new Exception("Problem saving the changes");
            }
        }
    }
}