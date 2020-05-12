using System;
using System.Collections.Generic;

namespace Domain
{
    public class AnonymousUser
    {
        public Guid Id { get; set; }
        public string Fingerprint { get; set; }
        public DateTime CreationDate { get; set; }
    }
}