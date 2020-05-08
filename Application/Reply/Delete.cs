using System;
using System.Linq;
using System.Net;
using System.Threading;
using System.Threading.Tasks;
using Application.Exceptions;
using Application.Interface;
using FluentValidation;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Persistence;

namespace Application.Reply
{
    public class Delete
    {
        public class Command : IRequest
        {
            public Guid ReplyId { get; set; }
            public string FingerPrint { get; set; }
            public Guid CommentId { get; set; }
        }

        public class CommandValidator : AbstractValidator<Command>
        {
            public CommandValidator()
            {
                RuleFor(x => x.CommentId).NotEmpty();
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
                var reply = await _context.Replies.FirstOrDefaultAsync(x => x.Id == request.ReplyId, cancellationToken);

                var anonUser = await _context.AnonymousUsers.FirstOrDefaultAsync(x => x.FingerPrint == request.FingerPrint, cancellationToken);
                var user = await _context.Users.FirstOrDefaultAsync(x => x.UserName == _userAccessor.GetCurrentusername(), cancellationToken);
                var post = await _context.Posts.FirstOrDefaultAsync(x => x.Comments.Any(x => x.Id == request.CommentId));

                //If user is not the author of the post and is not the author of the reply
                if (user != post.Author && reply.Author != anonUser)
                {
                    throw new RestException(HttpStatusCode.Unauthorized, new { Reply = "Unauthorized" });
                }

                if (reply == null)
                {
                    throw new RestException(HttpStatusCode.NotFound, new { Reply = "Not found." });
                }

                var comment = await _context.Comments.FirstOrDefaultAsync(x => x.Id == request.CommentId, cancellationToken);

                if (comment == null)
                {
                    throw new RestException(HttpStatusCode.BadRequest, new { Reply = "Comment not found." });
                }
                
                comment.Replies.Remove(reply);

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