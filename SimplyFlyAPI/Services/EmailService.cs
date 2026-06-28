using MailKit.Net.Smtp;
using MimeKit;
using SimplyFlyAPI.Models;

namespace SimplyFlyAPI.Services
{
    public class EmailService : IEmailService
    {
        private readonly IConfiguration _configuration;
        private readonly TicketPdfService _ticketPdfService;




    public EmailService(
        IConfiguration configuration,
        TicketPdfService ticketPdfService)
        {
            _configuration = configuration;
            _ticketPdfService = ticketPdfService;
        }
        public async Task SendOtpEmail(
    string email,
    string otp)
        {
            var message = new MimeMessage();

            message.From.Add(
                new MailboxAddress(
                    "SimplyFly",
                    _configuration["MailSettings:Mail"]));

            message.To.Add(
                MailboxAddress.Parse(email));

            message.Subject =
                "SimplyFly Password Reset OTP";

            message.Body =
                new TextPart("html")
                {
                    Text = $@"
<h2>SimplyFly Password Reset</h2>

<p>Your OTP is:</p>

<h1>{otp}</h1>

<p>
Valid for 10 minutes.
</p>"
                };

            using var smtp =
                new SmtpClient();

            await smtp.ConnectAsync(
                _configuration["MailSettings:Host"],
                int.Parse(
                    _configuration["MailSettings:Port"]),
                MailKit.Security
                    .SecureSocketOptions
                    .StartTls);

            await smtp.AuthenticateAsync(
                _configuration["MailSettings:Mail"],
                _configuration["MailSettings:Password"]);

            await smtp.SendAsync(message);

            await smtp.DisconnectAsync(true);
        }
        public async Task SendVerificationEmail(
    string email,
    string otp)
        {
            try
            {
                Console.WriteLine($"Sending OTP to {email}");

                var message = new MimeMessage();

                message.From.Add(
                    new MailboxAddress(
                        "SimplyFly",
                        _configuration["MailSettings:Mail"]));

                message.To.Add(
                    MailboxAddress.Parse(email));

                message.Subject =
                    "SimplyFly Email Verification";

                message.Body =
                    new TextPart("html")
                    {
                        Text = $@"
<h2>Email Verification</h2>
<p>Your OTP is:</p>
<h1>{otp}</h1>
<p>Valid for 10 minutes.</p>"
                    };

                using var smtp = new SmtpClient();

                Console.WriteLine("Connecting SMTP...");

                await smtp.ConnectAsync(
                    _configuration["MailSettings:Host"],
                    int.Parse(
                        _configuration["MailSettings:Port"]),
                    MailKit.Security
                        .SecureSocketOptions.StartTls);

                Console.WriteLine("SMTP Connected");

                await smtp.AuthenticateAsync(
                    _configuration["MailSettings:Mail"],
                    _configuration["MailSettings:Password"]);

                Console.WriteLine("SMTP Authenticated");

                await smtp.SendAsync(message);

                Console.WriteLine("VERIFICATION EMAIL SENT");

                await smtp.DisconnectAsync(true);
            }
            catch (Exception ex)
            {
                Console.WriteLine("EMAIL ERROR");
                Console.WriteLine(ex.Message);
                Console.WriteLine(ex.StackTrace);
            }
        }

        public async Task SendCancellationEmail(
    string email,
    string userName,
    int bookingId,
    string flightName,
    string fromCity,
    string toCity,
    decimal refundAmount)
        {
            var message = new MimeMessage();

            message.From.Add(
                new MailboxAddress(
                    "SimplyFly",
                    _configuration["MailSettings:Mail"]));

            message.To.Add(
                MailboxAddress.Parse(email));

            message.Subject =
                "❌ SimplyFly Booking Cancelled";

            message.Body =
                new TextPart("html")
                {
                    Text = $@"
<h2>Booking Cancelled</h2>

<p>Hello {userName},</p>

<p>Your booking has been cancelled successfully.</p>

<p><b>Booking ID:</b> {bookingId}</p>

<p><b>Flight:</b> {flightName}</p>

<p><b>Route:</b> {fromCity} ➜ {toCity}</p>

<p><b>Refund Status:</b> Pending Flight Owner Approval</p>

<p>
Your refund request has been submitted successfully.
The Flight Owner will review your request and approve the refund amount.
</p>

<p>
Once approved, you will receive another confirmation email with the final refund amount.
</p>

<p>Thank you for choosing SimplyFly.</p>"
                };

            using var smtp = new SmtpClient();

            await smtp.ConnectAsync(
    _configuration["MailSettings:Host"],
    int.Parse(_configuration["MailSettings:Port"]),
    MailKit.Security.SecureSocketOptions.Auto);
            

            await smtp.AuthenticateAsync(
                _configuration["MailSettings:Mail"],
                _configuration["MailSettings:Password"]);

            await smtp.SendAsync(message);

            await smtp.DisconnectAsync(true);
        }

