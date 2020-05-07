using System;
using System.Net;
using System.Threading;
using System.Threading.Tasks;
using Application.Exceptions;
using FluentValidation;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Persistence;

namespace Application.Newsletter
{
    public class Create
    {
        public class Command : IRequest
        {
            public string DisplayName { get; set; }
            public string Email { get; set; }
        }

        public class CommandValidator : AbstractValidator<Command>
        {
            public CommandValidator()
            {
                RuleFor(x => x.Email).NotEmpty().EmailAddress();
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
                var subscriberNewsletter = await _context.Newsletters.FirstOrDefaultAsync(x => x.Email == request.Email.ToLower(), cancellationToken);

                if(subscriberNewsletter != null )
                {
                    throw new RestException(HttpStatusCode.BadRequest, new {Newsletter = "You are already subscribed to the newsletter"});
                }

                subscriberNewsletter = new Domain.Newsletter
                {
                    DisplayName = request.DisplayName,
                    Email = request.Email.ToLower(),
                    SubscriptionDate = DateTime.Now
                };

                _context.Newsletters.Add(subscriberNewsletter);

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