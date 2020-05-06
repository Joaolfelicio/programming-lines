using System;
using System.Net;
using System.Threading;
using System.Threading.Tasks;
using Application.Exceptions;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Persistence;

namespace Application.Post
{
    public class Update
    {
        public class Command : IRequest
        {
            public Guid Id { get; set; }
            public string Slug { get; set; }
            public string Image { get; set; }
            public string Title { get; set; }
            public string SubTitle { get; set; }
            public string Content { get; set; }
            public string CategoryCode { get; set; }
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
                var post = await _context.Posts.FirstOrDefaultAsync(x => x.Id == request.Id, cancellationToken);

                if (post == null)
                {
                    throw new RestException(HttpStatusCode.NotFound, new { Post = "Post not found." });
                }

                var categoryCode = request.CategoryCode ?? post.Category.Code;

                var category = await _context.Categories.FirstOrDefaultAsync(x => x.Code == categoryCode, cancellationToken);

                if (category == null)
                {
                    throw new RestException(HttpStatusCode.NotFound, new { Post = "Category was not found" });
                }

                post.Slug = request.Slug ?? post.Slug;
                post.Title = request.Title ?? post.Title;
                post.SubTitle = request.Title ?? post.SubTitle;
                post.Category = category ?? post.Category;
                post.Content = request.Content ?? post.Content;
                post.Image = request.Image ?? post.Image;

                var success = await _context.SaveChangesAsync() > 0;

                if (success)
                {
                    return Unit.Value;
                }

                throw new RestException(HttpStatusCode.NotModified, new { Post = "Not modifed since no field had value" });
            }
        }
    }
}