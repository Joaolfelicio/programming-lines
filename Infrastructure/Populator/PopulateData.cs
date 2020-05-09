using System.Collections.Generic;
using Application.AnonymousUser.Model;
using Application.Comments.Model;
using Application.Interface;
using Application.Reaction.Model;
using Application.Reply.Model;

namespace Infrastructure.Generator
{
    public class PopulateData : IPopulateData
    {
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
    }
}