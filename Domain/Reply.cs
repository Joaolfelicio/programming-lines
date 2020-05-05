using System;

namespace Domain
{
    public class Reply
    {
        public Guid Id { get; set; }
        public virtual AnonymousUser Author { get; set; }
        public string AuthorEmail { get; set; }
        public string AuthorDisplayName { get; set; }
        public string Content { get; set; }
        public DateTime CreationDate { get; set; }
        
    }
}