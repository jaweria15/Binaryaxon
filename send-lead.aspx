<%@ Page Language="C#" AutoEventWireup="true" %>
<%@ Import Namespace="System.Net" %>
<%@ Import Namespace="System.Net.Mail" %>

<script runat="server">
    protected void Page_Load(object sender, EventArgs e)
    {
        if (Request.HttpMethod == "POST")
        {
            try
            {
                string name = Request.Form["name"];
                string email = Request.Form["email"];
                string phone = Request.Form["phone"];
                string company = Request.Form["company"];
                string employees = Request.Form["employees"];
                string businessType = Request.Form["businessType"];
                string description = Request.Form["description"];

                System.Net.ServicePointManager.SecurityProtocol = SecurityProtocolType.Tls12;

                // 1. Send Email to Leads@binaryaxon.com (Full details)
                MailMessage leadsMail = new MailMessage();
                leadsMail.From = new MailAddress("info@binaryaxon.com", "Binary Axon Contact");
                leadsMail.To.Add("leads@binaryaxon.com");
                leadsMail.Subject = "New Lead: " + company;
                leadsMail.Body = $@"
                    <div style='font-family: sans-serif; padding: 20px; color: #333;'>
                        <h2 style='color: #635091;'>New Contact Request</h2>
                        <table style='width: 100%; border-collapse: collapse;'>
                            <tr><td style='padding: 8px; border-bottom: 1px solid #eee;'><strong>Name:</strong></td><td style='padding: 8px; border-bottom: 1px solid #eee;'>{name}</td></tr>
                            <tr><td style='padding: 8px; border-bottom: 1px solid #eee;'><strong>Email:</strong></td><td style='padding: 8px; border-bottom: 1px solid #eee;'>{email}</td></tr>
                            <tr><td style='padding: 8px; border-bottom: 1px solid #eee;'><strong>Phone:</strong></td><td style='padding: 8px; border-bottom: 1px solid #eee;'>{phone}</td></tr>
                            <tr><td style='padding: 8px; border-bottom: 1px solid #eee;'><strong>Company:</strong></td><td style='padding: 8px; border-bottom: 1px solid #eee;'>{company}</td></tr>
                            <tr><td style='padding: 8px; border-bottom: 1px solid #eee;'><strong>Employees:</strong></td><td style='padding: 8px; border-bottom: 1px solid #eee;'>{employees}</td></tr>
                            <tr><td style='padding: 8px; border-bottom: 1px solid #eee;'><strong>Business Type:</strong></td><td style='padding: 8px; border-bottom: 1px solid #eee;'>{businessType}</td></tr>
                        </table>
                        <p><strong>Description:</strong></p>
                        <div style='padding: 15px; background: #f9f9f9; border-radius: 8px;'>{description.Replace("\n", "<br/>")}</div>
                    </div>";
                leadsMail.IsBodyHtml = true;

                SmtpClient smtp = new SmtpClient("m06.internetmailserver.net");
                smtp.Credentials = new NetworkCredential("info@binaryaxon.com", "Info@123@!");
                smtp.EnableSsl = true;
                smtp.Port = 25;
                smtp.Send(leadsMail);

                // 2. Send Confirmation Email to Client from Info@binaryaxon.com
                MailMessage clientMail = new MailMessage();
                clientMail.From = new MailAddress("info@binaryaxon.com", "Binary Axon");
                clientMail.To.Add(email);
                clientMail.Subject = "We received your inquiry - Binary Axon";
                clientMail.Body = $@"
                    <div style='font-family: sans-serif; padding: 20px; color: #333;'>
                        <p>Dear {name},</p>
                        <p>Thank you for reaching out to <strong>Binary Axon</strong>. We have received your information and our team is currently reviewing your request.</p>
                        <p>One of our specialists will contact you within <strong>3 to 5 working days</strong> to discuss your requirements in detail.</p>
                        <br/>
                        <p>Best Regards,</p>
                        <p><strong>Team Binary Axon</strong><br/>www.binaryaxon.com</p>
                    </div>";
                clientMail.IsBodyHtml = true;
                smtp.Send(clientMail);

                // Redirect back to home with success parameter
                Response.Redirect("index.html?success=true#contact");
            }
            catch (Exception ex)
            {
                // In case of error, redirect back with error info
                Response.Redirect("index.html?error=true#contact");
            }
        }
        else
        {
            // If someone tries to access this page directly without POST, redirect back
            Response.Redirect("index.html");
        }
    }
</script>
