using Microsoft.Azure.CognitiveServices.Vision.ComputerVision;
using Microsoft.Azure.CognitiveServices.Vision.ComputerVision.Models;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Threading.Tasks;

namespace Cognitive.Computer.Vision.Service.VisionServices
{
    public class VisionService
    {
        const string subscriptionKey = "667fa231664141abbaf1bbab6d7ad50a";
        const string endpoint = @"https://cognitive-computer-vision-service.cognitiveservices.azure.com/";

        /// <summary>
        /// Creates a Computer Vision client used by each example
        /// </summary>
        /// <param name="endpoint"></param>
        /// <param name="key"></param>
        /// <returns></returns>
        public ComputerVisionClient Authenticate()
        {
            ComputerVisionClient client =
              new ComputerVisionClient(new ApiKeyServiceClientCredentials(subscriptionKey))
              { Endpoint = endpoint };
            return client;
        }

        /*
      * ANALYZE IMAGE - LOCAL IMAGE
        * 
      */
        /// <summary>
        /// Analyze local image. Extracts captions, categories, tags, objects, faces, racy/adult content,
        /// brands, celebrities, landmarks, color scheme, and image types.
        /// </summary>
        /// <param name="client"></param>
        /// <param name="localImage"></param>
        /// <returns></returns>
        public async Task<List<string>> AnalyzeImageLocal(ComputerVisionClient client, string localImage)
        {
            // Creating a list that defines the features to be extracted from the image. 
            List<VisualFeatureTypes?> features = new List<VisualFeatureTypes?>()
            {
              VisualFeatureTypes.Tags,
              VisualFeatureTypes.Objects
            };

            using (Stream analyzeImageStream = File.OpenRead(localImage))
            {
                // Analyze the local image.
                ImageAnalysis results = await client.AnalyzeImageInStreamAsync(analyzeImageStream, features);

                // Objects
                var serchList = results.Objects.Select(i => i.ObjectProperty).ToList();

                // Image tags and their confidence score
                if (!serchList.Any() && results.Tags.Count > 3)
                {
                    serchList.Add(results.Tags[0].Name);
                    serchList.Add(results.Tags[1].Name);
                }

                return serchList;
            }
        }
    }
}
