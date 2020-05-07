using System;
using System.Net;
using System.Threading;
using System.Threading.Tasks;
using Application.Exceptions;
using FluentValidation;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Persistence;

namespace Application.Reply
{
    public class Create
    {
        public class Command : IRequest
        {
            public Guid CommentId { get; set; }
            public string FingerPrint { get; set; }
            public string AuthorEmail { get; set; }
            public string AuthorDisplayName { get; set; }
            public string Content { get; set; }
        }


        public class CommandValidator : AbstractValidator<Command>
        {
            public CommandValidator()
            {
                RuleFor(x => x.FingerPrint).NotEmpty();
                RuleFor(x => x.AuthorEmail).NotEmpty().EmailAddress();
                RuleFor(x => x.AuthorDisplayName).NotEmpty().MinimumLength(4);
                RuleFor(x => x.Content).NotEmpty().MinimumLength(10);
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
                var comment = await _context.Comments.FirstOrDefaultAsync(x => x.Id == request.CommentId, cancellationToken);
                if (comment == null)
                {
                    throw new RestException(HttpStatusCode.BadRequest, new { Reply = "Comment not found." });
                }

                var anonUser = await _context.AnonymousUsers.FirstOrDefaultAsync(x => x.FingerPrint == request.FingerPrint);
                if (anonUser == null)
                {
                    throw new RestException(HttpStatusCode.BadRequest, new { Reply = "Anonymous User not found." });
                }

                var reply = new Domain.Reply
                {
                    AuthorDisplayName = request.AuthorDisplayName,
                    AuthorEmail = request.AuthorEmail,
                    Content = request.Content,
                    CreationDate = DateTime.Now,
                    Author = anonUser
                };

                comment.Replies.Add(reply);

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