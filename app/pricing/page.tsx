
import { Metadata } from "next";
import DynamicPricing from "./DynamicPricing";

export const metadata:Metadata = {
  title: "Tarifs | Votre CV à partir de 1 500 FCFA",
  description: "À partir de seulement 1 500 FCFA, obtenez votre CV ou votre lettre de motivation. Des offres adaptées aux étudiants et aux professionnels pour maximiser vos opportunités."
};

export default function Pricing() {
  return <DynamicPricing />
}

