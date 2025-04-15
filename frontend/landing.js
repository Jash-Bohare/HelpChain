document.addEventListener("DOMContentLoaded", async () => {
  const user = JSON.parse(localStorage.getItem("user"));
  if (!user) return (window.location.href = "index.html");

  // Display user info
  document.getElementById("userName").innerText = user.name;
  document.getElementById("userRole").innerText = user.role;
  document.getElementById("publicKey").innerText = user.publicKey;

  // Load balance using Stellar SDK
  const server = new StellarSdk.Server("https://horizon-testnet.stellar.org");

  async function updateBalance() {
    try {
      const account = await server.loadAccount(user.publicKey);
      const balance = account.balances.find(b => b.asset_type === "native").balance;
      document.getElementById("walletBalance").innerText = balance;
    } catch (err) {
      document.getElementById("walletBalance").innerText = "Error";
      console.error("Balance fetch error:", err);
    }
  }

  await updateBalance();

  // Logout
  document.getElementById("logoutBtn").addEventListener("click", () => {
    localStorage.clear();
    window.location.href = "index.html";
  });

  // 🔁 Send funds via backend
  document.getElementById("sendForm").addEventListener("submit", async (e) => {
    e.preventDefault();

    const recipient = document.getElementById("recipient").value.trim();
    const amount = document.getElementById("amount").value.trim();
    const statusDiv = document.getElementById("sendStatus");

    if (!recipient || !amount) {
      statusDiv.innerText = "❌ Please enter recipient and amount.";
      return;
    }

    try {
      const response = await fetch("http://localhost:5000/api/send-funds", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          senderEmail: user.email,
          senderSecret: user.secretKey,
          recipientPublicKey: recipient,  // ✅ This must match backend
          amount: amount
        }),
      });

      const data = await response.json();

      if (response.ok) {
        statusDiv.innerText = `✅ ${data.message}`;
        await updateBalance();
        document.getElementById("sendForm").reset();
      } else {
        statusDiv.innerText = `❌ ${data.error}`;
      }
    } catch (err) {
      console.error("❌ Transaction failed:", err);
      statusDiv.innerText = "❌ Something went wrong. Try again.";
    }
  });
});
