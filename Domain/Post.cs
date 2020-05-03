using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;

namespace Domain
{
    public class Post
    {
        public Guid Id { get; set; }
        public string Slug { get; set; }
        public virtual AppUser Author { get; set; }
        public virtual Category Category { get; set; }
        public string Image { get; set; }
        public string Title { get; set; }
        public string SubTitle { get; set; }
        public string Content { get; set; }
        public virtual ICollection<Comment> Comments { get; set; }
        public virtual ICollection<Reaction> Reactions { get; set; }
        public DateTime PublishDate { get; set; }
    }
}