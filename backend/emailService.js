// emailService.js

import nodemailer from "nodemailer";

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: "jashbohare@gmail.com", // 🔁 replace with your Gmail
    pass: "your_app_password",    // 🔁 use App Password if 2FA is enabled
  },
});

export const sendOTPEmail = async (toEmail, otp) => {
  const mailOptions = {
    from: "jashbohare@gmail.com", // 🔁 same Gmail
    to: toEmail,
    subject: "HelpChain - OTP Verification",
    text: `Your OTP for verifying your email is: ${otp}`,
  };

  try {
    await transporter.sendMail(mailOptions);
    console.log("📧 OTP email sent to", toEmail);
    return true;
  } catch (error) {
    console.error("❌ Failed to send OTP:", error);
    return false;
  }
};
