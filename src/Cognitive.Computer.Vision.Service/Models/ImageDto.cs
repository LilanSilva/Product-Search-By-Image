using Microsoft.AspNetCore.Http;

namespace Cognitive.Computer.Vision.Service.Models
{
    public class ImageDto
    {
        public string FileName { get; set; }

        public IFormFile Image { get; set; }
    }
}
