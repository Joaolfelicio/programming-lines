using System;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;
using Application.Interface;
using FluentValidation;
using MediatR;
using Persistence;
using Domain;
using Application.Exceptions;
using System.Net;
using Microsoft.EntityFrameworkCore;
using Application.Validators;

namespace Application.Post
{
    public class Create
    {
        public class Command : IRequest
        {
            public string Slug { get; set; }
            public string Image { get; set; }
            public string Title { get; set; }
            public string SubTitle { get; set; }
            public string Content { get; set; }
            public string CategoryCode { get; set; }
        }

        public class CommandValidator : AbstractValidator<Command>
        {
            public CommandValidator()
            {
                RuleFor(x => x.Title).NotEmpty().MinimumLength(6);
                RuleFor(x => x.Slug).SlugRules();
                RuleFor(x => x.Content).NotEmpty();
                RuleFor(x => x.CategoryCode).CategoryCodeRules();
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
                var user = await _context.Users.FirstOrDefaultAsync(x => x.UserName == _userAccessor.GetCurrentusername(), cancellationToken);

                var slugAlreadyExists = _context.Posts.Any(x => x.Slug == request.Slug);

                if (slugAlreadyExists)
                {
                    throw new RestException(HttpStatusCode.BadRequest, new { Post = "Slug needs to be unique." });
                }

                var category = await _context.Categories.FirstOrDefaultAsync(x => x.Code == request.CategoryCode, cancellationToken);

                if (category == null)
                {
                    throw new RestException(HttpStatusCode.BadRequest, new { Post = "Category was not found." });
                }

                var post = new Domain.Post()
                {
                    Author = user,
                    Category = category,
                    Slug = request.Slug,
                    Title = request.Title,
                    SubTitle = request.SubTitle,
                    Image = request.Image,
                    Content = request.Content,
                    PublishDate = DateTime.Now
                };

                _context.Posts.Add(post);

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