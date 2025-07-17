import { db } from "@/lib/firebase";
import {
  doc,
  getDoc,
  setDoc,
  updateDoc,
  serverTimestamp,
  collection,
  addDoc,
  query,
  where,
  getDocs,
  orderBy,
} from "firebase/firestore";
import { User, UserRole, JobOffer } from "@/lib/schemas";
import { JOB_OFFER_COLLECTION } from "@/lib/firebase-collections";
import { slugify } from "@/lib/utils";

export async function getUserById(uid: string): Promise<User | null> {
  try {
    const userDoc = await getDoc(doc(db, "users", uid));
    if (userDoc.exists()) {
      return { id: userDoc.id, ...userDoc.data() } as User;
    }
    return null;
  } catch (error) {
    console.error("Error getting user:", error);
    return null;
  }
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

async function generateUniqueSlug(slug: string): Promise<string> {
  const slugQuery = await getDocs(
    query(collection(db, JOB_OFFER_COLLECTION), where("slug", "==", slug))
  );
  return slugQuery.empty ? slug : `${slug}-${Date.now().toString().slice(-4)}`;
}

export async function createJobOffer(
  jobOfferData: Omit<JobOffer, "id" | "date" | "slug">,
  imageFile?: File
): Promise<string> {
  try {
    const imageUrl = jobOfferData.images?.[0] || "";

    // Note: Image upload would need to be handled separately
    // For now, we'll use the existing image URL if provided
    if (imageFile) {
      // TODO: Implement image upload using Firebase Storage
      console.warn("Image upload not implemented yet");
    }

    const slug = slugify(jobOfferData.title);
    const finalSlug = await generateUniqueSlug(slug);

    const articleRef = await addDoc(collection(db, JOB_OFFER_COLLECTION), {
      ...jobOfferData,
      slug: finalSlug,
      image: imageUrl,
      date: serverTimestamp(),
      isPublished: jobOfferData.isPublished || false,
    });

    return articleRef.id;
  } catch (error) {
    console.error("Error creating job offer:", error);
    throw error;
  }
}

export async function saveJobOfferDraft(
  jobOfferData: Partial<JobOffer>
): Promise<string> {
  try {
    const slug = slugify(jobOfferData.title || "Untitled");
    const finalSlug = await generateUniqueSlug(slug);

    const articleRef = await addDoc(collection(db, JOB_OFFER_COLLECTION), {
      ...jobOfferData,
      slug: finalSlug,
      date: serverTimestamp(),
      isPublished: false, // Always false for drafts
      status: "draft",
    });

    return articleRef.id;
  } catch (error) {
    console.error("Error saving job offer draft:", error);
    throw error;
  }
}

export async function publishJobOffer(
  jobOfferData: Partial<JobOffer>
): Promise<string> {
  try {
    const slug = slugify(jobOfferData.title || "Untitled");
    const finalSlug = await generateUniqueSlug(slug);

    const articleRef = await addDoc(collection(db, JOB_OFFER_COLLECTION), {
      ...jobOfferData,
      slug: finalSlug,
      date: serverTimestamp(),
      isPublished: true, // Always true for published offers
      status: "published",
    });

    return articleRef.id;
  } catch (error) {
    console.error("Error publishing job offer:", error);
    throw error;
  }
}

export async function getAllJobOffers(): Promise<JobOffer[]> {
  try {
    console.log("Fetching job offers from Firestore...");
    // Remove orderBy to avoid possible index/timestamp issues
    const jobOffersQuery = query(collection(db, JOB_OFFER_COLLECTION));
    console.log("Query created, executing...");
    const querySnapshot = await getDocs(jobOffersQuery);
    console.log(
      "Query executed, found " + querySnapshot.docs.length + " documents"
    );
    const jobOffers = querySnapshot.docs.map((doc) => {
      const data = doc.data();
      console.log("Document data:", doc.id, data);
      return {
        id: doc.id,
        ...data,
      };
    }) as JobOffer[];
    console.log("Processed job offers:", jobOffers);
    return jobOffers;
  } catch (error) {
    console.error("Error getting job offers:", error);
    throw error;
  }
}

export async function getJobOffersByStatus(
  status: "draft" | "published" | "archived"
): Promise<JobOffer[]> {
  try {
    const jobOffersQuery = query(
      collection(db, JOB_OFFER_COLLECTION),
      where("status", "==", status),
      orderBy("createdAt", "desc")
    );
    const querySnapshot = await getDocs(jobOffersQuery);

    return querySnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    })) as JobOffer[];
  } catch (error) {
    console.error("Error getting job offers by status:", error);
    throw error;
  }
}

export async function updateJobOfferStatus(
  jobId: string,
  status: "draft" | "published" | "archived"
): Promise<void> {
  try {
    const jobRef = doc(db, JOB_OFFER_COLLECTION, jobId);
    await updateDoc(jobRef, {
      status,
      isPublished: status === "published",
      updatedAt: serverTimestamp(),
    });
  } catch (error) {
    console.error("Error updating job offer status:", error);
    throw error;
  }
}

export async function deleteJobOffer(jobId: string): Promise<void> {
  try {
    const jobRef = doc(db, JOB_OFFER_COLLECTION, jobId);
    await updateDoc(jobRef, {
      status: "archived",
      updatedAt: serverTimestamp(),
    });
  } catch (error) {
    console.error("Error deleting job offer:", error);
    throw error;
  }
}

export async function duplicateJobOffer(jobId: string): Promise<string> {
  try {
    const jobDoc = await getDoc(doc(db, JOB_OFFER_COLLECTION, jobId));
    if (!jobDoc.exists()) {
      throw new Error("Job offer not found");
    }

    const jobData = jobDoc.data() as JobOffer;
    const newJobData = {
      ...jobData,
      title: `${jobData.title} (Copie)`,
      status: "draft" as const,
      isPublished: false,
      createdAt: serverTimestamp(),
      updatedAt: serverTimestamp(),
    };

    const newJobRef = await addDoc(
      collection(db, JOB_OFFER_COLLECTION),
      newJobData
    );
    return newJobRef.id;
  } catch (error) {
    console.error("Error duplicating job offer:", error);
    throw error;
  }
}
