using System.Net;
using System.Threading;
using System.Threading.Tasks;
using Application.Exceptions;
using Application.Post.Model;
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
            public Handler(DataContext context)
            {
                _context = context;
            }

            public async Task<PostDto> Handle(Query request, CancellationToken cancellationToken)
            {
                var post = await _context.Posts.FirstOrDefaultAsync(x => x.Slug == request.Slug, cancellationToken);

                if (post == null)
                {
                    throw new RestException(HttpStatusCode.NotFound, new { Post = "Not found" });
                }

                //Get the total number of comments (comments + replies)
                var totalComments = post.Comments.Count;
                foreach (var comment in post.Comments)
                {
                    totalComments += comment.Replies.Count;
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
                    TotalComments = totalComments,
                    Category = post.Category,
                    Author = author,
                    Comments = post.Comments,
                    Reactions = post.Reactions
                };
            }
        }
    }
}