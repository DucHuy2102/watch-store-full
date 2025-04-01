export const VERIFICATION_EMAIL_TEMPLATE = `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Verify Your Email</title>
</head>
<body style="font-family: Arial, sans-serif; line-height: 1.6; color: #333; max-width: 600px; margin: 0 auto; padding: 20px;">
  <div style="background: linear-gradient(to right, #4CAF50, #2E7D32); padding: 20px; text-align: center; border-radius: 10px 10px 0 0;">
    <h1 style="color: white; margin: 0; font-size: 24px;">Verify Your Email</h1>
  </div>
  <div style="background-color: #fff; padding: 20px; border-radius: 0 0 10px 10px; box-shadow: 0 4px 8px rgba(0,0,0,0.1);">
    <p style="font-size: 16px; color: #555;"><b>Hello {username},</b></p>
    <p>Thank you for signing up! Your verification code is:</p>
    <div style="text-align: center; margin: 20px 0;">
      <span style="display: inline-block; font-size: 32px; font-weight: bold; letter-spacing: 5px; color: #fff; background: #4CAF50; padding: 10px 20px; border-radius: 5px;">
        {verificationCode}
      </span>
    </div>
    <p>Enter this code on the verification page to complete your registration.</p>
    <p>This code will expire in <b>15 minutes</b> for security reasons.</p>
    <p>If you didn't create an account with us, please ignore this email.</p>
    <p>Best regards,<br><b>Your App Team</b></p>
  </div>
  <div style="text-align: center; margin-top: 20px; color: #888; font-size: 0.8em;">
    <p>This is an automated message, please do not reply to this email.</p>
  </div>
</body>
</html>
`;

export const PASSWORD_RESET_SUCCESS_TEMPLATE = `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Password Reset Successful</title>
</head>
<body style="font-family: Arial, sans-serif; line-height: 1.6; color: #333; max-width: 600px; margin: 0 auto; padding: 20px; background-color: #f4f4f4;">
  <div style="background: linear-gradient(to right, #4CAF50, #45a049); padding: 20px; text-align: center; border-radius: 8px 8px 0 0;">
    <h1 style="color: white; margin: 0; font-size: 24px;">Password Reset Successful</h1>
  </div>
  <div style="background-color: #fff; padding: 20px; border-radius: 0 0 8px 8px; box-shadow: 0 2px 5px rgba(0,0,0,0.1);">
    <p style="font-size: 16px;"><b>Hello {username},</b></p>
    <p>Your password has been successfully reset.</p>
    <div style="text-align: center; margin: 30px 0;">
      <div style="background-color: #4CAF50; color: white; width: 60px; height: 60px; line-height: 60px; border-radius: 50%; display: inline-block; font-size: 32px; font-weight: bold;">
        ✓
      </div>
    </div>
    <p>If you did not request this change, please contact our support team immediately.</p>
    <p><b>For better security, we recommend:</b></p>
    <ul style="padding-left: 20px;">
      <li>Using a strong, unique password</li>
      <li>Enabling two-factor authentication</li>
      <li>Avoiding the same password for multiple accounts</li>
    </ul>
    <p>Thank you for keeping your account secure.</p>
    <p style="margin-top: 20px;">Best regards,<br><b>Your App Team</b></p>
  </div>
  <div style="text-align: center; margin-top: 20px; color: #888; font-size: 0.8em;">
    <p>This is an automated message, please do not reply.</p>
  </div>
</body>
</html>
`;

export const PASSWORD_RESET_REQUEST_TEMPLATE = `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Reset Your Password</title>
  <style>
    body {
      font-family: 'Arial', sans-serif;
      line-height: 1.6;
      color: #333;
      background-color: #f4f4f4;
      text-align: center;
      padding: 0;
      margin: 0;
    }
    .container {
      max-width: 600px;
      margin: 30px auto;
      background: #ffffff;
      border-radius: 10px;
      box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
      overflow: hidden;
    }
    .header {
      background: linear-gradient(135deg, #4CAF50, #2E7D32);
      padding: 25px;
      text-align: center;
      color: white;
      font-size: 24px;
      font-weight: bold;
    }
    .content {
      padding: 30px;
    }
    .content p {
      font-size: 16px;
      color: #555;
      margin-bottom: 20px;
    }
    .button {
      display: inline-block;
      background-color: #4CAF50;
      color: white;
      padding: 14px 28px;
      text-decoration: none;
      border-radius: 5px;
      font-size: 16px;
      font-weight: bold;
      transition: background 0.3s ease;
    }
    .button:hover {
      background-color: #2E7D32;
    }
    .footer {
      padding: 20px;
      text-align: center;
      font-size: 12px;
      color: #888;
      background-color: #f9f9f9;
      border-top: 1px solid #ddd;
    }
  </style>
</head>
<body>
  <div class="container">
    <div class="header">
      Password Reset Request
    </div>
    <div class="content">
      <p><strong>Hello {username},</strong></p>
      <p>We received a request to reset your password. If you didn't make this request, please ignore this email.</p>
      <p>Click the button below to reset your password:</p>
      <a href="{resetURL}" class="button">Reset Password</a>
      <p>This link will expire in <b>1 hour</b> for security reasons.</p>
      <p>Best regards,<br>Your App Team</p>
    </div>
    <div class="footer">
      <p>This is an automated message, please do not reply.</p>
    </div>
  </div>
</body>
</html>
`;
