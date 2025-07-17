import { Timestamp } from "firebase/firestore";

export enum UserRole {
  USER = "user",
  ADMIN = "admin",
  MANAGER = "manager",
}

export interface User {
  id: string;
  email: string;
  firstName?: string;
  lastName?: string;
  username?: string;
  phoneNumber?: string;
  profileImageUrl?: string;
  role?: UserRole | string;
  isVerified?: boolean;
  disabled?: boolean;
  isTwoFactorEnabled?: boolean;
  createdAt?: Date | string | Timestamp;
  updatedAt?: Date | string | Timestamp;
}

export interface JobOffer {
  isPublished: boolean;
  id: string;
  slug: string;
  title: string;
  subtitle: string;
  company: string;
  location: string;
  startDate?: string;
  deadline?: string;
  workplace?: string;
  salary: string;
  type: "CDI" | "CDD" | "Stage" | "Freelance";
  introduction: string;
  missions: string;
  profile: string;
  paragraphs: string[];
  bulletPoints: string[];
  paragraphTitles: string[];
  bannerImage?: string;
  images: string[];
  requirements: string[];
  benefits: string[];
  createdAt: Date;
  updatedAt: Date;
  status: "draft" | "published" | "archived";
}
