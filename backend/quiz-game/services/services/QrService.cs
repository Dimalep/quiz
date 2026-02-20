using QRCoder;
using services.interfaces;

namespace services.services
{
    public class QrService : IQrService
    {
        public string GenerateQrBase64(string url)
        {
            using var qrGenerator = new QRCodeGenerator();
            using var qrData = qrGenerator.CreateQrCode(url, QRCodeGenerator.ECCLevel.Q);
            using var qrCode = new PngByteQRCode(qrData);

            byte[] bytes = qrCode.GetGraphic(20);
            return Convert.ToBase64String(bytes);
        }
    }
}
