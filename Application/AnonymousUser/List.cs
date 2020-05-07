using System.Collections.Generic;
using System.Threading;
using System.Threading.Tasks;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Persistence;

namespace Application.AnonymousUser
{
    public class List
    {

        public class Query : IRequest<List<Domain.AnonymousUser>> { }

        public class Handler : IRequestHandler<Query, List<Domain.AnonymousUser>>
        {
            private readonly DataContext _context;
            public Handler(DataContext context)
            {
                _context = context;
            }

            public async Task<List<Domain.AnonymousUser>> Handle(Query request, CancellationToken cancellationToken)
            {
                return await _context.AnonymousUsers.ToListAsync(cancellationToken);
            }
        }

    }
}