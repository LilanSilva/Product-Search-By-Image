using Cognitive.Computer.Vision.Service.Models;
using Microsoft.AspNetCore.Mvc;
using System.Threading.Tasks;

namespace Cognitive.Computer.Vision.Service.Controllers
{
    [Route("api/productsearch")]
    public class ProductSearchController : Controller
    {
        [Route("byimage")]
        public async Task<string> ByImage([FromForm] ImageDto img)
        {
            return "watch";
        }
    }
}
