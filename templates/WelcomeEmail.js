const WelcomeEmail = ({ name }) => `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Welcome to PawSewa!</title>
  <style>
    body {
      font-family: 'Helvetica Neue', Arial, sans-serif;
      background-color: #f9f9f5;
      margin: 0;
      padding: 0;
      color: #333;
    }
    .email-container {
      max-width: 600px;
      margin: 30px auto;
      background: #ffffff;
      border-radius: 10px;
      overflow: hidden;
      box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08);
      border: 1px solid #ececec;
    }
    .email-header {
      background-color: #747134;
      color: #fff;
      padding: 24px;
      text-align: center;
    }
    .email-header img {
      max-width: 120px;
      margin-bottom: 10px;
    }
    .email-body {
      padding: 30px 25px;
    }
    .email-body h1 {
      font-size: 22px;
      margin-bottom: 14px;
      color: #747134;
    }
    .email-body p {
      font-size: 15px;
      line-height: 1.6;
      margin: 12px 0;
    }
    .cta-button {
      display: inline-block;
      background-color: #747134;
      color: #ffffff;
      text-decoration: none;
      font-size: 16px;
      font-color: #ffffff;
      font-weight: 600;
      padding: 12px 24px;
      border-radius: 6px;
      margin: 24px auto;
    }
    .email-footer {
      background-color: #f4f4f4;
      text-align: center;
      padding: 16px;
      font-size: 12px;
      color: #777;
    }
  </style>
</head>
<body>
  <div class="email-container">
    <div class="email-header">
     <img src="https://drive.google.com/uc?export=view&id=1kt8oUmX932dZMNdlsCknHpXwIJQIdF81" alt="PawSewa Logo">
      <h2>Welcome to PawSewa!</h2>
    </div>
    <div class="email-body">
      <h1>Dear ${name},</h1>
      <p>Welcome to PawSewa — your trusted partner for complete pet care!</p>
      <p>With PawSewa, you can book doctor visits, adopt pets, purchase products, and even consult AI for instant pet care tips — all from one place.</p>
      <p>We are committed to providing a seamless, stress-free, and loving experience for both pets and their owners.</p>
      <div style="text-align: center;">
        <a href="https://pawsewa.com/login" 
   class="cta-button"
   style="display:inline-block; background-color:#747134; color:#ffffff; text-decoration:none; font-size:16px; font-weight:600; padding:12px 24px; border-radius:6px;">
  Explore PawSewa
</a>

      </div>
      <p>If you ever need help, don’t hesitate to contact our support team. We’re always here to assist you.</p>
      <p>Thank you for joining the PawSewa family. Let’s make tails wag together!</p>
    </div>
    <div class="email-footer">
      <p>&copy; ${new Date().getFullYear()} PawSewa. All rights reserved.</p>
      <p>Questions? Reach out to us at support@pawsewa.com</p>
    </div>
  </div>
</body>
</html>
`;

module.exports = WelcomeEmail;
