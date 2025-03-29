import DynamicSections from "@/components/DynamicSections"
import { ServiceSchema, FAQSchema } from "@/components/SchemaOrg"

export const revalidate = 3600 // revalidate every hour

export default function Home() {
  return (
    <main className="min-h-screen">
      {/* Schema.org structured data for services and FAQ */}
      <ServiceSchema />
      <FAQSchema />

      <DynamicSections />
    </main>
  )
}