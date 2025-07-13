"use client";

import type React from "react";

import { useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Mail, ArrowRight, ArrowLeft, CheckCircle } from "lucide-react";
import { useAuth } from "@/context/auth-context";

export default function ForgotPasswordPage() {
  const { resetPassword, isFetching } = useAuth();
  const [isLoading, setIsLoading] = useState(false);
  const [isEmailSent, setIsEmailSent] = useState(false);
  const [email, setEmail] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      await resetPassword(email);
      setIsEmailSent(true);
    } catch (error) {
      // Handle error (show message, etc.)
      console.error(error);
    }
    setIsLoading(false);
  };

  if (isFetching) {
    return <div className="text-center py-10">Chargement...</div>;
  }

  if (isEmailSent) {
    return (
      <>
        <div className="text-center mb-8">
          <h1 className="text-2xl font-bold text-gray-800 mb-2">
            Email envoyé !
          </h1>
          <p className="text-gray-600">Vérifiez votre boîte de réception</p>
        </div>
        <div className="text-center space-y-6">
          <div className="flex justify-center">
            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center">
              <CheckCircle className="w-8 h-8 text-green-600" />
            </div>
          </div>
          <div className="space-y-2">
            <h3 className="text-lg font-semibold text-gray-800">
              Instructions envoyées
            </h3>
            <p className="text-gray-600 text-sm leading-relaxed">
              Nous avons envoyé un lien de réinitialisation à{" "}
              <span className="font-medium text-gray-800">{email}</span>
            </p>
          </div>
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
            <p className="text-sm text-blue-800">
              <strong>Conseil :</strong> Vérifiez également votre dossier spam
              si vous ne voyez pas l&apos;email dans votre boîte de réception.
            </p>
          </div>
          <div className="space-y-3">
            <Button
              onClick={() => setIsEmailSent(false)}
              variant="outline"
              className="w-full h-12 border-gray-200 hover:bg-gray-50"
            >
              Renvoyer l&apos;email
            </Button>
            <Link href="/login">
              <Button
                variant="ghost"
                className="w-full h-12 text-purple-600 hover:text-purple-700 hover:bg-purple-50"
              >
                <ArrowLeft className="w-4 h-4 mr-2" />
                Retour à la connexion
              </Button>
            </Link>
          </div>
        </div>
      </>
    );
  }

  return (
    <>
      <div className="text-center mb-8">
        <h1 className="text-2xl font-bold text-gray-800 mb-2">
          Mot de passe oublié ?
        </h1>
        <p className="text-gray-600">Pas de problème, nous allons vous aider</p>
      </div>
      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="text-center space-y-2">
          <p className="text-sm text-gray-600 leading-relaxed">
            Entrez votre adresse email et nous vous enverrons un lien pour
            réinitialiser votre mot de passe.
          </p>
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
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="pl-10 h-12 border-gray-200 focus:border-purple-500 focus:ring-purple-500"
              required
            />
          </div>
        </div>
        {/* Submit Button */}
        <Button
          type="submit"
          disabled={isLoading}
          className="w-full h-12 bg-purple-600 hover:bg-purple-700 text-white font-semibold rounded-lg transition-all duration-200"
        >
          {isLoading ? (
            <div className="flex items-center space-x-2">
              <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
              <span>Envoi en cours...</span>
            </div>
          ) : (
            <div className="flex items-center space-x-2">
              <span>Envoyer le lien</span>
              <ArrowRight className="h-4 w-4" />
            </div>
          )}
        </Button>
        {/* Back to Login */}
        <div className="text-center">
          <Link
            href="/login"
            className="inline-flex items-center text-sm text-purple-600 hover:text-purple-700 font-medium"
          >
            <ArrowLeft className="w-4 h-4 mr-1" />
            Retour à la connexion
          </Link>
        </div>
      </form>
    </>
  );
}
