using System;
using System.Collections.Generic;
using System.Collections.ObjectModel;
using System.Net;
using System.Threading;
using System.Threading.Tasks;
using Application.Exceptions;
using Application.Reply.Model;
using Application.Validators;
using Domain;
using FluentValidation;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Persistence;

namespace Application.Comments
{
    public class Create
    {
        public class Command : IRequest
        {
            public Guid PostId { get; set; }
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
                var post = await _context.Posts.FirstOrDefaultAsync(x => x.Id == request.PostId, cancellationToken);
                if (post == null)
                {
                    throw new RestException(HttpStatusCode.BadRequest, new { Comment = "Post not found." });
                }

                var anonUser = await _context.AnonymousUsers.FirstOrDefaultAsync(x => x.FingerPrint == request.FingerPrint);
                if (anonUser == null)
                {
                    throw new RestException(HttpStatusCode.BadRequest, new { Comment = "Anonymous User not found." });
                }

                var comment = new Domain.Comment
                {
                    AuthorDisplayName = request.AuthorDisplayName,
                    AuthorEmail = request.AuthorEmail,
                    Content = request.Content,
                    PublishedDate = DateTime.Now,
                    Author = anonUser
                };

                post.Comments.Add(comment);

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