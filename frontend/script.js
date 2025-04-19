document.addEventListener("DOMContentLoaded", () => {
  const sendOtpBtn = document.getElementById("sendOtpBtn");
  const verifyOtpBtn = document.getElementById("verifyOtpBtn");
  const finalSignUpBtn = document.getElementById("finalSignUpBtn");
  const copyKeysBtn = document.getElementById("copyKeysBtn");

  const otpInput = document.getElementById("otp");
  const otpStatus = document.getElementById("otpStatus");
  const keysDiv = document.getElementById("keys");

  let userData = {};
  let otpVerified = false;
  let keysGenerated = false;

  const showToast = (msg, color = "#333") => {
    Toastify({
      text: msg,
      duration: 3000,
      style: { background: color },
    }).showToast();
  };

  // Step 1️ Send OTP
  sendOtpBtn.addEventListener("click", async () => {
    const email = document.getElementById("email").value.trim();
    if (!email) {
      showToast("Please enter your email.", "#e74c3c");
      return;
    }

    try {
      const res = await fetch("http://localhost:5000/api/send-otp", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });

      const data = await res.json();

      if (res.ok) {
        showToast(data.message, "#2ecc71");

        sendOtpBtn.style.setProperty("display", "none", "important");
        otpInput.style.display = "inline-block";
        verifyOtpBtn.style.display = "inline-block";
      } else {
        showToast(`${data.error}`, "#e74c3c");
      }
    } catch (err) {
      showToast(`Network error: ${err.message}`, "#e67e22");
    }
  });

  // Step 2️ Verify OTP and Show Wallet
  verifyOtpBtn.addEventListener("click", async () => {
    const name = document.getElementById("name").value.trim();
    const email = document.getElementById("email").value.trim();
    const password = document.getElementById("password").value.trim();
    const role = document.getElementById("role").value;
    const otp = otpInput.value.trim();

    if (!name || !email || !password || !role || !otp) {
      showToast("Please fill all fields and enter OTP.", "#e74c3c");
      return;
    }

    userData = { name, email, password, role, otp };

    try {
      const res = await fetch("http://localhost:5000/api/verify-otp", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(userData),
      });

      const data = await res.json();

      if (res.ok) {
        otpVerified = true;
        keysGenerated = true;
        userData.publicKey = data.publicKey;
        userData.secretKey = data.secretKey;

        otpStatus.innerText = "OTP verified!";
        showToast("OTP verified and wallet created!", "#2ecc71");

        keysDiv.innerText = `🔑 Public Key: ${userData.publicKey}\n🗝️ Secret Key: ${userData.secretKey}`;
        keysDiv.style.whiteSpace = "pre-wrap";
        keysDiv.style.display = "block";

        finalSignUpBtn.style.display = "inline-block";
        copyKeysBtn.style.display = "inline-block";
      } else {
        otpStatus.innerText = "OTP verification failed.";
        showToast("OTP verification failed. Please try again.", "#e74c3c");
      }
    } catch (err) {
      otpStatus.innerText = `Network error: ${err.message}`;
      showToast(`Network error: ${err.message}`, "#e67e22");
    }
  });

  // Step 3️ Final Sign Up
  finalSignUpBtn.addEventListener("click", () => {
    if (!otpVerified || !keysGenerated) {
      showToast("Complete all steps before signing up.", "#e74c3c");
      return;
    }

    showToast("Sign Up Successful! Redirecting...", "#27ae60");

    // Store user data in local storage
    localStorage.setItem("user", JSON.stringify({
      name: userData.name,
      email: userData.email,
      role: userData.role,
      publicKey: userData.publicKey,
    }));

    setTimeout(() => {
      window.location.href = "landing.html?status=signup-success";
    }, 1500);
  });

  // Step 4️ Copy Keys
  copyKeysBtn.addEventListener("click", () => {
    if (!userData.publicKey || !userData.secretKey) {
      showToast("Keys not generated yet.", "#e74c3c");
      return;
    }

    const keysText = `Public Key: ${userData.publicKey}\nSecret Key: ${userData.secretKey}`;
    const tempTextArea = document.createElement("textarea");
    tempTextArea.value = keysText;
    document.body.appendChild(tempTextArea);
    tempTextArea.select();
    document.execCommand("copy");
    document.body.removeChild(tempTextArea);

    showToast("Keys copied to clipboard!", "#3498db");
  });
});