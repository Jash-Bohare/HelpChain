document.addEventListener("DOMContentLoaded", async () => {
  const user = JSON.parse(localStorage.getItem("user"));
  if (!user) return (window.location.href = "index.html");

  // Display user info
  document.getElementById("userName").innerText = user.name;
  document.getElementById("userRole").innerText = user.role;
  document.getElementById("publicKey").innerText = user.publicKey;

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

  async function fetchTransactions() {
    const transactionList = document.getElementById("transactionList");

    try {
      const res = await fetch(`http://localhost:5000/api/transactions/${user.publicKey}`);
      const data = await res.json();

      if (res.ok) {
        if (data.length === 0) {
          transactionList.innerHTML = "No transactions found.";
          return;
        }

        transactionList.innerHTML = `
          <ul class="space-y-2">
            ${data.map(tx => `
              <li class="border p-2 rounded bg-gray-50 shadow-sm">
                <p><strong>Type:</strong> ${tx.type === 'sent' ? '🔻 Sent' : '🔺 Received'}</p>
                <p><strong>From:</strong> ${tx.fromName} (${tx.from})</p>
                <p><strong>To:</strong> ${tx.toName} (${tx.to})</p>
                <p><strong>Amount:</strong> ${tx.amount} XLM</p>
                <p><strong>Date:</strong> ${new Date(tx.created_at).toLocaleString()}</p>
                <p><a href="${tx.link}" target="_blank" class="text-blue-500 underline">🔗 View Transaction</a></p>
              </li>
            `).join("")}
          </ul>
        `;
      } else {
        transactionList.innerText = "Error loading transactions.";
      }
    } catch (err) {
      console.error("Transaction history fetch failed:", err);
      transactionList.innerText = "Error loading transactions.";
    }
  }

  await updateBalance();
  await fetchTransactions();

  document.getElementById("logoutBtn").addEventListener("click", () => {
    localStorage.clear();
    window.location.href = "index.html";
  });

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
          recipientPublicKey: recipient,
          amount: amount
        }),
      });

      const data = await response.json();

      if (response.ok) {
        statusDiv.innerText = `✅ ${data.message}`;
        await updateBalance();
        await fetchTransactions(); // Refresh history after sending
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
