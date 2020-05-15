using System;

namespace Application.Post.Model
{
    public class SearchablePostDto
    {
        public string Slug {get;set; }
        public string Title { get; set; }
        public string Description { get; set; }
        public string Image { get; set; }
        public DateTime PublishDate { get; set; }
    }
}