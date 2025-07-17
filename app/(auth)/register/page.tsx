"use client";

import type React from "react";

import { useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { Eye, EyeOff, User, Mail, Lock, ArrowRight } from "lucide-react";
import { useAuth } from "@/context/auth-context";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "@/lib/firebase";
import { createUser as createUserInFirestore } from "@/services/firebaseClientServices";
import { useRouter } from "next/navigation";
import { getUserById } from "@/services/firebaseClientServices";

export default function RegisterPage() {
  const { isFetching } = useAuth();
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    username: "",
    phoneNumber: "",
    email: "",
    password: "",
    confirmPassword: "",
    acceptTerms: false,
  });
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);
    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        formData.email,
        formData.password
      );
      try {
        await createUserInFirestore(userCredential.user.uid, formData.email, {
          firstName: formData.firstName,
          lastName: formData.lastName,
          role: "user",
          isVerified: false,
          disabled: false,
          isTwoFactorEnabled: false,
        });
        // Fetch the user from Firestore to check the role
        const userDoc = await getUserById(userCredential.user.uid);
        if (userDoc?.role === "admin") {
          router.push("/admin/dashboard");
        } else {
          router.push("/");
        }
      } catch (firestoreError) {
        setError(
          "Votre compte a été créé, mais une erreur est survenue lors de l'enregistrement de vos informations. Veuillez contacter le support."
        );
        console.error("Firestore user creation error:", firestoreError);
        setIsLoading(false);
        return;
      }
      // The context will update automatically on auth state change
    } catch (error: unknown) {
      let message =
        "Une erreur est survenue lors de l'inscription. Veuillez réessayer.";
      if (error instanceof Error) message = error.message;
      setError(message);
      console.error(error);
    }
    setIsLoading(false);
  };

  const handleInputChange = (field: string, value: string | boolean) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  if (isFetching) {
    return <div className="text-center py-10">Chargement...</div>;
  }

  return (
    <>
      <div className="text-center mb-8">
        <h1 className="text-2xl font-bold text-gray-800 mb-2">
          Créer un compte
        </h1>
        <p className="text-gray-600">
          Rejoignez L&apos;Expert pour booster votre carrière
        </p>
      </div>
      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Name Fields */}
        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label
              htmlFor="firstName"
              className="text-sm font-medium text-gray-700"
            >
              Prénom
            </Label>
            <div className="relative">
              <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
              <Input
                id="firstName"
                type="text"
                placeholder="Jean"
                value={formData.firstName}
                onChange={(e) => handleInputChange("firstName", e.target.value)}
                className="pl-10 h-12 border-gray-200 focus:border-purple-500 focus:ring-purple-500"
                required
              />
            </div>
          </div>
          <div className="space-y-2">
            <Label
              htmlFor="lastName"
              className="text-sm font-medium text-gray-700"
            >
              Nom
            </Label>
            <div className="relative">
              <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
              <Input
                id="lastName"
                type="text"
                placeholder="Dupont"
                value={formData.lastName}
                onChange={(e) => handleInputChange("lastName", e.target.value)}
                className="pl-10 h-12 border-gray-200 focus:border-purple-500 focus:ring-purple-500"
                required
              />
            </div>
          </div>
        </div>
        {/* Email */}
        <div className="space-y-2">
          <Label htmlFor="email" className="text-sm font-medium text-gray-700">
            Adresse email
          </Label>
          <div className="relative">
            <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
            <Input
              id="email"
              type="email"
              placeholder="jean.dupont@email.com"
              value={formData.email}
              onChange={(e) => handleInputChange("email", e.target.value)}
              className="pl-10 h-12 border-gray-200 focus:border-purple-500 focus:ring-purple-500"
              required
            />
          </div>
        </div>
        {/* Password */}
        <div className="space-y-2">
          <Label
            htmlFor="password"
            className="text-sm font-medium text-gray-700"
          >
            Mot de passe
          </Label>
          <div className="relative">
            <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
            <Input
              id="password"
              type={showPassword ? "text" : "password"}
              placeholder="••••••••"
              value={formData.password}
              onChange={(e) => handleInputChange("password", e.target.value)}
              className="pl-10 pr-10 h-12 border-gray-200 focus:border-purple-500 focus:ring-purple-500"
              required
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
            >
              {showPassword ? (
                <EyeOff className="h-4 w-4" />
              ) : (
                <Eye className="h-4 w-4" />
              )}
            </button>
          </div>
        </div>
        {/* Confirm Password */}
        <div className="space-y-2">
          <Label
            htmlFor="confirmPassword"
            className="text-sm font-medium text-gray-700"
          >
            Confirmer le mot de passe
          </Label>
          <div className="relative">
            <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
            <Input
              id="confirmPassword"
              type={showConfirmPassword ? "text" : "password"}
              placeholder="••••••••"
              value={formData.confirmPassword}
              onChange={(e) =>
                handleInputChange("confirmPassword", e.target.value)
              }
              className="pl-10 pr-10 h-12 border-gray-200 focus:border-purple-500 focus:ring-purple-500"
              required
            />
            <button
              type="button"
              onClick={() => setShowConfirmPassword(!showConfirmPassword)}
              className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
            >
              {showConfirmPassword ? (
                <EyeOff className="h-4 w-4" />
              ) : (
                <Eye className="h-4 w-4" />
              )}
            </button>
          </div>
        </div>
        {/* Terms Checkbox */}
        <div className="flex items-start space-x-3">
          <Checkbox
            id="terms"
            checked={formData.acceptTerms}
            onCheckedChange={(checked) =>
              handleInputChange("acceptTerms", checked as boolean)
            }
            className="mt-1"
          />
          <Label
            htmlFor="terms"
            className="text-sm text-gray-600 leading-relaxed"
          >
            J&apos;accepte les{" "}
            <Link
              href="/terms"
              className="text-purple-600 hover:text-purple-700 underline"
            >
              conditions d&apos;utilisation
            </Link>{" "}
            et la{" "}
            <Link
              href="/privacy"
              className="text-purple-600 hover:text-purple-700 underline"
            >
              politique de confidentialité
            </Link>
          </Label>
        </div>
        {/* Submit Button */}
        <Button
          type="submit"
          disabled={isLoading || !formData.acceptTerms}
          className="w-full h-12 bg-purple-600 hover:bg-purple-700 text-white font-semibold rounded-lg transition-all duration-200 disabled:opacity-50"
        >
          {isLoading ? (
            <div className="flex items-center space-x-2">
              <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
              <span>Création en cours...</span>
            </div>
          ) : (
            <div className="flex items-center space-x-2">
              <span>Créer mon compte</span>
              <ArrowRight className="h-4 w-4" />
            </div>
          )}
        </Button>
        {error && (
          <div className="text-red-600 text-sm text-center mt-2">{error}</div>
        )}
        {/* Login Link */}
        <div className="text-center">
          <p className="text-sm text-gray-600">
            Vous avez déjà un compte ?{" "}
            <Link
              href="/login"
              className="text-purple-600 hover:text-purple-700 font-medium"
            >
              Se connecter
            </Link>
          </p>
        </div>
      </form>
    </>
  );
}
