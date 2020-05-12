using System;
using System.Threading;
using System.Threading.Tasks;
using FluentValidation;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Persistence;

namespace Application.AnonymousUser
{
    public class Get
    {

        public class Query : IRequest<Domain.AnonymousUser>
        {
            public Guid AnonUserId { get; set; }
        }


        public class QueryValidator : AbstractValidator<Query>
        {
            public QueryValidator()
            {
                RuleFor(x => x.AnonUserId).NotEmpty();
            }
        }

        public class Handler : IRequestHandler<Query, Domain.AnonymousUser>
        {
            private readonly DataContext _context;
            public Handler(DataContext context)
            {
                _context = context;
            }

            public async Task<Domain.AnonymousUser> Handle(Query request, CancellationToken cancellationToken)
            {
                var anonUser = await _context.AnonymousUsers.FirstOrDefaultAsync(x => x.Id == request.AnonUserId, cancellationToken);

                if (anonUser == null)
                {
                    return null;
                }

                return anonUser;
            }
        }

    }
}