import admin from "firebase-admin";
import dotenv from "dotenv";
import { readFileSync } from "fs";
import path from "path";
import { fileURLToPath } from "url";

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

let firebaseConfig;

if (process.env.FIREBASE_PRIVATE_KEY) {
  firebaseConfig = {
    type: process.env.FIREBASE_TYPE,
    project_id: process.env.FIREBASE_PROJECT_ID,
    private_key: process.env.FIREBASE_PRIVATE_KEY.replace(/\\n/g, "\n"),
    client_email: process.env.FIREBASE_CLIENT_EMAIL,
  };
} else {
  try {
    firebaseConfig = JSON.parse(
      readFileSync(path.resolve(__dirname, "../../firebase-adminsdk.json"), "utf8")
    );
  } catch (error) {
    console.error("Error loading Firebase service account JSON:", error);
    process.exit(1);
  }
}

if (!admin.apps.length) {
  admin.initializeApp({
    credential: admin.credential.cert(firebaseConfig),
  });
  console.log("Firebase Admin SDK initialized successfully");
}

export const adminAuth = admin.auth();
export default admin;
