using System;
using Application.AnonymousUser.Model;

namespace Application.Reply.Model
{
    public class ReplyDto
    {
        public Guid Id { get; set; }
        public AnonymousUserDto Author { get; set; }
        public string AuthorEmail { get; set; }
        public string AuthorDisplayName { get; set; }
        public string Content { get; set; }
        public DateTime CreationDate { get; set; }
    }
}