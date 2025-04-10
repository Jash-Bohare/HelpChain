// login.js

import { db, ref, get } from "../backend/config.js";

// Replace this with the public key you're trying to "log in" with
const inputPublicKey = "GCQD35O34A3P3DHU4E3O7TA57OHRS734EUKIENBRXJI5H3EJYZDNACYU";

const login = async (publicKey) => {
  try {
    const snapshot = await get(ref(db, "wallets/" + publicKey));
    if (snapshot.exists()) {
      const walletData = snapshot.val();
      console.log("✅ Wallet found:");
      console.log("🔑 Public Key:", walletData.publicKey);
      console.log("🗝️ Secret Key:", walletData.secretKey);
      console.log("👤 Role:", walletData.role);
    } else {
      console.log("❌ Wallet not found. Please check the public key or sign up first.");
    }
  } catch (error) {
    console.error("🔥 Login error:", error);
  }
};

login(inputPublicKey);
