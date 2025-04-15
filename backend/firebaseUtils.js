// firebaseUtils.js
import { db, ref, set } from "./config.js";

// Replace invalid Firebase path characters with underscores
export const sanitizeEmail = (email) => {
  return email.replace(/[.#$\[\]]/g, "_");
};

export const saveUserToFirebase = async (email, data) => {
  const safeEmail = sanitizeEmail(email); // ✅ properly sanitized
  await set(ref(db, "wallets/" + safeEmail), data);
};
