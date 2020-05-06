using System;
using System.Collections.Generic;
using Application.User.Model;
using Domain;

namespace Application.Post.Model
{
    public class PostDto
    {
        public Guid Id { get; set; }
        public string Slug { get; set; }
        public string Image { get; set; }
        public string Title { get; set; }
        public string SubTitle { get; set; }
        public string Content { get; set; }
        public int TotalComments { get; set; }
        public DateTime PublishDate { get; set; }
        public Category Category { get; set; }
        public UserDto Author { get; set; }
        public ICollection<Comment> Comments { get; set; }
        public ICollection<Domain.Reaction> Reactions { get; set; }
    }

}