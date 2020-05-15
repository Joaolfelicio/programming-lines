using System;

namespace Application.Post.Model
{
    public class RecommendedPostDto
    {
        public Guid Id { get; set; }
        public string Slug { get; set; }
        public string Image { get; set; }
        public string Title { get; set; }
        public string Content { get; set; }
        public DateTime PublishDate { get; set; }
        public Domain.Category Category { get; set; }
    }
}