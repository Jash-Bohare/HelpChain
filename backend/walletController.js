import { generateKeypair, fundWallet } from "./stellarUtils.js";
import { saveUserToFirebase } from "./firebaseUtils.js";
import nodemailer from "nodemailer";
import { db, ref, set, get } from "./config.js";

// Utility to generate 6-digit OTP
const generateOtp = () => Math.floor(100000 + Math.random() * 900000).toString();

// In-memory store (temporary)
const otpStore = new Map();

// ✅ Send OTP with email duplication check
const sendOtp = async (req, res) => {
  const { email } = req.body;

  if (!email) {
    return res.status(400).json({ error: "Email is required" });
  }

  // ✅ Check if email is already registered in Firebase
  try {
    const snapshot = await get(ref(db, "wallets"));
    if (snapshot.exists()) {
      const wallets = snapshot.val();
      const alreadyExists = Object.values(wallets).some(wallet => wallet.email === email);

      if (alreadyExists) {
        return res.status(409).json({
          error: "Email already registered. Please log in or use a different email.",
        });
      }
    }
  } catch (error) {
    console.error("🔥 Firebase error:", error);
    return res.status(500).json({ error: "Server error while checking email." });
  }

  const otp = generateOtp();
  otpStore.set(email, otp);

  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: "jashbohare@gmail.com", // ✅ your Gmail
      pass: "zrwr lwnr mkqu anvf",   // 🔐 App Password
    },
  });

  const mailOptions = {
    from: "HelpChain <jashbohare@gmail.com>",
    to: email,
    subject: "Your HelpChain OTP",
    text: `Your OTP for HelpChain sign up is: ${otp}`,
  };

  try {
    await transporter.sendMail(mailOptions);
    res.status(200).json({ message: "OTP sent to email!" });
  } catch (error) {
    console.error("❌ Email error:", error);
    res.status(500).json({ error: "Failed to send OTP." });
  }
};

// ✅ Verify OTP and Create Wallet
const verifyOtpAndCreateWallet = async (req, res) => {
  const { name, email, password, role, otp } = req.body;
  const storedOtp = otpStore.get(email);

  if (!storedOtp || storedOtp !== otp) {
    return res.status(400).json({ error: "Invalid or expired OTP." });
  }

  try {
    // ✅ Double-check email again for safety (optional)
    const snapshot = await get(ref(db, "wallets"));
    if (snapshot.exists()) {
      const allWallets = snapshot.val();
      const alreadyExists = Object.values(allWallets).some(wallet => wallet.email === email);

      if (alreadyExists) {
        return res.status(409).json({
          error: "Email already registered. Please log in or use a different email.",
        });
      }
    }

    const keypair = await generateKeypair();
    const publicKey = keypair.publicKey();
    const secretKey = keypair.secret();

    await fundWallet(publicKey);

    const userData = {
      name,
      email,
      password,
      role,
      publicKey,
      secretKey,
    };

    await saveUserToFirebase(email, userData);
    otpStore.delete(email);

    res.status(200).json({
      message: "Wallet created and OTP verified!",
      publicKey,
      secretKey,
    });
  } catch (error) {
    console.error("🔥 Wallet creation error:", error);
    res.status(500).json({ error: "Failed to verify OTP and create wallet." });
  }
};

// ✅ Login with email (no password verification)
const loginUser = async (req, res) => {
  const { email } = req.body;

  if (!email) {
    return res.status(400).json({ error: "Email is required." });
  }

  try {
    const snapshot = await get(ref(db, "wallets"));
    if (!snapshot.exists()) {
      return res.status(404).json({ error: "User not found." });
    }

    const wallets = snapshot.val();
    const userEntry = Object.values(wallets).find(wallet => wallet.email === email);

    if (!userEntry) {
      return res.status(404).json({ error: "User not found." });
    }

    res.status(200).json({
      message: "Login successful.",
      user: {
        name: userEntry.name,
        role: userEntry.role,
        publicKey: userEntry.publicKey,
      },
    });
  } catch (err) {
    console.error("🔥 Login error:", err);
    res.status(500).json({ error: "Server error during login." });
  }
};

export { sendOtp, verifyOtpAndCreateWallet, loginUser };
