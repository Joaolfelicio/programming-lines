using System;

namespace Domain
{
    public class Reaction
    {
        public Guid Id { get; set; }
        public virtual AnonymousUser AnonymousUser { get; set; }
        public virtual Post Post { get; set; }
        public bool IsPositive { get; set; }
        public DateTime ReactionDate { get; set; }
    }
}