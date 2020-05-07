using System.Collections.Generic;
using System.Threading;
using System.Threading.Tasks;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Persistence;

namespace Application.Category
{
    public class List
    {

        public class Query : IRequest<List<Domain.Category>> { }

        public class Handler : IRequestHandler<Query, List<Domain.Category>>
        {
            private readonly DataContext _context;
            public Handler(DataContext context)
            {
                _context = context;
            }

            public async Task<List<Domain.Category>> Handle(Query request, CancellationToken cancellationToken)
            {
                return await _context.Categories.ToListAsync(cancellationToken);
            }
        }

    }

}
