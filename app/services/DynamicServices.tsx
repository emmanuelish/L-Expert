"use client"

import { BreadcrumbSchema, ServiceSchema } from "@/components/SchemaOrg"
import dynamic from "next/dynamic"

const Features = dynamic(() => import("@/components/Features"), { ssr: false })
const Testimonials = dynamic(() => import("@/components/Testimonials"), { ssr: false })

const DynamicServices = () => {
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

export default DynamicServices