// stellarUtils.js

import * as StellarSdk from "@stellar/stellar-sdk";

// Use the default export for CommonJS compatibility
const server = new StellarSdk.Horizon.Server("https://horizon-testnet.stellar.org");

// Generate a new Stellar keypair
export const generateKeypair = () => {
  return StellarSdk.Keypair.random();
};

// Fund the public key using Friendbot on testnet
export const fundWallet = async (publicKey) => {
  const url = `https://friendbot.stellar.org?addr=${encodeURIComponent(publicKey)}`;

  try {
    const response = await fetch(url);
    const result = await response.json();

    if (!response.ok) {
      console.error("❌ Friendbot Error Response:", result);
      throw new Error("❌ Failed to fund wallet with Friendbot");
    }

    console.log("✅ Wallet funded by Friendbot:", result);
    return result;
  } catch (err) {
    console.error("🔥 Friendbot fetch failed:", err);
    throw err;
  }
};


export { server };
