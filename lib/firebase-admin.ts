import {
  initializeApp,
  getApps,
  cert,
  ServiceAccount,
} from "firebase-admin/app";
import { getFirestore } from "firebase-admin/firestore";
import { getAuth } from "firebase-admin/auth";

// Service account configuration from environment variables
const serviceAccount: ServiceAccount = {
  projectId: process.env.FIREBASE_PROJECT_ID || "lexpert-397f7",
  privateKey: process.env.FIREBASE_PRIVATE_KEY?.replace(/\\n/g, "\n"),
  clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
};

// Check if Firebase Admin is already initialized
const apps = getApps();

// If not initialized, initialize Firebase Admin
if (!apps.length) {
  // Check if running in a Node.js environment (server-side)
  if (typeof process !== "undefined") {
    try {
      // Only initialize if we have the required environment variables
      if (serviceAccount.privateKey && serviceAccount.clientEmail) {
        initializeApp({
          credential: cert(serviceAccount),
        });
      } else {
        console.warn(
          "Firebase Admin SDK not initialized: Missing environment variables"
        );
        console.warn("Required: FIREBASE_PRIVATE_KEY, FIREBASE_CLIENT_EMAIL");
      }
    } catch (error) {
      console.error("Firebase admin initialization error", error);
    }
  } else {
    console.warn(
      "Firebase Admin SDK can only be initialized in a Node.js environment"
    );
  }
}

// Export Firestore and Auth instances
export const adminDb = getFirestore();
export const adminAuth = getAuth();
