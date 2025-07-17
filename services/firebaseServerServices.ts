import { adminDb } from "@/lib/firebase-admin";
import {
  doc,
  getDoc,
  setDoc,
  updateDoc,
  serverTimestamp,
} from "firebase/firestore";
import { Timestamp } from "firebase-admin/firestore";
import { User, UserRole, JobOffer } from "@/lib/schemas";
import { db } from "@/lib/firebase";
import { JOB_OFFER_COLLECTION } from "@/lib/firebase-collections";
import { slugify } from "@/lib/utils";

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

async function uploadImage(ImageFile: unknown) {
  console.log("ImageFile", ImageFile);
}

// async function uploadImage(imageFile: File): Promise<string> {
//   try {
//     const storage = getStorage();
//     const bucket = storage.bucket();
//     const timestamp = Date.now();
//     const uniqueFileName = `${timestamp}_${imageFile.name}`;
//     const fileBuffer = await imageFile.arrayBuffer();
//
//     const file = bucket.file(uniqueFileName);
//     await file.save(Buffer.from(fileBuffer), {
//       metadata: {
//         contentType: imageFile.type,
//       },
//     });
//
//     await file.makePublic();
//     return `https://storage.googleapis.com/${bucket.name}/${uniqueFileName}`;
//   } catch (error) {
//     console.error("Error uploading image:", error);
//     throw error;
//   }
// }

async function generateUniqueSlug(slug: string): Promise<string> {
  const slugQuery = await adminDb
    .collection(JOB_OFFER_COLLECTION)
    .where("slug", "==", slug)
    .get();

  return slugQuery.empty ? slug : `${slug}-${Date.now().toString().slice(-4)}`;
}

export async function createJobOffer(
  jobOfferData: Omit<JobOffer, "id" | "date" | "slug">,
  imageFile?: File
): Promise<string> {
  try {
    // let imageUrl = jobOfferData.image || "";
    let imageUrl = undefined;
    if (imageFile) {
      imageUrl = await uploadImage(imageFile);
    }

    const slug = slugify(jobOfferData.title);
    const finalSlug = await generateUniqueSlug(slug);

    const articleRef = await adminDb.collection(JOB_OFFER_COLLECTION).add({
      ...jobOfferData,
      slug: finalSlug,
      image: imageUrl,
      date: Timestamp.now(),
      isPublished: jobOfferData.isPublished || false,
    });

    return articleRef.id;
  } catch (error) {
    console.error("Error creating article:", error);
    throw error;
  }
}
