import { Metadata } from "next";
import DynamicHowItWorks from "./DynamicHowItWorks";

export const metadata: Metadata = {
  title: "Comment Ça Marche | Votre CV en moins de 24h",
  description: "Découvrez comment L'Expert vous accompagne pas à pas pour créer un CV percutant, une lettre de motivation convaincante et décrocher l'emploi de vos rêves."
};


export default function HowItWorks() {
  return <DynamicHowItWorks />
}

