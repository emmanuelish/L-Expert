import {
  doc,
  getDoc,
  setDoc,
  updateDoc,
  serverTimestamp,
} from "firebase/firestore";
import { User, UserRole } from "@/lib/schemas";
import { db } from "@/lib/firebase";

export async function getUserById(uid: string): Promise<User | null> {
  const userDoc = await getDoc(doc(db, "users", uid));
  if (userDoc.exists()) {
    return { id: userDoc.id, ...userDoc.data() } as User;
  }
  return null;
}

export async function createUser(
  uid: string,
  email: string,
  extraData?: Partial<User>
): Promise<User> {
  const basicUserData = {
    id: uid,
    email,
    role: UserRole.USER,
    createdAt: serverTimestamp(),
    updatedAt: serverTimestamp(),
    ...extraData,
  };
  await setDoc(doc(db, "users", uid), basicUserData);
  return basicUserData as User;
}

export async function updateUserProfile(
  uid: string,
  userData: Partial<User>
): Promise<void> {
  const userRef = doc(db, "users", uid);
  await updateDoc(userRef, {
    ...userData,
    updatedAt: serverTimestamp(),
  });
}

export async function updateUserEmail(
  uid: string,
  newEmail: string
): Promise<void> {
  const userRef = doc(db, "users", uid);
  await updateDoc(userRef, {
    email: newEmail,
    updatedAt: serverTimestamp(),
  });
}
