using System.Collections.Generic;
using System.Net;
using System.Threading;
using System.Threading.Tasks;
using Application.AnonymousUser.Model;
using Application.Comments.Model;
using Application.Exceptions;
using Application.Interface;
using Application.Post.Model;
using Application.Reaction.Model;
using Application.Reply.Model;
using Application.User.Model;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Persistence;

namespace Application.Post
{
    public class Details
    {

        public class Query : IRequest<PostDto>
        {
            public string Slug { get; set; }
        }

        public class Handler : IRequestHandler<Query, PostDto>
        {
            private readonly DataContext _context;
            private readonly IPopulateData _populateData;
            public Handler(DataContext context, IPopulateData populateData)
            {
                _populateData = populateData;
                _context = context;
            }

            public async Task<PostDto> Handle(Query request, CancellationToken cancellationToken)
            {
                var post = await _context.Posts.FirstOrDefaultAsync(x => x.Slug == request.Slug, cancellationToken);

                if (post == null)
                {
                    throw new RestException(HttpStatusCode.NotFound, new { Post = "Not found" });
                }

                var author = new UserDto
                {
                    UserName = post.Author.UserName,
                    DisplayName = post.Author.DisplayName,
                    Image = post.Author.Image
                };

                return new PostDto
                {
                    Id = post.Id,
                    Slug = post.Slug,
                    Title = post.Title,
                    SubTitle = post.SubTitle,
                    Image = post.Image,
                    Content = post.Content,
                    PublishDate = post.PublishDate,
                    Category = post.Category,
                    Author = author,
                    Comments = _populateData.PopulateComments(post),
                    Reactions = _populateData.PopulateReactions(post)
                };
            }
        }
    }
}