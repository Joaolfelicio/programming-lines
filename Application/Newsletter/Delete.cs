using System;
using System.Net;
using System.Threading;
using System.Threading.Tasks;
using Application.Exceptions;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Persistence;

namespace Application.Newsletter
{
    public class Delete
    {
        public class Command : IRequest
        {
            public Guid Id { get; set; }
        }

        public class Handler : IRequestHandler<Command>
        {
            private readonly DataContext _context;
            public Handler(DataContext context)
            {
                _context = context;
            }

            public async Task<Unit> Handle(Command request, CancellationToken cancellationToken)
            {
                var newsletter = await _context.Newsletters.FirstOrDefaultAsync(x => x.Id == request.Id, cancellationToken);

                if (newsletter == null)
                {
                    throw new RestException(HttpStatusCode.NotFound, new { Newsletter = "You are not subscribed to the newsletter" });
                }

                _context.Newsletters.Remove(newsletter);

                var success = await _context.SaveChangesAsync() > 0;

                if (success)
                {
                    return Unit.Value;
                }

                throw new Exception("Problem saving the changes");
            }
        }
    }
}