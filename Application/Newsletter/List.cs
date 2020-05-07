using System.Collections.Generic;
using System.Threading;
using System.Threading.Tasks;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Persistence;

namespace Application.Newsletter
{
    public class List
    {

        public class Query : IRequest<List<Domain.Newsletter>> { }

        public class Handler : IRequestHandler<Query, List<Domain.Newsletter>>
        {
            private readonly DataContext _context;
            public Handler(DataContext context)
            {
                _context = context;
            }

            public async Task<List<Domain.Newsletter>> Handle(Query request, CancellationToken cancellationToken)
            {
                return await _context.Newsletters.ToListAsync(cancellationToken);
            }
        }

    }
}