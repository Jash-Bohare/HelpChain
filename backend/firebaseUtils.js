// firebaseUtils.js
import { db, ref, set } from "./config.js";

export const saveUserToFirebase = async (email, data) => {
  const sanitizedEmail = email.replace(".", "_"); // Firebase path-safe
  await set(ref(db, "wallets/" + sanitizedEmail), data);
};
