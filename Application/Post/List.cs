using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;
using Application.Interface;
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
        public class PostEnvelope
        {
            public List<PostDto> Posts { get; set; }
            public int PostsCount { get; set; }
        }

        public class Query : IRequest<PostEnvelope>
        {
            public int? Limit { get; set; }
            public int? Offset { get; set; }
            public string? CategoryCode { get; set; }
            public string? Filter { get; set; }
            public string Order { get; set; }

            public Query(int? limit, int? offset, string? categoryCode, string? filter, string order)
            {
                Limit = limit;
                Offset = offset;
                CategoryCode = categoryCode;
                Filter = filter;
                Order = order;
            }
        }

        public class Handler : IRequestHandler<Query, PostEnvelope>
        {
            private readonly DataContext _context;
            private readonly IPopulateData _populateData;
            public Handler(DataContext context, IPopulateData populateData)
            {
                _populateData = populateData;
                _context = context;
            }

            public async Task<PostEnvelope> Handle(Query request, CancellationToken cancellationToken)
            {
                IQueryable<Domain.Post> queryable;

                //Filter by publish date order
                if (request.Order == "descending")
                {
                    queryable = _context.Posts
                                        .OrderBy(x => x.PublishDate)
                                        .AsQueryable();
                }
                else
                {
                    queryable = _context.Posts
                                        .OrderByDescending(x => x.PublishDate)
                                        .AsQueryable();
                }

                //Filter by "filter type"
                if (request.Filter == "popular")
                {
                    queryable = _context.Posts
                                        .OrderByDescending(x => x.Reactions.Where(y => y.IsPositive).Count());
                }

                //Filter by category
                if (!String.IsNullOrWhiteSpace(request.CategoryCode))
                {
                    queryable = queryable.Where(x => x.Category.Code == request.CategoryCode);
                }

                // Get only a number of posts
                var posts = await queryable.Skip(request.Offset ?? 0)
                                           .Take(request.Limit ?? 3)
                                           .ToListAsync(cancellationToken);


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
                        Image = post.Image,
                        PublishDate = post.PublishDate,
                        SubTitle = post.SubTitle,
                        Title = post.Title,
                        Content = post.Content,
                        Comments = _populateData.PopulateComments(post),
                        Reactions = _populateData.PopulateReactions(post),
                        RecommendedPosts = await _populateData.PopulateRecommendPost(post)
                    };
                    postsDto.Add(postDto);
                }

                return new PostEnvelope
                {
                    Posts = postsDto,
                    PostsCount = posts.Count()
                };
            }
        }

    }
}