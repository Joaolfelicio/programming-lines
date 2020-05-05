using System;
using System.Collections.Generic;

namespace Domain
{
    public class Category
    {
        public Guid Id { get; set; }
        public string Code { get; set; }
        public string Image { get; set; }
        public string Name { get; set; }
        public string Color { get; set; }
        public DateTime CreationDate { get; set; }
    }
}