// Using type imports to avoid runtime dependency
import type { Article, WebSite, Organization, BreadcrumbList, WithContext } from "schema-dts"

// Define interfaces for custom properties not in schema-dts
interface CustomSearchAction {
  "@type": "SearchAction"
  target: string
  "query-input": string
}

interface CustomWebSite extends Omit<WebSite, "potentialAction"> {
  potentialAction: CustomSearchAction
}

// Website Schema
export const WebsiteSchema = () => {
  // Create the schema with proper type handling for hyphenated properties
  const websiteSchema: WithContext<CustomWebSite> = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: "L'Expert - CV et lettres de motivation professionnels",
    url: "https://lexpertpro.com",
    description: "Service de rédaction professionnelle de CV et lettres de motivation, livrés en moins de 24 heures",
    potentialAction: {
      "@type": "SearchAction",
      target: "https://lexpertpro.com/search?q={search_term_string}",
      "query-input": "required name=search_term_string",
    },
  }

  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteSchema) }} />
}

// Organization Schema
export const OrganizationSchema = () => {
  const organizationSchema: WithContext<Organization> = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: "L'Expert",
    url: "https://lexpertpro.com",
    logo: "https://lexpertpro.com/logo.png",
    sameAs: ["https://www.instagram.com/lexpertpro", "https://www.tiktok.com/@lexpertpro", "https://wa.me/22891989046"],
    contactPoint: {
      "@type": "ContactPoint",
      telephone: "+228 91 98 90 46",
      contactType: "customer service",
      email: "contact@lexpert.com",
    },
  } as WithContext<Organization>

  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }} />
}

// Article Schema
export const ArticleSchema = ({
  title,
  description,
  image,
  authorName,
  datePublished,
  dateModified = null,
  category,
  url,
}: {
  title: string
  description: string
  image: string
  authorName: string
  datePublished: string
  dateModified?: string | null
  category: string
  url: string
}) => {
  const articleSchema: WithContext<Article> = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: title,
    description: description,
    image: image,
    author: {
      "@type": "Person",
      name: authorName,
    },
    publisher: {
      "@type": "Organization",
      name: "L'Expert",
      logo: {
        "@type": "ImageObject",
        url: "https://lexpertpro.com/logo.png",
      },
    },
    datePublished: datePublished,
    dateModified: dateModified || datePublished,
    articleSection: category,
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": url,
    },
  } as WithContext<Article>

  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }} />
}

// Breadcrumb Schema
export const BreadcrumbSchema = ({
  items,
}: {
  items: Array<{ name: string; url: string }>
}) => {
  const breadcrumbSchema: WithContext<BreadcrumbList> = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: item.url,
    })),
  } as WithContext<BreadcrumbList>

  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
}

// Service Schema
export const ServiceSchema = () => {
  // Using Record<string, unknown> for custom schema types
  const serviceSchema: Record<string, unknown> = {
    "@context": "https://schema.org",
    "@type": "Service",
    name: "Rédaction de CV et lettres de motivation",
    description:
      "Service professionnel de rédaction de CV et lettres de motivation personnalisés, livrés en moins de 24 heures",
    provider: {
      "@type": "Organization",
      name: "L'Expert",
      url: "https://lexpertpro.com",
    },
    serviceType: ["Rédaction de CV", "Rédaction de lettres de motivation", "Coaching carrière"],
    offers: [
      {
        "@type": "Offer",
        name: "CV Étudiant",
        price: "1500",
        priceCurrency: "XOF",
        description:
          "Création d'un Curriculum Vitae professionnel adapté aux étudiants entrant sur le marché du travail",
      },
      {
        "@type": "Offer",
        name: "CV Professionnel",
        price: "3500",
        priceCurrency: "XOF",
        description: "Création d'un CV professionnel pour les professionnels expérimentés",
      },
      {
        "@type": "Offer",
        name: "Pack CV + Lettre de motivation Étudiant",
        price: "2500",
        priceCurrency: "XOF",
        description: "Dossier de candidature complet avec CV et lettre de motivation à un prix réduit",
      },
      {
        "@type": "Offer",
        name: "Pack CV + Lettre de motivation Professionnel",
        price: "6500",
        priceCurrency: "XOF",
        description: "Dossier de candidature complet avec CV et lettre de motivation à un prix réduit",
      },
    ],
  }

  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceSchema) }} />
}

// FAQ Schema
export const FAQSchema = () => {
  // Using Record<string, unknown> for custom schema types
  const faqSchema: Record<string, unknown> = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: [
      {
        "@type": "Question",
        name: "Combien de temps faut-il pour recevoir mon CV ?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Nous livrons votre CV personnalisé en moins de 24 heures après réception de vos informations.",
        },
      },
      {
        "@type": "Question",
        name: "Quels sont vos tarifs ?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Nos tarifs commencent à 1.500 FCFA pour un CV étudiant et 3.500 FCFA pour un CV professionnel. Nous proposons également des packs incluant CV et lettre de motivation à des tarifs avantageux.",
        },
      },
      {
        "@type": "Question",
        name: "Comment se déroule le processus de commande ?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Le processus est simple : vous nous contactez via WhatsApp, nous recueillons vos informations, nos experts rédigent votre CV, et vous le recevez en moins de 24 heures.",
        },
      },
    ],
  }

  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
}

// This component can be added to your layout.tsx to implement site-wide schemas
export const SiteSchemas = () => {
  return (
    <>
      <WebsiteSchema />
      <OrganizationSchema />
    </>
  )
}

