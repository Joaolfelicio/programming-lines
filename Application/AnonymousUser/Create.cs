using System;
using System.Net;
using System.Threading;
using System.Threading.Tasks;
using Application.Exceptions;
using FluentValidation;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Persistence;

namespace Application.AnonymousUser
{
    public class Create
    {
        public class Command : IRequest<Domain.AnonymousUser>
        {
            public string FingerPrint { get; set; }
        }

        public class CommandValidator : AbstractValidator<Command>
        {
            public CommandValidator()
            {
                RuleFor(x => x.FingerPrint).NotEmpty();
            }
        }

        public class Handler : IRequestHandler<Command, Domain.AnonymousUser>
        {
            private readonly DataContext _context;
            public Handler(DataContext context)
            {
                _context = context;
            }
//TODO: Fix the return type here
            public async Task<Domain.AnonymousUser> Handle(Command request, CancellationToken cancellationToken)
            {
                var anonUser = await _context.AnonymousUsers.FirstOrDefaultAsync(x => x.FingerPrint == request.FingerPrint, cancellationToken);

                if(anonUser != null)
                {
                    return anonUser;
                }

                anonUser = new Domain.AnonymousUser
                {
                    FingerPrint = request.FingerPrint,
                    CreationDate = DateTime.Now
                };

                _context.AnonymousUsers.Add(anonUser);

                var success = await _context.SaveChangesAsync() > 0;

                if (success)
                {
                    return anonUser;
                }

                throw new Exception("Problem saving the changes");
            }
        }
    }
}