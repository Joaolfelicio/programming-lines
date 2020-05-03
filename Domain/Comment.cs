using System;
using System.Collections.Generic;

namespace Domain
{
    public class Comment
    {
        public Guid Id { get; set; }
        public virtual AnonymousUser Author { get; set; }
        public string AuthorEmail { get; set; }
        public string AuthorDisplayName { get; set; }
        public DateTime PublishedDate { get; set; }
        public string Content { get; set; }
        public virtual ICollection<Reply> Replies { get; set; }
    }
}