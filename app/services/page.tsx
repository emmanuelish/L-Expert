import { Metadata } from "next";
import DynamicServices from "./DynamicServices";

export const metadata:Metadata = {
  title: "Nos Services de rédaction de CV et lettre de motivation",
  description: "Découvrez nos services professionnels pour optimiser votre CV, rédiger une lettre de motivation percutante et maximiser vos chances d'emploi."
};

export default function Services() {
  return <DynamicServices />
}