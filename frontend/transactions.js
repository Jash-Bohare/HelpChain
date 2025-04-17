document.addEventListener("DOMContentLoaded", async () => {
    const user = JSON.parse(localStorage.getItem("user"));
    if (!user) return (window.location.href = "index.html");
  
    const transactionList = document.getElementById("transactionList");
  
    async function fetchTransactions() {
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
                <li class="border p-4 rounded bg-gray-50 shadow-sm">
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
  
    await fetchTransactions();
  
    document.getElementById("logoutBtn").addEventListener("click", () => {
      localStorage.clear();
      window.location.href = "index.html";
    });
  });
  