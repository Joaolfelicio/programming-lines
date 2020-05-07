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
    public class Details
    {

        public class Query : IRequest<Domain.Category>
        {
            public string CategoryCode { get; set; }
        }

        public class QueryValidator : AbstractValidator<Query>
        {
            public QueryValidator()
            {
                RuleFor(x => x.CategoryCode).CategoryCodeRules();
            }
        }

        public class Handler : IRequestHandler<Query, Domain.Category>
        {
            private readonly DataContext _context;
            public Handler(DataContext context)
            {
                _context = context;
            }

            public async Task<Domain.Category> Handle(Query request, CancellationToken cancellationToken)
            {
                var category = await _context.Categories.FirstOrDefaultAsync(x => x.Code == request.CategoryCode);

                if(category == null)
                {
                    throw new RestException(HttpStatusCode.NotFound, new {Category = "Not found."} );
                }

                return category;
            }
        }

    }
}