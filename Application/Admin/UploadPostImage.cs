using System.Threading;
using System.Threading.Tasks;
using Application.Interface;
using MediatR;
using Microsoft.AspNetCore.Http;

namespace Application.Admin
{
    public class UploadPostImage
    {
        public class Command : IRequest<string>
        {
            public IFormFile File { get; set; }
        }

        public class Handler : IRequestHandler<Command, string>
        {
            private readonly IImageAccessor _imageAccessor;
            public Handler(IImageAccessor imageAccessor)
            {
                _imageAccessor = imageAccessor;
            }

            public async Task<string> Handle(Command request, CancellationToken cancellationToken)
            {
                return await _imageAccessor.UploadImage(request.File, 670, 305);
            }
        }
    }
}