using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;

namespace Application.Interface
{
    public interface IImageAccessor
    {
        Task<string> UploadImage(IFormFile file, int width, int height);
    }
}