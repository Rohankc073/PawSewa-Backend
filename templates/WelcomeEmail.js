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
    .welcome-badge {
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
    .features-section {
      background: #f8f9fa;
      padding: 25px;
      border-radius: 12px;
      margin: 25px 0;
      border-left: 4px solid #747134;
    }
    .features-grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(120px, 1fr));
      gap: 15px;
      margin: 20px 0;
    }
    .feature-item {
      text-align: center;
      padding: 15px;
      background: #fff;
      border-radius: 10px;
      border: 1px solid #e9ecef;
    }
    .feature-icon {
      font-size: 24px;
      margin-bottom: 8px;
      display: block;
    }
    .feature-text {
      font-size: 13px;
      color: #747134;
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
    .cta-button {
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
    .cta-button:hover {
      transform: translateY(-2px);
      box-shadow: 0 6px 20px rgba(116, 113, 52, 0.4);
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
      .features-grid {
        grid-template-columns: repeat(2, 1fr);
      }
      .cta-button {
        padding: 12px 24px;
        font-size: 14px;
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
      <h2>Welcome to PawSewa!</h2>
      <div class="welcome-badge">Your Pet Care Journey Begins Here</div>
    </div>
    
    <div class="email-body">
      <h1>Dear ${name}! 🐾</h1>
      
      <p>Welcome to <span class="highlight-text">PawSewa</span> — your trusted partner for complete pet care!</p>
      
      <p>We're thrilled to have you join our loving community of pet parents who prioritize their furry friends' health and happiness.</p>
      
      <div class="features-section">
        <h3 style="color: #747134; margin-top: 0; text-align: center;">What You Can Do With PawSewa</h3>
        <div class="features-grid">
          <div class="feature-item">
            <div class="feature-icon">🏥</div>
            <div class="feature-text">Doctor Visits</div>
          </div>
          <div class="feature-item">
            <div class="feature-icon">🏠</div>
            <div class="feature-text">Pet Adoption</div>
          </div>
          <div class="feature-item">
            <div class="feature-icon">🛍️</div>
            <div class="feature-text">Pet Products</div>
          </div>
          <div class="feature-item">
            <div class="feature-icon">🤖</div>
            <div class="feature-text">AI Consultation</div>
          </div>
        </div>
      </div>
      
      <p>With PawSewa, you can book doctor visits, adopt pets, purchase premium products, and even consult our AI for instant pet care tips — all from one convenient platform.</p>
      
      <div class="divider"></div>
      
      <p>We are committed to providing a <span class="highlight-text">seamless, stress-free, and loving experience</span> for both pets and their devoted owners.</p>
      
      <div class="cta-section">
        <h3 style="color: #747134; margin-top: 0;">Ready to Get Started?</h3>
        <a href="https://pawsewa.com/login" class="cta-button">
          Explore PawSewa Now
        </a>
        <p style="margin-top: 15px; font-size: 14px; color: #666;">
          Discover all the amazing features waiting for you!
        </p>
      </div>
      
      <p>If you ever need help, don't hesitate to contact our dedicated support team. We're always here to assist you and your pet.</p>
      
      <div class="divider"></div>
      
      <p style="text-align: center; font-size: 18px; color: #747134; font-weight: 600;">
        Thank you for joining the PawSewa family. 
        <br>
        <span class="paw-print">🐾</span> Let's make tails wag together! <span class="paw-print">🐾</span>
      </p>
    </div>
    
    <div class="email-footer">
      <p style="font-size: 16px; margin-bottom: 15px;"><strong>&copy; ${new Date().getFullYear()} PawSewa. All rights reserved.</strong></p>
      <p>Questions? Reach out to us at <a href="mailto:support@pawsewa.com">support@pawsewa.com</a></p>
      <p style="font-size: 12px; margin-top: 15px; opacity: 0.8;">
        This email was sent to you because you signed up for PawSewa. 
        We promise to keep your inbox happy, just like your pets!
      </p>
    </div>
  </div>
</body>
</html>
`;

module.exports = WelcomeEmail;