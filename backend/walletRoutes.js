import express from "express";
import { sendOtp, verifyOtpAndCreateWallet, loginUser } from "./walletController.js";

const router = express.Router();

router.post("/send-otp", sendOtp);
router.post("/verify-otp", verifyOtpAndCreateWallet);
router.post("/login", loginUser);

export default router;
