using System;

namespace Domain
{
    public class Newsletter
    {
        public Guid Id { get; set; }
        public string Email { get; set; }
        public string DisplayName { get; set; }
        public bool IsSubscribed { get; set; }
        public DateTime SubscriptionDate { get; set; }
    }
}