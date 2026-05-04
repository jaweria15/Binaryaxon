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
                string name = Request.Form["name"] ?? "Anonymous";
                string email = Request.Form["email"] ?? "";
                string phone = Request.Form["phone"] ?? "";
                string company = Request.Form["company"] ?? "Not Provided";
                string employees = Request.Form["employees"] ?? "";
                string businessType = Request.Form["businessType"] ?? "";
                string description = Request.Form["description"] ?? "";

                System.Net.ServicePointManager.SecurityProtocol = SecurityProtocolType.Tls12;

                // 1. Send Email to Leads@binaryaxon.com
                MailMessage leadsMail = new MailMessage();
                leadsMail.From = new MailAddress("info@binaryaxon.com", "Binary Axon Contact");
                leadsMail.To.Add("Leads@binaryaxon.com");
                leadsMail.Subject = "New Lead: " + company;
                
                leadsMail.Body = String.Format(
                    "<div style='font-family: sans-serif; padding: 20px; color: #333;'>" +
                    "<h2 style='color: #635091;'>New Contact Request</h2>" +
                    "<p><strong>Name:</strong> {0}</p>" +
                    "<p><strong>Email:</strong> {1}</p>" +
                    "<p><strong>Phone:</strong> {2}</p>" +
                    "<p><strong>Company:</strong> {3}</p>" +
                    "<p><strong>Employees:</strong> {4}</p>" +
                    "<p><strong>Business Type:</strong> {5}</p>" +
                    "<p><strong>Message:</strong></p>" +
                    "<div style='padding: 15px; background: #f9f9f9; border-radius: 8px;'>{6}</div>" +
                    "</div>",
                    name, email, phone, company, employees, businessType, description.Replace("\n", "<br/>")
                );
                
                leadsMail.IsBodyHtml = true;
                leadsMail.Headers.Add("Message-Id", String.Format("<{0}@binaryaxon.com>", Guid.NewGuid().ToString()));

                SmtpClient smtp = new SmtpClient("m06.internetmailserver.net");
                smtp.Credentials = new NetworkCredential("info@binaryaxon.com", "Info@123@!");
                smtp.EnableSsl = true;
                smtp.Port = 587;
                smtp.Send(leadsMail);

                // 2. Send Confirmation Email to Client
                MailMessage clientMail = new MailMessage();
                clientMail.From = new MailAddress("info@binaryaxon.com", "Binary Axon");
                clientMail.To.Add(email);
                clientMail.Subject = "Message Received - Binary Axon";
                clientMail.Body = String.Format(
                    "<div style='font-family: sans-serif; padding: 20px; color: #333;'>" +
                    "<p>Dear {0},</p>" +
                    "<p>Thank you for reaching out to <strong>Binary Axon</strong>. We have received your message regarding <strong>{1}</strong>.</p>" +
                    "<p>Our team will review your requirements and get back to you within 24 hours.</p>" +
                    "<br/><p>Best Regards,</p>" +
                    "<p><strong>Team Binary Axon</strong><br/>www.binaryaxon.com</p></div>",
                    name, company
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
