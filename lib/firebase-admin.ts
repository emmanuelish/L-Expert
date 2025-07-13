import {
  initializeApp,
  getApps,
  cert,
  ServiceAccount,
} from "firebase-admin/app";
import { getFirestore } from "firebase-admin/firestore";
import { getAuth } from "firebase-admin/auth";
import { getStorage } from "firebase-admin/storage";
import serviceAccount from "./firebase-admin-service-key.json";

// Check if Firebase Admin is already initialized
const apps = getApps();

// If not initialized, initialize Firebase Admin
if (!apps.length) {
  // Check if running in a Node.js environment (server-side)
  if (typeof process !== "undefined") {
    try {
      initializeApp({
        credential: cert(serviceAccount as ServiceAccount),
      });
    } catch (error) {
      console.error("Firebase admin initialization error", error);
    }
  } else {
    console.warn(
      "Firebase Admin SDK can only be initialized in a Node.js environment"
    );
  }
}

// Export Firestore, Auth, and Storage instances
export const adminDb = getFirestore();
export const adminAuth = getAuth();
export const adminStorage = getStorage();
