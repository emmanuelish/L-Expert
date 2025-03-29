"use client"

import dynamic from "next/dynamic"
import { BreadcrumbSchema, ServiceSchema } from "@/components/SchemaOrg"

const Features = dynamic(() => import("@/components/Features"), { ssr: false })
const Testimonials = dynamic(() => import("@/components/Testimonials"), { ssr: false })

const page = () => {
  // Breadcrumb data for schema
  const breadcrumbItems = [
    { name: "Accueil", url: "https://lexpertpro.com/" },
    { name: "Nos Services", url: "https://lexpertpro.com/services" },
  ]

  return (
    <div>
      <BreadcrumbSchema items={breadcrumbItems} />
      <ServiceSchema />
      <Features />
      <Testimonials />
    </div>
  )
}

export default page

