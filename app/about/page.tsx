"use client"

import dynamic from "next/dynamic"
import { BreadcrumbSchema } from "@/components/SchemaOrg"

const About = dynamic(() => import("@/components/About"), { ssr: false })

const page = () => {
  // Breadcrumb data for schema
  const breadcrumbItems = [
    { name: "Accueil", url: "https://lexpertpro.com/" },
    { name: "À propos", url: "https://lexpertpro.com/about" },
  ]

  return (
    <div>
      <BreadcrumbSchema items={breadcrumbItems} />
      <About />
    </div>
  )
}

export default page

