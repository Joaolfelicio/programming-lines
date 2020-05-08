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
        public int CommentsCount { get; set; }
        public int PositiveReactionsCount { get; set; }
        public DateTime PublishDate { get; set; }
        public Domain.Category Category { get; set; }
        public UserDto Author { get; set; }
    }

}