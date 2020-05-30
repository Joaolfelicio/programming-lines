using System;
using System.Threading.Tasks;
using Application.Interface;
using CloudinaryDotNet;
using CloudinaryDotNet.Actions;
using Infrastructure.Images.Model;
using Microsoft.AspNetCore.Http;
using Microsoft.Extensions.Options;

namespace Infrastructure.Images
{
    public class ImageAccessor : IImageAccessor
    {
        private readonly Cloudinary _cloudinary;
        public ImageAccessor(IOptions<CloudinarySettings> config)
        {
            var account = new Account(config.Value.CloudName, config.Value.ApiKey, config.Value.ApiSecret);

            _cloudinary = new Cloudinary(account);
        }

        public async Task<string> UploadImage(IFormFile file, int width, int height)
        {
            var uploadResult = new ImageUploadResult();

            if (file.Length > 0)
            {
                using (var stream = file.OpenReadStream())
                {
                    var uploadParams = new ImageUploadParams
                    {
                        File = new FileDescription(file.FileName, stream),
                        Transformation = new Transformation().Height(height)
                                                             .Width(width)
                                                             .Crop("fill"),
                        Folder = "programming-lines"
                    };
                    uploadResult = await _cloudinary.UploadAsync(uploadParams);
                }
            }

            if (uploadResult.Error != null)
            {
                throw new Exception(uploadResult.Error.Message);
            }

            return uploadResult.SecureUri.AbsoluteUri;
        }
    }
}