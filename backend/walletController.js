// walletController.js

import stellar from "@stellar/stellar-sdk";
import fetch from "node-fetch";
import { db, ref, set, get } from "./config.js"; // ✅ make sure 'get' is imported

const { Keypair } = stellar;
const server = new stellar.Horizon.Server("https://horizon-testnet.stellar.org");

// ✅ Create Wallet Handler
export const createWallet = async (req, res) => {
  const { name, email, role } = req.body;

  if (!name || !email || !role) {
    return res.status(400).json({ error: "Missing required fields" });
  }

  const pair = Keypair.random();
  const publicKey = pair.publicKey();
  const secretKey = pair.secret();

  try {
    const response = await fetch(`https://friendbot.stellar.org?addr=${publicKey}`);
    await response.json();

    await set(ref(db, "wallets/" + publicKey), {
      name,
      email,
      role,
      publicKey,
      secretKey,
    });

    res.status(200).json({
      message: "✅ Wallet created and saved to Firebase!",
      publicKey,
      secretKey,
    });
  } catch (error) {
    console.error("🔥 Error creating wallet:", error);
    res.status(500).json({ error: "Something went wrong" });
  }
};

// Login Handler
export const loginUser = async (req, res) => {
  const { email } = req.body;

  if (!email) {
    return res.status(400).json({ error: "Email is required" });
  }

  try {
    // Fetch all wallets
    const snapshot = await get(ref(db, "wallets"));
    if (!snapshot.exists()) {
      return res.status(404).json({ error: "No users found" });
    }

    const wallets = snapshot.val();

    // Look for the user with the matching email
    const userEntry = Object.values(wallets).find((wallet) => wallet.email === email);

    if (!userEntry) {
      return res.status(404).json({ error: "User not found" });
    }

    res.status(200).json({ message: "✅ Login successful", user: userEntry });
  } catch (error) {
    console.error("🔥 Error logging in:", error);
    res.status(500).json({ error: "Something went wrong" });
  }
};

