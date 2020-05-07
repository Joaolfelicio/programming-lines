using System;
using System.Collections.Generic;
using Application.AnonymousUser.Model;
using Application.Reply.Model;

namespace Application.Comments.Model
{
    public class CommentDto
    {
        public Guid Id { get; set; }
        public AnonymousUserDto Author { get; set; }
        public string AuthorEmail { get; set; }
        public string AuthorDisplayName { get; set; }
        public string Content { get; set; }
        public DateTime PublishedDate { get; set; }
        public ICollection<ReplyDto> Replies { get; set; }
    }
}