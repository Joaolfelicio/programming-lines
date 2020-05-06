using System;
using System.Net;
using System.Threading;
using System.Threading.Tasks;
using Application.Exceptions;
using Domain;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Persistence;
using System.Linq;
using FluentValidation;

namespace Application.Reaction
{
    public class Create
    {
        public class Command : IRequest
        {
            public Guid PostId { get; set; }
            public string AuthorFingerPrint { get; set; }
        }

        public class CommandValidator : AbstractValidator<Command>
        {
            public CommandValidator()
            {
                RuleFor(x => x.PostId).NotEmpty();
                RuleFor(x => x.AuthorFingerPrint).NotEmpty();
            }
        }

        public class Handler : IRequestHandler<Command>
        {
            private readonly DataContext _context;
            public Handler(DataContext context)
            {
                _context = context;
            }

            public async Task<Unit> Handle(Command request, CancellationToken cancellationToken)
            {
                var post = await _context.Posts.FirstOrDefaultAsync(x => x.Id == request.PostId, cancellationToken);

                if (post == null)
                {
                    throw new RestException(HttpStatusCode.BadRequest, new { Reaction = "Post was not found" });
                }

                var author = await _context.AnonymousUsers.FirstOrDefaultAsync(x => x.FingerPrint == request.AuthorFingerPrint, cancellationToken);

                if (author == null)
                {
                    throw new RestException(HttpStatusCode.BadRequest, new { Reaction = "Author was not found" });
                }

                var reaction = post.Reactions.FirstOrDefault(x => x.Author.FingerPrint == request.AuthorFingerPrint);

                if (reaction != null)
                {
                    throw new RestException(HttpStatusCode.BadRequest, new { Post = "You already reacted to this post" });
                }

                reaction = new Domain.Reaction
                {
                    IsPositive = true,
                    Author = author,
                    ReactionDate = DateTime.Now
                };

                post.Reactions.Add(reaction);

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