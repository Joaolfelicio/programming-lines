using System;
using System.Net;
using System.Threading;
using System.Threading.Tasks;
using Application.Exceptions;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Persistence;

namespace Application.Category
{
    public class Update
    {
        public class Command : IRequest
        {
            public Guid Id { get; set; }
            public string Code { get; set; }
            public string Image { get; set; }
            public string Name { get; set; }
            public string Color { get; set; }
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
                var category = await _context.Categories.FirstOrDefaultAsync(x => x.Id == request.Id, cancellationToken);

                if (category == null)
                {
                    throw new RestException(HttpStatusCode.NotFound, new { Category = "Not found." });
                }

                category.Code = request.Code ?? category.Code;
                category.Name = request.Name ?? category.Name;
                category.Image = request.Image ?? category.Image;
                category.Color = request.Color ?? category.Color;

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