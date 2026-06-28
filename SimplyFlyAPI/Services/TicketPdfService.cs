using QRCoder;
using QuestPDF.Fluent;
using QuestPDF.Helpers;
using QuestPDF.Infrastructure;
using Document = QuestPDF.Fluent.Document;

namespace SimplyFlyAPI.Services
{
    public class TicketPdfService
    {
        public byte[] GenerateBoardingPass(
            string passengerName,
            string flightName,
            string flightNumber,
            string fromCity,
            string toCity,
            DateTime departureTime,
            DateTime arrivalTime,
            string seatNumber,
            string gateNumber,
            decimal amount,
            int bookingId)
        {
            QuestPDF.Settings.License =
                LicenseType.Community;

            string pnr =
                $"SF{bookingId.ToString().PadLeft(6, '0')}";

            string logoPath =
                Path.Combine(
                    Directory.GetCurrentDirectory(),
                    "wwwroot",
                    "images",
                    "simplyflylogo.png");

            var qrGenerator =
                new QRCodeGenerator();

            var qrData =
                qrGenerator.CreateQrCode(
                    $"BookingId={bookingId}\nPNR={pnr}",
                    QRCodeGenerator.ECCLevel.Q);

            var qrCode =
                new PngByteQRCode(qrData);

            byte[] qrBytes =
                qrCode.GetGraphic(20);

            return Document.Create(container =>
            {
                container.Page(page =>
                {
                    page.Margin(30);

                    page.Header()
                        .Column(header =>
                        {
                            header.Item()
                                .AlignCenter()
                                .Width(120)
                                .Image(logoPath);

                            header.Item()
                                .AlignCenter()
                                .Text("SimplyFly Ticket Details")
                                .FontSize(24)
                                .Bold()
                                .FontColor(
                                    Colors.Blue.Darken2);

                            header.Item()
                                .AlignCenter()
                                .Text($"PNR : {pnr}")
                                .Bold()
                                .FontSize(14);
                        });

                    page.Content()
                        .Column(column =>
                        {
                            column.Spacing(10);

                            column.Item()
                                .Text("Passenger Details")
                                .Bold()
                                .FontSize(18);

                            column.Item().Text(
                                $"Passenger Name : {passengerName}");

                            column.Item().Text(
                                $"Booking ID : {bookingId}");

                            column.Item().Text(
                                $"Flight : {flightName}");

                            column.Item().Text(
                                $"Flight No : {flightNumber}");

                            column.Item().Text(
                                $"From : {fromCity}");

                            column.Item().Text(
                                $"To : {toCity}");

                            column.Item().Text(
                                $"Departure : {departureTime:dd-MM-yyyy hh:mm tt}");

                            column.Item().Text(
                                $"Arrival : {arrivalTime:dd-MM-yyyy hh:mm tt}");

                            column.Item().Text(
                                $"Seat : {seatNumber}");

                            column.Item().Text(
                                $"Gate : {gateNumber}");

                            column.Item().Text(
                                $"Amount Paid : ₹{amount}");

                            column.Item()
                                .Text("Status : Confirmed")
                                .Bold()
                                .FontColor(
                                    Colors.Green.Darken2);

                            column.Item()
                                .PaddingTop(20);

                            column.Item()
                                .AlignCenter()
                                .Image(qrBytes);

                            column.Item()
                                .AlignCenter()
                                .Text("SCAN AT AIRPORT")
                                .Bold();
                        });

                    page.Footer()
                        .AlignCenter()
                        .Text(
                            "Thank you for choosing SimplyFly");
                });
            })
            .GeneratePdf();
        }
    }
}