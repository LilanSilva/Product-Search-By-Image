using Cognitive.Computer.Vision.Service.Models;
using Cognitive.Computer.Vision.Service.VisionServices;
using Microsoft.AspNetCore.Mvc;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace Cognitive.Computer.Vision.Service.Controllers
{
    [Route("api/productsearch")]
    public class ProductSearchController : Controller
    {
        [Route("byimage")]
        public async Task<string> ByImage([FromForm] ImageDto img)
        {
            var objectNames = new List<string>();
            var visionService = new VisionService();
            var client = visionService.Authenticate();

            using (var imageStream = img.Image.OpenReadStream())
            {
                objectNames = await visionService.AnalyzeImageLocal(client, imageStream);
            }

            return string.Join(",", objectNames);
        }
    }
}
