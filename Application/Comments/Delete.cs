using System;
using System.Net;
using System.Threading;
using System.Threading.Tasks;
using Application.Exceptions;
using Application.Interface;
using FluentValidation;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Persistence;

namespace Application.Comments
{
    public class Delete
    {
        public class Command : IRequest
        {
            public Guid CommentId { get; set; }
            public Guid PostId { get; set; }
            public string FingerPrint { get; set; }
        }

        public class CommandValidator : AbstractValidator<Command>
        {
            public CommandValidator()
            {
                RuleFor(x => x.PostId).NotEmpty();
            }
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
                var comment = await _context.Comments.FirstOrDefaultAsync(x => x.Id == request.CommentId);

                var anonUser = await _context.AnonymousUsers.FirstOrDefaultAsync(x => x.Fingerprint == request.FingerPrint, cancellationToken);
                var user = await _context.Users.FirstOrDefaultAsync(x => x.UserName == _userAccessor.GetCurrentusername());

                var post = await _context.Posts.FirstOrDefaultAsync(x => x.Id == request.PostId, cancellationToken);

                //If user is not the author of the post and is not the author of the comment
                if (user != post.Author && comment.Author != anonUser)
                {
                    throw new RestException(HttpStatusCode.Unauthorized, new { Comment = "Unauthorized" });
                }

                if (post == null)
                {
                    throw new RestException(HttpStatusCode.BadRequest, new { Comment = "Post not found." });
                }

                if (comment == null)
                {
                    throw new RestException(HttpStatusCode.NotFound, new { Comment = "Not found." });
                }



                _context.Replies.RemoveRange(comment.Replies);
                post.Comments.Remove(comment);

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