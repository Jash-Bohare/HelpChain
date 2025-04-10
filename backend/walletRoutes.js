// walletRoutes.js

import express from "express";
import { createWallet, loginUser } from "./walletController.js";

const router = express.Router();

// Route to create a new wallet
router.post("/create-wallet", createWallet);

// Route to log in user using email
router.post("/login", loginUser);

export default router;
