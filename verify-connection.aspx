<%@ Page Language="C#" %>
<%@ Import Namespace="System.Net" %>
<%@ Import Namespace="System.Net.Mail" %>

<script runat="server">
    protected void Page_Load(object sender, EventArgs e)
    {
        try
        {
            System.Net.ServicePointManager.SecurityProtocol = SecurityProtocolType.Tls12;
            
            MailMessage testMail = new MailMessage();
            testMail.From = new MailAddress("info@binaryaxon.com", "SMTP Test");
            testMail.To.Add("info@binaryaxon.com"); // Sending to self to verify
            testMail.Subject = "SMTP Configuration Test";
            testMail.Body = "If you are reading this, your SMTP settings for info@binaryaxon.com are working correctly!";
            
            SmtpClient smtp = new SmtpClient("m06.internetmailserver.net");
            smtp.Credentials = new NetworkCredential("info@binaryaxon.com", "Info@123@!");
            smtp.EnableSsl = true;
            smtp.Port = 587;
            
            smtp.Send(testMail);
            lblStatus.Text = "SUCCESS: SMTP connection is working! Check your info@binaryaxon.com inbox.";
            lblStatus.ForeColor = System.Drawing.Color.Green;
        }
        catch (Exception ex)
        {
            lblStatus.Text = "ERROR: " + ex.Message;
            lblStatus.ForeColor = System.Drawing.Color.Red;
            if (ex.InnerException != null) {
                lblStatus.Text += "<br/>Inner Error: " + ex.InnerException.Message;
            }
        }
    }
</script>

<!DOCTYPE html>
<html>
<head>
    <title>SMTP Verification</title>
    <style>
        body { font-family: sans-serif; padding: 50px; background: #050505; color: white; text-align: center; }
        .box { border: 1px solid #333; padding: 20px; border-radius: 10px; background: #111; display: inline-block; }
    </style>
</head>
<body>
    <div class="box">
        <h2>SMTP Connection Test</h2>
        <p><asp:Label id="lblStatus" runat="server">Testing connection...</asp:Label></p>
        <hr/>
        <p><small>This file tests the connection to <b>m06.internetmailserver.net</b> using your credentials.</small></p>
    </div>
</body>
</html>
