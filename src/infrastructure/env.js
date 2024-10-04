import dotenv from "dotenv";

dotenv.config();

const env = {
  MONGO_URL: process.env.MONGO_URL,
  JWT_SECRET: process.env.JWT_SECRET || "",
  APPPORT: parseInt(process.env.PORT || ""),
  DB_HOST: process.env.DB_HOST || "",
  DB_PORT: parseInt(process.env.DB_PORT || ""),
  DB_NAME: process.env.DB_NAME || "",
  DB_USER: process.env.DB_USER || "",
  DB_PASS: process.env.DB_PASS || "",
  MAILER_EMAIL: process.env.MAILER_EMAIL || "",
  MAILER_PASS: process.env.MAILER_PASS || "",
  ADMIN_EMAIL: process.env.ADMIN_EMAIL || "",
  ADMIN_PASS: process.env.ADMIN_PASS || "",
  FIREBASE_API_KEY: process.env.FIREBASE_API_KEY || "",
  FIREBASE_AUTH_DOMAIN: process.env.FIREBASE_AUTH_DOMAIN || "",
  FIREBASE_PROJECT_ID: process.env.FIREBASE_PROJECT_ID ,
  FIREBASE_STORAGE_BUCKET: process.env.FIREBASE_STORAGE_BUCKET || "",
  FIREBASE_MESSAGING_SENDER_ID: process.env.FIREBASE_MESSAGING_SENDER_ID || "",
  FIREBASE_APP_ID: process.env.FIREBASE_APP_ID || "",
  FIREBASE_MEASUREMENT_ID: process.env.FIREBASE_MEASUREMENT_ID || "",

};

export default env;
