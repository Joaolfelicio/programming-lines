using System.Collections.Generic;
using System.Threading;
using System.Threading.Tasks;
using Application.Category.Model;
using Application.Post.Model;
using Application.User.Model;
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

                    var category = new CategoryDto
                    {
                        Code = post.Category.Code,
                        Name = post.Category.Name,
                        Color = post.Category.Color,
                        Image = post.Category.Image
                    };

                    var postDto = new PostDto
                    {
                        Slug = post.Slug,
                        Author = author,
                        Category = category,
                        Content = post.Content,
                        Image = post.Image,
                        PublishDate = post.PublishDate,
                        SubTitle = post.SubTitle,
                        Title = post.Title,
                        TotalComments = totalComments
                    };
                    postsDto.Add(postDto);
                }

                return postsDto;
            }
        }

    }
}