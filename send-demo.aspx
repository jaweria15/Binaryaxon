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
                string productName = Request.Form["productName"];
                string name = Request.Form["name"];
                string email = Request.Form["email"];
                string description = Request.Form["description"];

                System.Net.ServicePointManager.SecurityProtocol = SecurityProtocolType.Tls12;

                // 1. Send Demo Request to info@binaryaxon.com
                MailMessage demoMail = new MailMessage();
                demoMail.From = new MailAddress("info@binaryaxon.com", "Binary Axon Demo Request");
                demoMail.To.Add("info@binaryaxon.com");
                demoMail.Subject = "Demo Request: " + productName;
                demoMail.Body = $@"
                    <div style='font-family: sans-serif; padding: 20px; color: #333;'>
                        <h2 style='color: #635091;'>New Demo Request</h2>
                        <p><strong>Product:</strong> {productName}</p>
                        <p><strong>Name:</strong> {name}</p>
                        <p><strong>Email:</strong> {email}</p>
                        <p><strong>Requirements:</strong></p>
                        <div style='padding: 15px; background: #f9f9f9; border-radius: 8px;'>{description.Replace("\n", "<br/>")}</div>
                    </div>";
                demoMail.IsBodyHtml = true;

                SmtpClient smtp = new SmtpClient("m06.internetmailserver.net");
                smtp.Credentials = new NetworkCredential("info@binaryaxon.com", "Info@123@!");
                smtp.EnableSsl = true;
                smtp.Port = 25;
                smtp.Send(demoMail);

                // 2. Send Confirmation Email to Client
                MailMessage clientMail = new MailMessage();
                clientMail.From = new MailAddress("info@binaryaxon.com", "Binary Axon");
                clientMail.To.Add(email);
                clientMail.Subject = "Demo Request Received - Binary Axon";
                clientMail.Body = $@"
                    <div style='font-family: sans-serif; padding: 20px; color: #333;'>
                        <p>Dear {name},</p>
                        <p>Thank you for requesting a demo for <strong>{productName}</strong>.</p>
                        <p>Our technical team has received your request and we are currently preparing a personalized demo environment for you.</p>
                        <p>We will contact you shortly to schedule a walkthrough at your convenience.</p>
                        <br/>
                        <p>Best Regards,</p>
                        <p><strong>Team Binary Axon</strong><br/>www.binaryaxon.com</p>
                    </div>";
                clientMail.IsBodyHtml = true;
                smtp.Send(clientMail);

                // Redirect back with success parameter
                Response.Redirect("index.html?demoSuccess=true#products");
            }
            catch (Exception ex)
            {
                Response.Redirect("index.html?demoError=true#products");
            }
        }
        else
        {
            Response.Redirect("index.html");
        }
    }
</script>
