import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: `${process.env.FIREBASE_API_KEY}`,
  authDomain: "patientpal-15ec4.firebaseapp.com",
  projectId: "patientpal-15ec4",
  storageBucket: "patientpal-15ec4.appspot.com",
  messagingSenderId: "627294425107",
  appId: "1:627294425107:web:af22c8940d0883350f2fe6",
  measurementId: "G-VXN1CQP7HD",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
if (app.name && typeof window !== "undefined") {
  const analytics = getAnalytics(app);
}

export default app;
