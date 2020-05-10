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
using Application.Reaction.Model;
using Application.AnonymousUser.Model;

namespace Application.Reaction
{
    public class React
    {
        public class Command : IRequest<ReactionDto>
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

        public class Handler : IRequestHandler<Command, ReactionDto>
        {
            private readonly DataContext _context;
            public Handler(DataContext context)
            {
                _context = context;
            }

            public async Task<ReactionDto> Handle(Command request, CancellationToken cancellationToken)
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

                // If reaction doesnt exist, create it
                if (reaction == null)
                {
                    reaction = new Domain.Reaction
                    {
                        IsPositive = true,
                        Author = author,
                        ReactionDate = DateTime.Now
                    };
                    post.Reactions.Add(reaction);
                }
                //If it exists, update it
                else
                {
                    reaction.IsPositive = !reaction.IsPositive;
                }

                var success = await _context.SaveChangesAsync() > 0;

                if (success)
                {
                    return new ReactionDto
                    {
                        Id = reaction.Id,
                        IsPositive = reaction.IsPositive,
                        ReactionDate = reaction.ReactionDate,
                        Author = new AnonymousUserDto
                        {
                            Id = reaction.Author.Id,
                            CreationDate = reaction.Author.CreationDate
                        }
                    };
                }

                throw new Exception("Problem saving the changes");
            }
        }
    }
}