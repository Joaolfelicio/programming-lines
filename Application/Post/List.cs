using System.Collections.Generic;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;
using Application.Post.Model;
using Application.User.Model;
using Domain;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Persistence;

namespace Application.Post
{
    public class List
    {

        public class Query : IRequest<List<PostDto>> { }

        public class Handler : IRequestHandler<Query, List<PostDto>>
        {
            private readonly DataContext _context;
            public Handler(DataContext context)
            {
                _context = context;
            }

            public async Task<List<PostDto>> Handle(Query request, CancellationToken cancellationToken)
            {
                var posts = await _context.Posts.ToListAsync(cancellationToken);
                var postsDto = new List<PostDto>();

                foreach (var post in posts)
                {
                    //Get the total number of comments (comments + replies)
                    var totalComments = post.Comments.Count;
                    foreach (var comment in post.Comments)
                    {
                        totalComments += comment.Replies.Count;
                    }

                    var author = new UserDto
                    {
                        DisplayName = post.Author.DisplayName,
                        UserName = post.Author.UserName,
                        Image = post.Author.Image
                    };

                    var postDto = new PostDto
                    {
                        Id = post.Id,
                        Slug = post.Slug,
                        Author = author,
                        Category = post.Category,
                        Content = post.Content,
                        Image = post.Image,
                        PublishDate = post.PublishDate,
                        SubTitle = post.SubTitle,
                        Title = post.Title,
                        TotalComments = totalComments,
                        Comments = post.Comments,
                        Reactions = post.Reactions
                    };
                    postsDto.Add(postDto);
                }
                return postsDto;
            }
        }

    }
}