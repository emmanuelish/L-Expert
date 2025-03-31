import { Metadata } from "next"
import DynamicAbout from "./DynamicAbout"

export const metadata:Metadata = {
  title: "À propos de L'Expert | Rédacteur de CV professionnels",
  description: "L'Expert vous accompagne vers l'emploi idéal avec des CV et lettres de motivation sur mesure. Service rapide, résultats garantis et livraison en 24h."
}

export default function About() {
  return <DynamicAbout />
}

