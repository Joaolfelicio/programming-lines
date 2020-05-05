using System;
using Application.Category.Model;
using Application.User.Model;
using Domain;

namespace Application.Post.Model
{
    public class PostDto
    {
        public string Slug { get; set; }
        public string Image { get; set; }
        public string Title { get; set; }
        public string SubTitle { get; set; }
        public string Content { get; set; }
        public int TotalComments { get; set; }
        public CategoryDto Category { get; set; }
        public UserDto Author { get; set; }
        public DateTime PublishDate { get; set; }
    }
}