using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Application.AnonymousUser.Model;
using Application.Comments.Model;
using Application.Interface;
using Application.Post.Model;
using Application.Reaction.Model;
using Application.Reply.Model;
using Microsoft.EntityFrameworkCore;
using Persistence;

namespace Infrastructure.Generator
{
    public class PopulateData : IPopulateData
    {
        private readonly DataContext _context;
        public PopulateData(DataContext context)
        {
            _context = context;

        }
        public List<CommentDto> PopulateComments(Domain.Post post)
        {
            var comments = new List<CommentDto>();
            foreach (var comment in post.Comments)
            {
                comments.Add(new CommentDto
                {
                    AuthorDisplayName = comment.AuthorDisplayName,
                    AuthorEmail = comment.AuthorEmail,
                    Content = comment.Content,
                    Id = comment.Id,
                    PublishedDate = comment.PublishedDate,
                    Author = new AnonymousUserDto
                    {
                        Id = comment.Author.Id,
                        CreationDate = comment.Author.CreationDate
                    },
                    Replies = PopulateReplies(comment)
                });
            }
            return comments;
        }

        public List<ReactionDto> PopulateReactions(Domain.Post post)
        {
            var reactions = new List<ReactionDto>();

            foreach (var reaction in post.Reactions)
            {
                reactions.Add(new ReactionDto
                {
                    Id = reaction.Id,
                    IsPositive = reaction.IsPositive,
                    ReactionDate = reaction.ReactionDate,
                    Author = new AnonymousUserDto
                    {
                        Id = reaction.Author.Id,
                        CreationDate = reaction.Author.CreationDate
                    }
                });
            }
            return reactions;
        }

        public async Task<List<RecommendedPostDto>> PopulateRecommendPost(Domain.Post post)
        {
            //Get two recommend posts, based on date, not older than a year, and not the post itself
            var recommendPosts = _context.Posts.Where(x => x.PublishDate.AddDays(+360) > DateTime.Now && x.Id != post.Id);

            var rand = new Random();
            //get a random number between 0 and the posts count minus 2, 2 so we get 2 posts
            var randomNumToSkip = rand.Next(0, recommendPosts.Count() - 2);

            var randRecommendPosts = await recommendPosts.Skip(randomNumToSkip).Take(2).ToListAsync();

            var recommendPostsDto = new List<RecommendedPostDto>();

            foreach (var recommendPost in randRecommendPosts)
            {
                recommendPostsDto.Add(new RecommendedPostDto
                {
                    Id = recommendPost.Id,
                    Slug = recommendPost.Slug,
                    Title = recommendPost.Title,
                    Image = recommendPost.Image,
                    PublishDate = recommendPost.PublishDate,
                    Category = recommendPost.Category,
                    Content = recommendPost.Content
                });
            }

            return recommendPostsDto;
        }

        private List<ReplyDto> PopulateReplies(Domain.Comment comment)
        {
            var replies = new List<ReplyDto>();
            foreach (var reply in comment.Replies)
            {
                replies.Add(new ReplyDto
                {
                    Id = reply.Id,
                    AuthorDisplayName = reply.AuthorDisplayName,
                    AuthorEmail = reply.AuthorEmail,
                    Content = reply.Content,
                    CreationDate = reply.CreationDate,
                    Author = new AnonymousUserDto
                    {
                        Id = reply.Author.Id,
                        CreationDate = reply.Author.CreationDate
                    }
                });
            }
            return replies;
        }
    }
}