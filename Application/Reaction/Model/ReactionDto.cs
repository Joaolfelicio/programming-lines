using System;
using Application.AnonymousUser.Model;

namespace Application.Reaction.Model
{
    public class ReactionDto
    {
        public Guid Id { get; set; }
        public virtual AnonymousUserDto Author { get; set; }
        public bool IsPositive { get; set; }
        public DateTime ReactionDate { get; set; }
    }
}