import BlogPage from "@/components/BlogPage"
import { BreadcrumbSchema } from "@/components/SchemaOrg"

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

