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

     a) GitHub: https://github.com/Jash-Bohare

     b) LinkedIn: https://www.linkedin.com/in/jash-bohare/
  
- Devdeep Chauhan (Frontend)

     a) LinkedIn: https://www.linkedin.com/in/devdeep-chauhan-116350344/
  
- Mili Patel (UI/UX)

     a) LinkedIn: https://www.linkedin.com/in/mili-patel-10a6a635a/



### Your Approach:  
We chose this problem because traditional donation platforms often lack transparency, making it difficult for donors to trust where their money is going. We wanted to solve this using Stellar’s decentralized and low-cost infrastructure.

The main challenges included integrating Stellar with Firebase Realtime Database, handling key security responsibly, and ensuring users could easily understand and interact with blockchain tech—especially those unfamiliar with wallets or XLM.

One key breakthrough was implementing OTP-based wallet creation, which made onboarding smoother. We also pivoted from building multi-chain support to focusing entirely on Stellar, which offered a faster, simpler, and more reliable testnet experience during the hackathon. 

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


### Sponsor Technologies Used (if any):
- [ ] **Groq:** _How you used Groq_  
- [ ] **Monad:** _Your blockchain implementation_  
- [ ] **Fluvio:** _Real-time data handling_  
- [ ] **Base:** _AgentKit / OnchainKit / Smart Wallet usage_  
- [ ] **Screenpipe:** _Screen-based analytics or workflows_  
- [✅] **Stellar:** _Payments, identity, or token usage_


## ✨ Key Features

1) User Authentication & Wallet Creation: Secure sign-up with OTP verification and Stellar wallet creation (public/private keys).

2) Backend Integration: Built with Express, Firebase, and Stellar SDK for wallet management, transactions, and data storage.

3) Email Notifications: Sends OTP and transaction updates to users.

4) Transaction Management: Users can send/receive XLM and view their transaction history.

5) Mobile Responsiveness: Optimized UI for mobile devices using Tailwind CSS.

6) Security: Password hashing, secret key protection, and log-out functionality for user security.

7) User-Friendly Features: Copy public key with a button, toast alerts for feedback, and role-based display for donors and NGOs.

The platform provides a seamless, secure, and responsive donation experience for both donors and NGOs.



![image](https://github.com/user-attachments/assets/2989a5a4-854c-455d-840c-693fe3160a85)
![image](https://github.com/user-attachments/assets/10b0d0b7-2f75-456a-8655-cced9c16a024)
![image](https://github.com/user-attachments/assets/d6ca7efd-8a16-4c24-a202-3d5a02645ab6)



---

## 📽️ Demo & Deliverables

- **Demo Video Link:** [Paste YouTube or Loom link here]  
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
