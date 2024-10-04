import nodemailer from "nodemailer";
import dotenv from "dotenv";
import env from "../../infrastructure/env.js";

dotenv.config();

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: env.MAILER_EMAIL,
    pass: env.MAILER_PASS,
  },
});

export async function sendPassResetEmail({ email, OTP }) {
  try {
    const mailConfig = {
      from: env.MAILER_EMAIL,
      to: email,
      subject: "Password Recovery - BluOrn",
      html: `
        <div style="font-family: Arial, sans-serif; color: #333; line-height: 1.6;">
          <h2 style="color: #E74C3C;">Password Recovery Request</h2>
          <p>We received a request to reset the password for your BluOrn account associated with <strong>${email}</strong>.</p>
          
          <p>Please use the following One-Time Password (OTP) to reset your password:</p>
          
          <div style="background-color: #f4f4f4; padding: 10px; margin: 20px 0; font-size: 18px;">
            <strong>Your OTP:</strong> <span style="color: #E74C3C; font-weight: bold;">${OTP}</span>
          </div>
          
          <p>This OTP is valid for the next <strong>10 minutes</strong>. After this period, you will need to request a new one.</p>
          
          <p>If you did not request a password reset, please ignore this email or contact our support team immediately.</p>
          
          <p>For your security, please do not share this OTP with anyone.</p>
          
          <p>Thanks,</p>
          <p><strong>The BluOrn Support Team</strong></p>
          
          <hr style="border:none; border-top: 1px solid #ddd;" />
          <p style="font-size: 12px; color: #777;">
            If you need further assistance, feel free to contact us at <a href="mailto:support@bluorn.com">support@bluorn.com</a>.
          </p>
        </div>
      `,
    };

    const info = await transporter.sendMail(mailConfig);
  } catch (error) {
    console.error("Error sending mail:", error);
    throw new Error("Failed to send OTP");
  }
}

export async function sendSignupEmail({ email, OTP }) {
  try {
    const mailConfig = {
      from: env.MAILER_EMAIL,
      to: email,
      subject: "Signup Verification - BluOrn",
      html: `
        <div style="font-family: Arial, sans-serif; color: #333; line-height: 1.6;">
          <h2 style="color: #4CAF50;">Welcome to BluOrn!</h2>
          <p>Thank you for signing up for a BluOrn account.</p>
          
          <p>To verify your email address and activate your account, please use the One-Time Password (OTP) provided below:</p>
          
          <div style="background-color: #f4f4f4; padding: 10px; margin: 20px 0; font-size: 18px;">
            <strong>Your OTP:</strong> <span style="color: #4CAF50; font-weight: bold;">${OTP}</span>
          </div>
          
          <p>This OTP is valid for the next <strong>10 minutes</strong>.</p>
          
          <p>If you did not request this, please ignore this email or contact our support team.</p>
          
          <p>Thanks,</p>
          <p><strong>The BluOrn Team</strong></p>
          
          <hr style="border:none; border-top: 1px solid #ddd;" />
          <p style="font-size: 12px; color: #777;">
            If you have any issues, please reach out to us at <a href="mailto:support@bluorn.com">support@bluorn.com</a>.
          </p>
        </div>
      `,
    };

    const info = await transporter.sendMail(mailConfig);
  } catch (error) {
    console.error("Error sending signup email:", error);
    throw new Error("Could not send signup verification email.");
  }
}
