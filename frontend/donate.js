document.addEventListener("DOMContentLoaded", async () => {
    const user = JSON.parse(localStorage.getItem("user"));
    if (!user) return (window.location.href = "index.html");
  
    const urlParams = new URLSearchParams(window.location.search);
    const ngoPublicKey = urlParams.get("ngoPublicKey");
    if (!ngoPublicKey) return (window.location.href = "landing.html");
  
    // Display NGO info
    const ngoNameElement = document.getElementById("ngoName");
    try {
      const response = await fetch(`http://localhost:5000/api/get-ngo/${ngoPublicKey}`);
      const data = await response.json();
      
      if (response.ok) {
        ngoNameElement.innerText = data.ngo.name;
      } else {
        ngoNameElement.innerText = "Error loading NGO info.";
      }
    } catch (err) {
      console.error("Error fetching NGO info:", err);
      ngoNameElement.innerText = "Error loading NGO info.";
    }
  
    // Donation form submission
    document.getElementById("donationForm").addEventListener("submit", async (e) => {
      e.preventDefault();
  
      const donationAmount = document.getElementById("donationAmount").value.trim();
      const statusDiv = document.getElementById("donationStatus");
  
      if (!donationAmount) {
        statusDiv.innerText = "❌ Please enter a donation amount.";
        return;
      }
  
      try {
        const response = await fetch("http://localhost:5000/api/send-funds", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            senderEmail: user.email,
            senderSecret: user.secretKey,
            recipientPublicKey: ngoPublicKey,
            amount: donationAmount
          }),
        });
  
        const data = await response.json();
  
        if (response.ok) {
          statusDiv.innerText = `✅ ${data.message}`;
        } else {
          statusDiv.innerText = `❌ ${data.error}`;
        }
      } catch (err) {
        console.error("❌ Donation failed:", err);
        statusDiv.innerText = "❌ Something went wrong. Try again.";
      }
    });
  });
  