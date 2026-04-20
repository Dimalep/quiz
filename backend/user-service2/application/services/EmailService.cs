using application.DTOs.auth;
using application.interfaces;
using domain.models;
using infrastructure;
using Microsoft.EntityFrameworkCore;
using System.Net;
using System.Net.Mail;

namespace application.services
{
    public class EmailService : IEmailService
    {
        private readonly DatabaseContext _db;

        public EmailService(DatabaseContext db)
        {
            _db = db;
        }

        public async Task SaveEmailCode(EmailCode emailCode)
        {
            if (emailCode == null)
                throw new Exception("Error save emailCode. The emailCode cannot by null");

            await _db.EmailCodes.AddAsync(emailCode);
            await _db.SaveChangesAsync();
        }

        public async Task<AuthByEmailResponse> Confirmation(AuthByEmailResquest req)
        {
            var emailCode = await _db.EmailCodes.OrderByDescending(ec => ec.Id).FirstOrDefaultAsync(ec => ec.Email == req.Email);

            if(emailCode == null)
            {
                throw new Exception("Error confirm email. Not found emailCode entity");
            }

            Console.WriteLine($"from db - {emailCode.Code} | user - {req.Code}");

            if(emailCode.Code != req.Code)
            {
                throw new Exception("Error confirm email. Confirm code is invalid");
            }

            emailCode.IsUsed = true;
            await _db.SaveChangesAsync();

            return new AuthByEmailResponse 
            {
                Email = req.Email,
                AnonUserId = req.AnonUserId
            };
        }

        public async Task SendAsync(string to)
        {
            // generate confirm code
            var code = new Random().Next(100000, 999999).ToString();

            // create smpt client
            var smtp = new SmtpClient("smtp.gmail.com", 587)
            {
                Credentials = new NetworkCredential(
                    "dlepeskin7@gmail.com",
                    "urqs pbfw zwft jwrn"
                ),
                EnableSsl = true,
            };

            // froming message 
            var message = new MailMessage
            {
                From = new MailAddress("dlepeskin7@gmail.com"),
                Subject = "Код подтверждения",
                Body = $"Ваш код подтверждения: {code}",
                IsBodyHtml = false
            };

            message.To.Add(to);

            // recording in db *(need to memory like redis)
            await SaveEmailCode(new EmailCode
            {
                Email = to,
                Code = code,
            });

            // send message to email
            await smtp.SendMailAsync(message);
        }
    }
}
