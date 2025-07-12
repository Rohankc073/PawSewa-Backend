const ResetPasswordEmail = ({ email, resetLink }) => `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Password Reset - PawSewa</title>
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
      border-radius: 15px;
      overflow: hidden;
      box-shadow: 0 8px 25px rgba(0, 0, 0, 0.12);
      border: 1px solid #e0e0e0;
    }
    .email-header {
      background: linear-gradient(135deg, #747134 0%, #8b8b4a 100%);
      color: #fff;
      padding: 40px 24px;
      text-align: center;
      position: relative;
    }
    .logo-container {
      background: rgba(255, 255, 255, 0.95);
      padding: 15px;
      border-radius: 15px;
      display: inline-block;
      margin-bottom: 20px;
      box-shadow: 0 4px 15px rgba(0, 0, 0, 0.1);
      border: 2px solid rgba(255, 255, 255, 0.3);
    }
    .email-header img {
      max-width: 120px;
      height: auto;
      border-radius: 8px;
      display: block;
    }
    .email-header h2 {
      font-size: 28px;
      margin: 0;
      font-weight: 700;
      text-shadow: 1px 1px 2px rgba(0, 0, 0, 0.2);
    }
    .reset-badge {
      display: inline-block;
      background: rgba(255, 255, 255, 0.2);
      padding: 8px 16px;
      border-radius: 20px;
      font-size: 14px;
      font-weight: 500;
      margin-top: 10px;
      backdrop-filter: blur(10px);
    }
    .email-body {
      padding: 40px 30px;
      background: #fff;
    }
    .email-body h1 {
      font-size: 24px;
      margin-bottom: 20px;
      color: #747134;
      text-align: center;
      font-weight: 700;
    }
    .email-body p {
      font-size: 16px;
      line-height: 1.7;
      margin: 16px 0;
      color: #555;
    }
    .highlight-text {
      color: #747134;
      font-weight: 600;
    }
    .security-notice {
      background: #fff3cd;
      border: 1px solid #ffeaa7;
      border-left: 4px solid #fdcb6e;
      padding: 20px;
      border-radius: 12px;
      margin: 25px 0;
      position: relative;
    }
    .security-notice::before {
      content: "⚠️";
      position: absolute;
      top: 20px;
      left: 20px;
      font-size: 20px;
    }
    .security-notice-content {
      margin-left: 35px;
    }
    .security-notice h3 {
      color: #856404;
      margin-top: 0;
      font-size: 16px;
      font-weight: 600;
    }
    .security-notice p {
      color: #856404;
      margin-bottom: 0;
      font-size: 14px;
    }
    .reset-section {
      background: #f8f9fa;
      padding: 25px;
      border-radius: 12px;
      margin: 25px 0;
      border-left: 4px solid #747134;
    }
    .reset-section h3 {
      color: #747134;
      margin-top: 0;
      text-align: center;
      font-size: 20px;
      font-weight: 600;
    }
    .cta-section {
      text-align: center;
      margin: 30px 0;
      padding: 30px;
      background: linear-gradient(135deg, #f8f9fa 0%, #e9ecef 100%);
      border-radius: 12px;
      border: 2px dashed #747134;
    }
    .reset-button {
      display: inline-block;
      background: linear-gradient(135deg, #747134 0%, #8b8b4a 100%);
      color: #ffffff !important;
      text-decoration: none;
      font-size: 16px;
      font-weight: 600;
      padding: 15px 30px;
      border-radius: 25px;
      transition: all 0.3s ease;
      box-shadow: 0 4px 15px rgba(116, 113, 52, 0.3);
      text-transform: uppercase;
      letter-spacing: 0.5px;
    }
    .reset-button:hover {
      transform: translateY(-2px);
      box-shadow: 0 6px 20px rgba(116, 113, 52, 0.4);
    }
    .reset-link-fallback {
      background: #f8f9fa;
      padding: 15px;
      border-radius: 10px;
      border: 1px solid #e9ecef;
      margin: 20px 0;
      font-family: 'Courier New', monospace;
      font-size: 14px;
      word-break: break-all;
      color: #6c757d;
    }
    .security-tips {
      background: #e8f5e8;
      border: 1px solid #c3e6c3;
      border-left: 4px solid #28a745;
      padding: 20px;
      border-radius: 12px;
      margin: 25px 0;
    }
    .security-tips h3 {
      color: #155724;
      margin-top: 0;
      font-size: 16px;
      font-weight: 600;
    }
    .security-tips ul {
      color: #155724;
      margin: 10px 0;
      padding-left: 20px;
    }
    .security-tips li {
      margin: 5px 0;
      font-size: 14px;
    }
    .divider {
      height: 2px;
      background: linear-gradient(90deg, transparent, #747134, transparent);
      margin: 25px 0;
      border-radius: 1px;
    }
    .email-footer {
      background: linear-gradient(135deg, #2c3e50 0%, #34495e 100%);
      color: #bdc3c7;
      text-align: center;
      padding: 25px;
      font-size: 14px;
    }
    .email-footer p {
      margin: 8px 0;
    }
    .email-footer a {
      color: #74b9ff;
      text-decoration: none;
    }
    .paw-print {
      color: #747134;
      font-size: 18px;
      margin: 0 5px;
    }
    @media only screen and (max-width: 600px) {
      .email-container {
        margin: 15px;
        border-radius: 12px;
      }
      .email-header, .email-body {
        padding: 25px 20px;
      }
      .reset-button {
        padding: 12px 24px;
        font-size: 14px;
      }
      .cta-section {
        padding: 20px;
      }
    }
  </style>
</head>
<body>
  <div class="email-container">
    <div class="email-header">
      <div class="logo-container">
        <img src="https://drive.google.com/uc?export=view&id=1kt8oUmX932dZMNdlsCknHpXwIJQIdF81" alt="PawSewa Logo">
      </div>
      <h2>Password Reset Request</h2>
      <div class="reset-badge">Secure Your Pet Care Account</div>
    </div>
    
    <div class="email-body">
      <h1>Reset Your Password 🔐</h1>
      
      <p>Hi <span class="highlight-text">${email}</span>,</p>
      
      <p>We received a request to reset your password for your <span class="highlight-text">PawSewa</span> account — your trusted partner for complete pet care!</p>
      
      <div class="security-notice">
        <div class="security-notice-content">
          <h3>Security Alert</h3>
          <p>If you didn't request this password reset, please ignore this email or contact our support team immediately to keep your pet's information safe.</p>
        </div>
      </div>
      
      <div class="reset-section">
        <h3>What You'll Continue to Access After Reset</h3>
        <p style="text-align: center; margin: 15px 0; color: #666;">
          🏥 Doctor Visits • 🏠 Pet Adoption • 🛍️ Pet Products • 🤖 AI Consultation
        </p>
      </div>
      
      <p>To keep your furry friend's health records and appointments secure, we need you to create a new password.</p>
      
      <div class="cta-section">
        <h3 style="color: #747134; margin-top: 0;">Ready to Reset Your Password?</h3>
        <a href="${resetLink}" target="_blank" class="reset-button">
          Reset My Password
        </a>
        <p style="margin-top: 15px; font-size: 14px; color: #666;">
          This link will expire in 24 hours for your security.
        </p>
      </div>
      
      <p style="font-size: 14px; color: #666; margin-top: 20px;">
        <strong>Can't click the button?</strong> Copy and paste this link into your browser:
      </p>
      <div class="reset-link-fallback">
        ${resetLink}
      </div>
      
      <div class="divider"></div>
      
      <div class="security-tips">
        <h3>🛡️ Security Tips for Your New Password:</h3>
        <ul>
          <li>Use at least 8 characters with a mix of letters, numbers, and symbols</li>
          <li>Avoid using your pet's name or common words</li>
          <li>Don't reuse passwords from other accounts</li>
          <li>Consider using a password manager to keep it secure</li>
        </ul>
      </div>
      
      <p>If you continue to have trouble accessing your account, please don't hesitate to contact our dedicated support team. We're always here to assist you and your pet.</p>
      
      <div class="divider"></div>
      
      <p style="text-align: center; font-size: 18px; color: #747134; font-weight: 600;">
        Your security keeps your pet's care secure.
        <br>
        <span class="paw-print">🐾</span> Stay safe and keep tails wagging! <span class="paw-print">🐾</span>
      </p>
    </div>
    
    <div class="email-footer">
      <p style="font-size: 16px; margin-bottom: 15px;"><strong>&copy; ${new Date().getFullYear()} PawSewa. All rights reserved.</strong></p>
      <p>Questions? Reach out to us at <a href="mailto:support@pawsewa.com">support@pawsewa.com</a></p>
      <p style="font-size: 12px; margin-top: 15px; opacity: 0.8;">
        This email was sent to you because a password reset was requested for your PawSewa account.
        We promise to keep your inbox happy, just like your pets!
      </p>
    </div>
  </div>
</body>
</html>
`;

module.exports = ResetPasswordEmail;