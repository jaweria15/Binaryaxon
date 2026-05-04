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
                string productName = Request.Form["productName"] ?? "Not Specified";
                string name = Request.Form["name"] ?? "Anonymous";
                string email = Request.Form["email"] ?? "";
                string phone = Request.Form["phone"] ?? "Not Provided";
                string description = Request.Form["description"] ?? "";

                System.Net.ServicePointManager.SecurityProtocol = SecurityProtocolType.Tls12;

                // 1. Send Demo Request to info@binaryaxon.com
                MailMessage demoMail = new MailMessage();
                demoMail.From = new MailAddress("info@binaryaxon.com", "Binary Axon Demo Request");
                demoMail.To.Add("info@binaryaxon.com");
                demoMail.Subject = "Demo Request: " + productName;
                
                demoMail.Body = String.Format(
                    "<div style='font-family: sans-serif; padding: 20px; color: #333;'>" +
                    "<h2 style='color: #635091;'>New Demo Request</h2>" +
                    "<p><strong>Product:</strong> {0}</p>" +
                    "<p><strong>Name:</strong> {1}</p>" +
                    "<p><strong>Email:</strong> {2}</p>" +
                    "<p><strong>Phone:</strong> {3}</p>" +
                    "<p><strong>Requirements:</strong></p>" +
                    "<div style='padding: 15px; background: #f9f9f9; border-radius: 8px;'>{4}</div>" +
                    "</div>",
                    productName, name, email, phone, description.Replace("\n", "<br/>")
                );
                demoMail.IsBodyHtml = true;
                demoMail.Headers.Add("Message-Id", String.Format("<{0}@binaryaxon.com>", Guid.NewGuid().ToString()));

                SmtpClient smtp = new SmtpClient("m06.internetmailserver.net");
                smtp.Credentials = new NetworkCredential("info@binaryaxon.com", "Info@123@!");
                smtp.EnableSsl = true;
                smtp.Port = 587;
                smtp.Send(demoMail);

                // 2. Send Confirmation Email to Client
                MailMessage clientMail = new MailMessage();
                clientMail.From = new MailAddress("info@binaryaxon.com", "Binary Axon");
                clientMail.To.Add(email);
                clientMail.Subject = "Demo Request Received - Binary Axon";
                clientMail.Body = String.Format(
                    "<div style='font-family: sans-serif; padding: 20px; color: #333;'>" +
                    "<p>Dear {0},</p>" +
                    "<p>Thank you for requesting a demo for <strong>{1}</strong>.</p>" +
                    "<p>Our team will contact you shortly to schedule a walkthrough.</p>" +
                    "<br/><p>Best Regards,</p>" +
                    "<p><strong>Team Binary Axon</strong><br/>www.binaryaxon.com</p></div>",
                    name, productName
                );
                clientMail.IsBodyHtml = true;
                clientMail.Headers.Add("Message-Id", String.Format("<{0}@binaryaxon.com>", Guid.NewGuid().ToString()));
                smtp.Send(clientMail);

                // Send JSON and stop all further processing
                Response.Clear();
                Response.ContentType = "application/json";
                Response.Write("{\"success\": true}");
                Response.Flush();
                Response.SuppressContent = true;
                HttpContext.Current.ApplicationInstance.CompleteRequest();
            }
            catch (System.Threading.ThreadAbortException)
            {
                // Ignore
            }
            catch (Exception ex)
            {
                Response.Clear();
                Response.ContentType = "application/json";
                Response.Write("{\"success\": false, \"message\": \"" + ex.Message.Replace("\"", "'") + "\"}");
                Response.Flush();
                Response.SuppressContent = true;
                HttpContext.Current.ApplicationInstance.CompleteRequest();
            }
        }
        else
        {
            Response.Redirect("index.html");
        }
    }
</script>
