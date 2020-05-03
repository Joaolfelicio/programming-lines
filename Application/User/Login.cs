using System.Threading;
using MediatR;
using Persistence;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Identity;
using Domain;
using Application.Exceptions;
using System.Net;
using System;
using Application.Interface;
using FluentValidation;

namespace Application.User
{
    public class Login
    {

        public class Query : IRequest<User>
        {
            public string Email { get; set; }
            public string Password { get; set; }
        }

        public class QueryValidator : AbstractValidator<Query>
        {
            public QueryValidator()
            {
                RuleFor(x => x.Email).NotEmpty().EmailAddress();
                RuleFor(x => x.Password).NotEmpty();
            }
        }

        public class Handler : IRequestHandler<Query, User>
        {
            private readonly UserManager<AppUser> _userManager;
            private readonly SignInManager<AppUser> _signInManager;
            private readonly IJwtGenerator _jwtGenerator;
            public Handler(UserManager<AppUser> userManager, SignInManager<AppUser> signInManager, IJwtGenerator jwtGenerator)
            {
                _signInManager = signInManager;
                _userManager = userManager;
                _jwtGenerator = jwtGenerator;
            }

            public async Task<User> Handle(Query request, CancellationToken cancellationToken)
            {
                var user = await _userManager.FindByEmailAsync(request.Email);

                if (user == null)
                {
                    throw new RestException(HttpStatusCode.Unauthorized, new { User = "Email or password are wrong" });
                }

                var result = await _signInManager.CheckPasswordSignInAsync(user, request.Password, false);

                if (result.Succeeded)
                {
                    return new User
                    {
                        DisplayName = user.DisplayName,
                        Email = user.Email,
                        Image = user.Image,
                        Token = _jwtGenerator.GenerateToken(user),
                        UserName = user.UserName
                    };
                }

                throw new RestException(HttpStatusCode.Unauthorized, new { User = "Email or password are wrong" });
            }
        }

    }
}