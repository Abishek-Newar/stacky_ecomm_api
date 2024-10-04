import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";
import mongoose from "mongoose";
import env from "../../infrastructure/env.js";

// Firebase connection
const firebaseConfig = {
  apiKey: env.FIREBASE_API_KEY,
  authDomain: env.FIREBASE_AUTH_DOMAIN,
  projectId: env.FIREBASE_PROJECT_ID,
  storageBucket: env.FIREBASE_STORAGE_BUCKET,
  messagingSenderId: env.FIREBASE_MESSAGING_SENDER_ID, 
  appId: env.FIREBASE_APP_ID,
  measurementId: env.FIREBASE_MEASUREMENT_ID
};

const app = initializeApp(firebaseConfig);
const storage = getStorage(app);

// MongoDB connection using mongoose
export const dbconnection = async() => {
  const options = {
    serverSelectionTimeoutMS: 20000,
    connectTimeoutMS: 60000, 
  };
  await mongoose
    .connect(env.MONGO_URL, options)
    .then((res) => {
      console.log(`Mongo DB Connected Successfully. ` + env.MONGO_URL);
    })
    .catch((err) => {
      console.error(`Something went wrong in Mongo DB Connection`, err);
    });

  mongoose.set("debug", (collectionName, method, query, doc) => {
    console.log(`${collectionName}.${method}`, JSON.stringify(query), doc);
  });

  const db = mongoose.connection;
};

export { storage };

