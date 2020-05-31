using System;
using System.Net;
using System.Threading;
using System.Threading.Tasks;
using Application.Exceptions;
using Application.Validators;
using FluentValidation;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Persistence;

namespace Application.Category
{
    public class Create
    {
        public class Command : IRequest
        {
            public string Code { get; set; }
            public string Image { get; set; }
            public string Name { get; set; }
            public string Color { get; set; }
        }

        public class CommandValidator : AbstractValidator<Command>
        {
            public CommandValidator()
            {
                RuleFor(x => x.Code).CategoryCodeRules();
                RuleFor(x => x.Name).NotEmpty();
                RuleFor(x => x.Color).NotEmpty();
            }
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
                var category = await _context.Categories.FirstOrDefaultAsync(x => x.Code == request.Code);

                if (category != null)
                {
                    throw new RestException(HttpStatusCode.BadRequest, new { Category = "Category code already exists." });
                }

                category = new Domain.Category
                {
                    Code = request.Code,
                    Name = request.Name,
                    Color = request.Color,
                    Image = request.Image,
                    CreationDate = DateTime.Now
                };

                _context.Categories.Add(category);

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