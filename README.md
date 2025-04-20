![github-submission-banner](https://github.com/user-attachments/assets/a1493b84-e4e2-456e-a791-ce35ee2bcf2f)

# 🚀 HelpChain

> Transparent Blockchain-Powered Donation Platform on Stellar

---

## 📌 Problem Statement

**Problem Statement 6 – Better Finance for Everyone with Stellar**

---

## 🎯 Objective

HelpChain addresses the lack of transparency in charitable donations by providing a blockchain-based donation platform built on the Stellar Testnet. It serves donors who want assurance that their contributions are reaching verified NGOs and NGOs who need a trustworthy way to receive and track funds.

Through OTP-based wallet creation, real-time transaction history, and blockchain immutability, HelpChain ensures that every fund transfer is visible, traceable, and tamper-proof—restoring donor confidence and promoting financial accountability in the non-profit sector.

---

## 🧠 Team & Approach

### Team Name:  
`PseudoCoders`

### Team Members:  
- Jash Bohare (Team Lead, Backend, Blockchain, Deployment)

     -> GitHub: https://github.com/Jash-Bohare

     -> LinkedIn: https://www.linkedin.com/in/jash-bohare/
  
- Devdeep Chauhan (Frontend)

     -> LinkedIn: https://www.linkedin.com/in/devdeep-chauhan-116350344/
  
- Mili Patel (UI/UX)

     -> LinkedIn: https://www.linkedin.com/in/mili-patel-10a6a635a/

---

### Our Approach:  
- We chose this problem to address the lack of transparency and trust in charitable donations, especially in regions where digital accountability is limited.

- Our goal was to build a platform that uses blockchain for traceability while being simple enough for anyone to use, even without prior crypto knowledge.

- Key challenges we faced included:
a) Seamless Stellar wallet integration with Firebase and user auth
b) Handling secret key security and safe storage
c) Fetching and displaying transaction history with readable names

- One major breakthrough was building an OTP-based wallet system, making it safer and user-friendly.

---

## 🛠️ Tech Stack

### Core Technologies Used:

1) Frontend:
- HTML, CSS, Vanilla JavaScript
- Tailwind CSS (for landing/dashboard pages)
- Toastify.js (for user notifications)
- DOM APIs and localStorage (for user session handling)

2) Backend:
- Node.js, Express.js
- Modular controller structure (wallet, OTP, blockchain logic)

3) Database:
- Firebase Realtime Database (stores users, wallets, OTPs)
- Firebase Admin SDK & Web SDK

4) Blockchain & Web3:
- Stellar SDK (@stellar/stellar-sdk) – for wallet generation, keypair management, transactions, and Horizon access
- Horizon API – to fetch payments and transaction history
- Friendbot API – to fund wallets on Stellar Testnet

5) Email & Auth:
- Nodemailer – for sending OTPs, welcome emails, and transaction alerts
- Gmail SMTP (custom Gmail account used for sending emails)
- OTP System – server-generated 6-digit codes, stored in Firebase

6) APIs Used:
- https://horizon-testnet.stellar.org/... – fetch balances, send funds, view history
- https://friendbot.stellar.org/?addr=... – fund new wallets
- REST endpoints defined in wallet.http (for local API testing)

7) Security:
- Bcrypt.js for hashing passwords
- OTP expiry and email-based verification
- Minimal exposure of secret keys, with UI warnings

8) Hosting & Deployment:
- Currently running on localhost:5000 for backend and local file for frontend
- No public deployment yet — ready to be hosted on Firebase Hosting or Vercel

9) Dev Tools:
- Thunder Client / REST Client (for API testing)
- Visual Studio Code
- Git + GitHub for version control


### Sponsor Technologies Used:
- [ ] **Groq:** _How you used Groq_  
- [ ] **Monad:** _Your blockchain implementation_  
- [ ] **Fluvio:** _Real-time data handling_  
- [ ] **Base:** _AgentKit / OnchainKit / Smart Wallet usage_  
- [ ] **Screenpipe:** _Screen-based analytics or workflows_  
- ✅ **Stellar:** _Payments, identity, or token usage_

---

## ✨ Key Features

1) OTP-Based Wallet Creation: Secure onboarding using email verification and OTP before generating a Stellar wallet.

2) Stellar Wallet Integration: Users get a Stellar Testnet wallet with public/secret key generation using Stellar SDK.

3) Send Funds Instantly: Donors can send XLM directly to NGOs or other users using their public keys with real-time balance updates.

4) Listed NGOs Directory: Donors can browse verified NGOs, view their public keys, and donate directly without intermediaries.

5) Transaction History with Names: View a full history of sent and received transactions, with names instead of raw wallet addresses.

6) Email Notifications: Users receive emails for OTP, wallet creation, welcome messages, and donation confirmations.

7) Responsive UI: Mobile-friendly and clean design using Tailwind CSS and Vanilla JS.

8) Public Key Copy Button: Easily copy your own or an NGO’s public key for quick transfers and sharing..

The platform provides a seamless, secure, and responsive donation experience for both donors and NGOs.

---

![image](https://github.com/user-attachments/assets/2989a5a4-854c-455d-840c-693fe3160a85)
![Screenshot 2025-04-19 211954](https://github.com/user-attachments/assets/cade38f4-93f3-47b7-a33f-8fb123e3f479)
![Screenshot 2025-04-19 212051](https://github.com/user-attachments/assets/cb2a55d7-fc4b-404f-a5a2-c762bc446100)
![Screenshot 2025-04-19 212137](https://github.com/user-attachments/assets/f8b5495c-5581-43e8-914c-46ff647b1817)

---

## 📽️ Demo & Deliverables

- **Demo Video Link:** https://youtu.be/oG7-3UCAxd4?si=SXTB_Rajb0o3wcVm
- **Pitch Deck / PPT Link:** [Paste Google Slides / PDF link here]  

---

## ✅ Tasks & Bonus Checklist

- [ ] **All members of the team completed the mandatory task - Followed at least 2 of our social channels and filled the form** (Details in Participant Manual)  
- [ ] **All members of the team completed Bonus Task 1 - Sharing of Badges and filled the form (2 points)**  (Details in Participant Manual)
- [ ] **All members of the team completed Bonus Task 2 - Signing up for Sprint.dev and filled the form (3 points)**  (Details in Participant Manual)

*(Mark with ✅ if completed)*

---

## 🧪 How to Run the Project

### Requirements:
- Node.js / Python / Docker / etc.
- API Keys (if any)
- .env file setup (if needed)

### Local Setup:
```bash
# Clone the repo
git clone https://github.com/your-team/project-name

# Install dependencies
cd project-name
npm install

# Start development server
npm run dev
```

Provide any backend/frontend split or environment setup notes here.

---

## 🧬 Future Scope

List improvements, extensions, or follow-up features:

- 📈 More integrations  
- 🛡️ Security enhancements  
- 🌐 Localization / broader accessibility  

---

## 📎 Resources / Credits

- APIs or datasets used  
- Open source libraries or tools referenced  
- Acknowledgements  

---

## 🏁 Final Words

Share your hackathon journey — challenges, learnings, fun moments, or shout-outs!

---
