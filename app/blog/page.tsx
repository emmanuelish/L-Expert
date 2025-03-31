import BlogPage from "@/components/BlogPage"
import { BreadcrumbSchema } from "@/components/SchemaOrg"
import { Metadata } from "next";

export const metadata:Metadata = {
  title: "Blog | Conseils et Astuces pour Votre CV et votre carrière",
  description: "Boostez votre carrière avec nos conseils d'experts ! Astuces CV et lettres de motivation, stratégies d'entretien et secrets pour réussir dans le monde professionnel."
};


export default function BlogIndexPage() {
  // Breadcrumb data for schema
  const breadcrumbItems = [
    { name: "Accueil", url: "https://lexpertpro.com/" },
    { name: "Blog", url: "https://lexpertpro.com/blog" },
  ]

  return (
    <>
      <BreadcrumbSchema items={breadcrumbItems} />
      <BlogPage />
    </>
  )
}

