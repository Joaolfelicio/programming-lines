using System.Net;
using System.Threading;
using System.Threading.Tasks;
using Application.Exceptions;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Persistence;

namespace Application.AnonymousUser
{
    public class Details
    {

        public class Query : IRequest<Domain.AnonymousUser>
        {
            public string FingerPrint { get; set; }
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
                var anonUser = await _context.AnonymousUsers.FirstOrDefaultAsync(x => x.FingerPrint == request.FingerPrint);

                if(anonUser == null)
                {
                    throw new RestException(HttpStatusCode.NotFound, new {AnonymousUser = "Not found."});
                }

                return anonUser;
            }
        }

    }
}