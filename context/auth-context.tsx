"use client";

import type React from "react";
import { createContext, useContext, useEffect, useState } from "react";
import {
  type User as FirebaseUser,
  signOut as firebaseSignOut,
  sendPasswordResetEmail,
  updateEmail,
  updatePassword,
  reauthenticateWithCredential,
  EmailAuthProvider,
  onAuthStateChanged,
} from "firebase/auth";
import { UserRole, type User } from "../lib/schemas";
import { auth } from "@/lib/firebase";
import {
  getUserById,
  createUser,
  updateUserProfile as updateUserProfileService,
  updateUserEmail as updateUserEmailService,
} from "@/services/firebaseServerServices";

interface AuthContextType {
  user: User | null;
  firebaseUser: FirebaseUser | null;
  isAuth: boolean;
  isFetching: boolean;
  isAdmin: boolean;
  role: UserRole | string | null;
  signOut: () => Promise<void>;
  resetPassword: (email: string) => Promise<void>;
  updateUserProfile: (userData: Partial<User>) => Promise<void>;
  updateUserEmail: (newEmail: string, password: string) => Promise<void>;
  updateUserPassword: (
    currentPassword: string,
    newPassword: string
  ) => Promise<void>;
}

const AuthContext = createContext<AuthContextType>({
  user: null,
  firebaseUser: null,
  isAuth: false,
  isFetching: true,
  isAdmin: false,
  role: null,
  signOut: async () => {},
  resetPassword: async () => {},
  updateUserProfile: async () => {},
  updateUserEmail: async () => {},
  updateUserPassword: async () => {},
});

export function AuthContextProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [firebaseUser, setFirebaseUser] = useState<FirebaseUser | null>(null);
  const [user, setUser] = useState<User | null>(null);
  const [isFetching, setIsFetching] = useState(true);
  const [role, setRole] = useState<UserRole | string | null>(null);
  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    // Skip Firebase initialization if auth is not available (SSR or preview environment)
    if (!auth) {
      setIsFetching(false);
      return () => {};
    }

    const unsubscribe = onAuthStateChanged(auth, async (fbUser) => {
      console.log("Auth state changed:", fbUser?.email);
      setFirebaseUser(fbUser);
      setIsFetching(true);

      if (fbUser) {
        try {
          console.log("Fetching user data for:", fbUser.uid);
          let userData = await getUserById(fbUser.uid);

          if (userData) {
            console.log("User data found:", userData);
            setUser(userData);
            setRole((userData.role as UserRole) || UserRole.USER);
            setIsAdmin(
              userData.role === UserRole.ADMIN ||
                userData.role === UserRole.MANAGER
            );
          } else {
            console.log("User document doesn't exist, creating one...");
            // User document doesn't exist, create a basic user profile
            userData = await createUser(fbUser.uid, fbUser.email!);
            setUser(userData);
            setRole(UserRole.USER);
            setIsAdmin(false);
          }
        } catch (error: unknown) {
          console.error("Error fetching user data:", error);

          // Handle permissions error specifically
          if (
            error instanceof Error &&
            error.message.includes("permission-denied")
          ) {
            console.log(
              "Permission denied to access user data. This might be due to Firestore security rules."
            );
            // Create a basic user object without database access
            const basicUserData = {
              id: fbUser.uid,
              email: fbUser.email,
              role: UserRole.USER,
              createdAt: new Date(),
              updatedAt: new Date(),
            };
            setUser(basicUserData as User);
            setRole(UserRole.USER);
            setIsAdmin(false);
          } else {
            setUser(null);
            setRole(null);
            setIsAdmin(false);
          }
        } finally {
          setIsFetching(false);
        }
      } else {
        console.log("No Firebase user, clearing state");
        setUser(null);
        setRole(null);
        setIsAdmin(false);
        setIsFetching(false);
      }
    });

    return () => unsubscribe();
  }, []);

  const signOut = async () => {
    if (!auth) return;

    try {
      await firebaseSignOut(auth);
      setFirebaseUser(null);
      setUser(null);
      setRole(null);
      setIsAdmin(false);
    } catch (error) {
      console.error("Error signing out:", error);
      throw error;
    }
  };

  const resetPassword = async (email: string) => {
    if (!auth) throw new Error("Authentication not initialized");

    try {
      await sendPasswordResetEmail(auth, email);
    } catch (error) {
      console.error("Error sending password reset email:", error);
      throw error;
    }
  };

  const updateUserProfile = async (userData: Partial<User>) => {
    if (!firebaseUser || !user) throw new Error("User not authenticated");

    try {
      await updateUserProfileService(firebaseUser.uid, userData);
      // Update local state
      setUser((prev) => {
        if (!prev) return null;
        return { ...prev, ...userData };
      });
    } catch (error) {
      console.error("Error updating user profile:", error);
      throw error;
    }
  };

  const updateUserEmail = async (newEmail: string, password: string) => {
    if (!firebaseUser) throw new Error("User not authenticated");

    try {
      // Re-authenticate user
      const credential = EmailAuthProvider.credential(
        firebaseUser.email!,
        password
      );
      await reauthenticateWithCredential(firebaseUser, credential);

      // Update email in Firebase Auth
      await updateEmail(firebaseUser, newEmail);

      // Update email in Firestore
      await updateUserEmailService(firebaseUser.uid, newEmail);

      // Update local state
      setUser((prev) => {
        if (!prev) return null;
        return { ...prev, email: newEmail };
      });
    } catch (error) {
      console.error("Error updating user email:", error);
      throw error;
    }
  };

  const updateUserPassword = async (
    currentPassword: string,
    newPassword: string
  ) => {
    if (!firebaseUser) throw new Error("User not authenticated");

    try {
      // Re-authenticate user
      const credential = EmailAuthProvider.credential(
        firebaseUser.email!,
        currentPassword
      );
      await reauthenticateWithCredential(firebaseUser, credential);

      // Update password in Firebase Auth
      await updatePassword(firebaseUser, newPassword);
    } catch (error) {
      console.error("Error updating user password:", error);
      throw error;
    }
  };

  const value = {
    user,
    firebaseUser,
    isAuth: !!firebaseUser,
    isFetching,
    isAdmin,
    role,
    signOut,
    resetPassword,
    updateUserProfile,
    updateUserEmail,
    updateUserPassword,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthContextProvider");
  }
  return context;
}
