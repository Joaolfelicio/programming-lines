using System;
using System.Collections.Generic;
using Application.Comments.Model;
using Application.Reaction.Model;
using Application.User.Model;

namespace Application.Post.Model
{
    public class PostDetailsDto
    {
        public Guid Id { get; set; }
        public string Slug { get; set; }
        public string Image { get; set; }
        public string Title { get; set; }
        public string SubTitle { get; set; }
        public string Content { get; set; }
        public DateTime PublishDate { get; set; }
        public Domain.Category Category { get; set; }
        public UserDto Author { get; set; }
        public ICollection<CommentDto> Comments { get; set; }
        public ICollection<ReactionDto> Reactions { get; set; }
    }
}