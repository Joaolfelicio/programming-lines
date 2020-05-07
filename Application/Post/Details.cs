using System.Collections.Generic;
using System.Net;
using System.Threading;
using System.Threading.Tasks;
using Application.AnonymousUser.Model;
using Application.Comments.Model;
using Application.Exceptions;
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

        public class Query : IRequest<PostDetailsDto>
        {
            public string Slug { get; set; }
        }

        public class Handler : IRequestHandler<Query, PostDetailsDto>
        {
            private readonly DataContext _context;
            public Handler(DataContext context)
            {
                _context = context;
            }

            public async Task<PostDetailsDto> Handle(Query request, CancellationToken cancellationToken)
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

                return new PostDetailsDto
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
                    Comments = PopulateComments(post),
                    Reactions = PopulateReactions(post)
                };
            }

            private List<CommentDto> PopulateComments(Domain.Post post)
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

            private List<ReactionDto> PopulateReactions(Domain.Post post)
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
        }
    }
}