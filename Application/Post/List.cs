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

        public class Query : IRequest<List<PostDto>> { }

        public class Handler : IRequestHandler<Query, List<PostDto>>
        {
            private readonly DataContext _context;
            private readonly IPopulateData _populateData;
            public Handler(DataContext context, IPopulateData populateData)
            {
                _populateData = populateData;
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
                return postsDto;
            }
        }

    }
}