"use client"

import { BreadcrumbSchema } from "@/components/SchemaOrg"
import dynamic from "next/dynamic"

const About = dynamic(() => import("@/components/About"), { ssr: false })

const DynamicAbout = () => {
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

export default DynamicAbout