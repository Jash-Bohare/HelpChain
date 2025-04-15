// stellarUtils.js ✅ FIXED for ESM + Stellar SDK
import StellarSdkPkg from "@stellar/stellar-sdk"; // Import as default
import fetch from "node-fetch"; // Required in Node.js for friendbot

const server = new StellarSdkPkg.Horizon.Server("https://horizon-testnet.stellar.org");

const generateKeypair = () => {
  return StellarSdkPkg.Keypair.random();
};

const fundWallet = async (publicKey) => {
  const url = `https://friendbot.stellar.org?addr=${encodeURIComponent(publicKey)}`;
  try {
    const response = await fetch(url);
    const result = await response.json();

    if (!response.ok) {
      throw new Error("❌ Friendbot failed to fund the wallet.");
    }

    console.log("✅ Wallet funded:", result);
    return result;
  } catch (error) {
    console.error("🔥 Friendbot error:", error);
    throw error;
  }
};

export {
  generateKeypair,
  fundWallet,
  server,
  StellarSdkPkg as StellarSdk, // 🔁 Export entire SDK as StellarSdk
};
