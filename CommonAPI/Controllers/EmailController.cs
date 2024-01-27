using Microsoft.AspNetCore.Mvc;
using System.Net.Mail;
using System.Net;
using CommonAPI.DTO;

namespace CommonAPI.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class EmailController : Controller
    {
        private readonly IWebHostEnvironment _environment;
        private readonly IHttpContextAccessor _httpContextAccessor;
        public EmailController(IWebHostEnvironment environment, IHttpContextAccessor httpContextAccessor)
        {
            _environment = environment;
            _httpContextAccessor = httpContextAccessor;
        }
        [HttpPost("EnquiryEmail")]
        public async Task<IActionResult> EnquiryEmail([FromBody] EnquiryEmailDTO enquiryEmailDTO)
        {
            string StatusMessage = "";
            try
            {
                var fromAddress = new MailAddress("consultancyvnc@gmail.com", "VNC Enquiry");
                var toAddress = new MailAddress("consultancyvnc@gmail.com", "VNC");
                const string fromPassword = "obsy ktjh zmrb rmjo";
                const string subject = "Enquiry on Website";
                string body = $"<b>{enquiryEmailDTO.Name}</b> enquired :<br/><br/> {enquiryEmailDTO.Description};<br/><br/> <b>Email:</b> {enquiryEmailDTO.Email};<br/> <b>Mobile:</b> {enquiryEmailDTO.Mobile}";

                var smtp = new SmtpClient
                {
                    Host = "smtp.gmail.com",
                    Port = 587,
                    EnableSsl = true,
                    DeliveryMethod = SmtpDeliveryMethod.Network,
                    UseDefaultCredentials = false,
                    Credentials = new NetworkCredential(fromAddress.Address, fromPassword)
                    
                };
                using (var message = new MailMessage(fromAddress, toAddress)
                {
                    IsBodyHtml = true,
                    Subject = subject,
                    Body = body
                })
                {
                    smtp.Send(message);
                }
                StatusMessage = "Mail sent Successfully!!";
            }
            catch (Exception ex) {
                StatusMessage = "Mail sent Failed..";
            }
            return Ok(new { StatusMessage });
        }
    }
}
