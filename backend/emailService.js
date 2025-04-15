// emailService.js
import nodemailer from "nodemailer";

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: "jashbohare@gmail.com",
    pass: "zrwr lwnr mkqu anvf",
  },
});

// OTP Email
export const sendOTPEmail = async (toEmail, otp) => {
  const mailOptions = {
    from: "HelpChain <jashbohare@gmail.com>",
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

// Transaction Email (debit/credit)
export const sendTransactionEmail = async (toEmail, subject, message) => {
  const mailOptions = {
    from: "HelpChain <jashbohare@gmail.com>",
    to: toEmail,
    subject,
    text: message,
  };

  try {
    await transporter.sendMail(mailOptions);
    console.log(`📤 Transaction email sent to ${toEmail}`);
  } catch (error) {
    console.error("❌ Failed to send transaction email:", error);
  }
};
