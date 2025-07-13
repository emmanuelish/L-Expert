import { initializeApp, getApps, getApp, FirebaseApp } from "firebase/app";
import { getAuth, Auth } from "firebase/auth";
import { getFirestore, Firestore } from "firebase/firestore";
import { getStorage, FirebaseStorage } from "firebase/storage";
import { Analytics, getAnalytics } from "firebase/analytics";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAvVs9PeQR2mxPAiusi7MAhcGu55rnvm6M",
  authDomain: "lexpert-397f7.firebaseapp.com",
  projectId: "lexpert-397f7",
  storageBucket: "lexpert-397f7.firebasestorage.app",
  messagingSenderId: "246220375638",
  appId: "1:246220375638:web:aa483701f005369a225df7",
  measurementId: "G-64V6H6YEYS",
};

// Initialize Firebase
let app: FirebaseApp;
let auth: Auth;
let db: Firestore;
let storage: FirebaseStorage;
let analytics: Analytics;

try {
  // Check if we're in a browser environment
  if (typeof window !== "undefined") {
    app = !getApps().length ? initializeApp(firebaseConfig) : getApp();
    auth = getAuth(app);
    db = getFirestore(app);
    storage = getStorage(app);
    analytics = getAnalytics(app);
  }
} catch (error) {
  console.error("Firebase initialization error:", error);
}

export { app, auth, db, storage, analytics };