        public async Task SendTicketEmail(
            string toEmail,
            string userName,
            int bookingId,
            string flightName,
            string flightNumber,
            string fromCity,
            string toCity,
            DateTime departureTime,
            DateTime arrivalTime,
            string seatNumber,
            string gateNumber,
            decimal amount)
        {
            try
            {
                Console.WriteLine("Email method started");

                var boardingPassBytes =
                    _ticketPdfService.GenerateBoardingPass(userName,
                                                           flightName,
                                                           flightNumber,
                                                           fromCity,
                                                           toCity,
                                                           departureTime,
                                                           arrivalTime,
                                                           seatNumber,
                                                           gateNumber,
                                                           amount,
                                                           bookingId);

                Console.WriteLine("PDF Generated Successfully");

                var email = new MimeMessage();

                email.From.Add(
                    new MailboxAddress(
                        "SimplyFly",
                        _configuration["MailSettings:Mail"]));

                email.To.Add(
                    MailboxAddress.Parse(toEmail));

                email.Subject =
                    "✈ SimplyFly Booking Confirmation";

                var bodyBuilder = new BodyBuilder();

                bodyBuilder.HtmlBody = $@"
            <h2>Booking Confirmed</h2>

            <p>Hello {userName},</p>

            <p>Your booking has been confirmed successfully.</p>

            <p><b>Flight:</b> {flightName}</p>

            <p><b>Route:</b> {fromCity} ➜ {toCity}</p>

            <p><b>Seat:</b> {seatNumber}</p>

            <p><b>Gate:</b> {gateNumber}</p>

            <p>Your Boarding Pass PDF is attached.</p>

            <p>Thank you for choosing SimplyFly.</p>";

                bodyBuilder.Attachments.Add(
                    $"SimplyFly_BoardingPass_{bookingId}.pdf",
                    boardingPassBytes,
                    ContentType.Parse("application/pdf"));

                email.Body = bodyBuilder.ToMessageBody();

                using var smtp = new SmtpClient();

                Console.WriteLine("Connecting SMTP...");

                await smtp.ConnectAsync(
                    _configuration["MailSettings:Host"],
                    int.Parse(_configuration["MailSettings:Port"]),
                    MailKit.Security.SecureSocketOptions.StartTls);

                Console.WriteLine("SMTP Connected");

                await smtp.AuthenticateAsync(
                    _configuration["MailSettings:Mail"],
                    _configuration["MailSettings:Password"]);

                Console.WriteLine("SMTP Authenticated");

                await smtp.SendAsync(email);

                Console.WriteLine("EMAIL SENT SUCCESSFULLY");

                await smtp.DisconnectAsync(true);
            }
            catch (Exception ex)
            {
                Console.WriteLine("EMAIL ERROR");
                Console.WriteLine(ex.ToString());
            }
        }
        public async Task SendRefundApprovedEmail(
    string email,
    string userName,
    int bookingId,
    decimal refundAmount)
        {
            var message = new MimeMessage();

            message.From.Add(
                new MailboxAddress(
                    "SimplyFly",
                    _configuration["MailSettings:Mail"]));

            message.To.Add(
                MailboxAddress.Parse(email));

            message.Subject = "💰 SimplyFly Refund Approved";

            message.Body = new TextPart("html")
            {
                Text = $@"
<h2>Refund Approved</h2>

<p>Hello <b>{userName}</b>,</p>

<p>Your refund request has been approved.</p>

<p><b>Booking ID:</b> {bookingId}</p>

<p><b>Refund Amount:</b> ₹{refundAmount}</p>

<p>
The refund will be credited to your original payment method
within <b>3–5 business days</b>.
</p>

<p>Thank you for choosing SimplyFly.</p>"
            };

            using var smtp = new SmtpClient();

            await smtp.ConnectAsync(
                _configuration["MailSettings:Host"],
                int.Parse(_configuration["MailSettings:Port"]),
                MailKit.Security.SecureSocketOptions.StartTls);

            await smtp.AuthenticateAsync(
                _configuration["MailSettings:Mail"],
                _configuration["MailSettings:Password"]);

            await smtp.SendAsync(message);

            await smtp.DisconnectAsync(true);
        }
    }

}
