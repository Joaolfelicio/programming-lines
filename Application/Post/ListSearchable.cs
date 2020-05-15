using System.Collections.Generic;
using System.Threading;
using System.Threading.Tasks;
using Application.Post.Model;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Persistence;

namespace Application.Post
{
    public class ListSearchable
    {

        public class Query : IRequest<List<SearchablePostDto>> { }

        public class Handler : IRequestHandler<Query, List<SearchablePostDto>>
        {
            private readonly DataContext _context;
            public Handler(DataContext context)
            {
                _context = context;
            }

            public async Task<List<SearchablePostDto>> Handle(Query request, CancellationToken cancellationToken)
            {
                var posts = await _context.Posts.ToListAsync(cancellationToken);

                var searchablePosts = new List<SearchablePostDto>();

                foreach (var post in posts)
                {
                    searchablePosts.Add(new SearchablePostDto
                    {
                        Slug = post.Slug,
                        Title = post.Title,
                        Image = post.Image,
                        Description = post.Category.Name,
                        PublishDate = post.PublishDate
                    });
                }

                return searchablePosts;
            }
        }

    }
}