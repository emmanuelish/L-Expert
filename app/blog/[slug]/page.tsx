import Image from "next/image"
import Link from "next/link"
import { notFound } from "next/navigation"
import type { Metadata } from "next"
import { articles, featuredArticle } from "@/lib/data/articles"
import { slugify, getArticleBySlug } from "@/lib/utils"

type PageParams = {
  params: Promise<{ slug: string }>
}

// Generate metadata for the page
export async function generateMetadata({ params }: PageParams): Promise<Metadata> {
  // Resolve the slug from params
  const { slug } = await params

  // Find the article by slug
  const article = getArticleBySlug([featuredArticle, ...articles], slug)

  // If article not found, return basic metadata
  if (!article) {
    return {
      title: "Article introuvable",
      description: "L'article que vous recherchez n'existe pas ou a été déplacé.",
    }
  }

  // Return metadata based on the article
  return {
    title: article.title,
    description: `Article par ${article.author} sur ${article.category}`,
    openGraph: {
      title: article.title,
      description: `Article par ${article.author} sur ${article.category}`,
      images: [
        {
          url: article.image,
          width: 1200,
          height: 630,
          alt: article.alt,
        },
      ],
      type: "article",
      publishedTime: article.date,
      authors: [article.author],
      tags: [article.category],
    },
  }
}

export function generateStaticParams() {
  // Make sure to include the featured article along with all other articles
  return [featuredArticle, ...articles].map((article) => ({
    slug: slugify(article.title),
  }))
}

export default async function ArticlePage({ params }: PageParams) {
  // Await the params to get the slug
  const { slug } = await params

  // Find the article by slug
  const article = getArticleBySlug([featuredArticle, ...articles], slug)

  // If article not found, show 404 page
  if (!article) {
    notFound()
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      {/* Breadcrumb */}
      <div className="flex items-center text-sm text-gray-500 mb-8">
        <Link href="/" className="hover:text-blue-500">
          Accueil
        </Link>
        <span className="mx-2">•</span>
        <Link href="/blog" className="hover:text-blue-500">
          Blog
        </Link>
        <span className="mx-2">•</span>
        <Link href={`/blog?category=${slugify(article.category)}`} className="hover:text-blue-500">
          {article.category}
        </Link>
      </div>

      {/* Two-column layout container */}
      <div className="flex flex-col lg:flex-row lg:gap-8">
        {/* Left column - Main content (2/3 width on desktop, full width on mobile) */}
        <div className="w-full lg:w-2/3">
          {/* Article Header */}
          <div className="mb-8">
            {article.title && <h1 className="text-3xl md:text-4xl font-bold mb-4">{article.title}</h1>}
            <div className="flex items-center text-gray-500 mb-6">
              {article.author && <span className="font-medium">{article.author}</span>}
              {article.author && article.date && <span className="mx-2">•</span>}
              {article.date && <span>{article.date}</span>}
              {article.category && (
                <>
                  <span className="mx-2">•</span>
                  <span className="bg-blue-100 text-blue-600 text-xs px-2 py-1 rounded">{article.category}</span>
                </>
              )}
            </div>
          </div>

          {/* Featured Image */}
          {article.image && (
            <div className="relative h-[300px] md:h-[500px] mb-8 rounded-lg overflow-hidden">
              <Image
                src={article.image || "/placeholder.svg"}
                alt={article.alt || ""}
                fill
                priority
                className="object-cover"
              />
            </div>
          )}

          {/* Article Content - Dynamic rendering based on content structure */}
          <div className="prose prose-lg max-w-none">
            {article.content ? (
              // Render structured content if available
              article.content.map((section, index) => (
                <div key={index} className="mb-8">
                  {/* Render subtitle */}
                  {section.sousTitre && <h2 className="text-2xl font-bold mb-4">{section.sousTitre}</h2>}

                  {/* Render paragraph */}
                  {section.paragraphe && <p className="mb-4">{section.paragraphe}</p>}

                  {/* Render bullet points if available */}
                  {section.bulletPoints && section.bulletPoints.length > 0 && (
                    <ul className="list-disc pl-6 mb-4">
                      {section.bulletPoints.map((point, i) => (
                        <li key={i} className="mb-2">
                          {point}
                        </li>
                      ))}
                    </ul>
                  )}

                  {/* Render image if available */}
                  {section.image && (
                    <div className="my-6">
                      <div className="relative h-[250px] md:h-[400px] rounded-lg overflow-hidden">
                        <Image
                          src={section.image || "/placeholder.svg"}
                          alt={section.imageAlt || "Image illustrative"}
                          fill
                          className="object-cover"
                        />
                      </div>
                      {section.caption && (
                        <p className="text-sm text-gray-500 text-center mt-2 italic">{section.caption}</p>
                      )}
                    </div>
                  )}

                  {/* Render citation/quote */}
                  {section.citation && (
                    <blockquote className="border-l-4 border-blue-500 pl-4 italic my-6">
                      <p className="text-gray-700">{section.citation.text}</p>
                      {section.citation.author && (
                        <footer className="text-sm text-gray-500 mt-2">— {section.citation.author}</footer>
                      )}
                    </blockquote>
                  )}

                  {/* Render conclusion */}
                  {section.conclusion && (
                    <div className="bg-gray-50 p-6 rounded-lg border-l-4 border-blue-500">
                      <h3 className="text-xl font-bold mb-3">Conclusion</h3>
                      <p>{section.conclusion}</p>
                    </div>
                  )}
                </div>
              ))
            ) : (
              // Fallback content if no structured content is available
              <div>
                <p className="mb-4">
                  Cet article est en cours de rédaction. Revenez bientôt pour découvrir son contenu complet.
                </p>
                <p>En attendant, n&apos;hésitez pas à consulter nos autres articles sur {article.category}.</p>
              </div>
            )}
          </div>

          {/* Author Bio */}
          <div className="mt-12 p-6 bg-gray-50 rounded-lg">
            <h3 className="text-lg font-semibold mb-2">À propos de l&apos;auteur</h3>
            <p className="text-gray-600">
              {article.author} est un expert en {article.category.toLowerCase()}. Avec plusieurs années d&apos;expérience
              dans le domaine, il partage régulièrement ses connaissances et conseils pour aider les professionnels à
              développer leur carrière.
            </p>
          </div>

          {/* Related Articles */}
          <div className="mt-12">
            <h3 className="text-xl font-bold mb-6">Articles similaires</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {articles
                .filter(
                  (relatedArticle) => relatedArticle.category === article.category && relatedArticle.id !== article.id,
                )
                .slice(0, 3)
                .map((relatedArticle) => (
                  <Link key={relatedArticle.id} href={`/blog/${slugify(relatedArticle.title)}`} className="group">
                    <div className="border border-gray-200 rounded-lg overflow-hidden h-full">
                      <div className="relative h-40 overflow-hidden">
                        <Image
                          src={relatedArticle.image || "/placeholder.svg"}
                          alt={relatedArticle.alt || ""}
                          fill
                          className="object-cover group-hover:scale-105 transition-transform duration-300"
                        />
                      </div>
                      <div className="p-4">
                        <h4 className="font-medium text-lg mb-2 group-hover:text-blue-500 transition-colors">
                          {relatedArticle.title}
                        </h4>
                        <div className="text-sm text-gray-500">
                          <span>{relatedArticle.date}</span>
                        </div>
                      </div>
                    </div>
                  </Link>
                ))}
            </div>
          </div>
        </div>

        {/* Right column - Ad space (1/3 width on desktop, full width on mobile) */}
        <div className="w-full lg:w-1/3 mt-12 lg:mt-0">
          <div className="sticky top-8 self-start">
            {/* Ad Banner for L'Expert */}
            <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white p-6 rounded-lg shadow-lg border border-blue-400">
              <div className="text-center mb-4">
                <h3 className="text-xl font-bold uppercase tracking-wide">L&apos;EXPERT</h3>
                <div className="h-0.5 w-16 bg-white mx-auto my-2"></div>
                <p className="text-sm font-medium text-blue-100">Services professionnels</p>
              </div>

              <h4 className="text-2xl font-bold text-center mb-4">Votre CV mérite l&apos;excellence</h4>

              <div className="space-y-3 mb-6">
                <div className="flex items-start">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5 text-blue-200 mr-2 mt-0.5 flex-shrink-0"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path
                      fillRule="evenodd"
                      d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                      clipRule="evenodd"
                    />
                  </svg>
                  <p className="text-sm">CV personnalisés par des experts</p>
                </div>
                <div className="flex items-start">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5 text-blue-200 mr-2 mt-0.5 flex-shrink-0"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path
                      fillRule="evenodd"
                      d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                      clipRule="evenodd"
                    />
                  </svg>
                  <p className="text-sm">Lettres de motivation percutantes</p>
                </div>
                <div className="flex items-start">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5 text-blue-200 mr-2 mt-0.5 flex-shrink-0"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path
                      fillRule="evenodd"
                      d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                      clipRule="evenodd"
                    />
                  </svg>
                  <p className="text-sm">Coaching pour entretiens d&apos;embauche</p>
                </div>
              </div>

              <div className="bg-white/20 p-3 rounded mb-6">
                <p className="text-center text-sm font-bold">Augmentez vos chances d&apos;obtenir l&apos;emploi de vos rêves !</p>
              </div>

              <a
                href="https://lexpertpro.com"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block w-full py-3 bg-white text-blue-700 font-bold rounded-md hover:bg-blue-50 transition-colors shadow-md"
              >
                Découvrir nos services
              </a>

              <p className="text-xs text-center mt-4 text-blue-100">
                Plus de 10 000 professionnels nous font confiance
              </p>
            </div>

            {/* Second smaller ad */}
            <div className="mt-6 bg-gray-100 p-5 rounded-lg border border-gray-200 shadow-sm">
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center">
                  <div className="bg-blue-600 h-4 w-4 rounded-full mr-2"></div>
                  <p className="font-semibold text-gray-800">Offre spéciale</p>
                </div>
                <span className="text-xs bg-red-500 text-white px-2 py-1 rounded-full">-15%</span>
              </div>
              <p className="text-sm text-gray-600 mb-4">
                Profitez de 15% de réduction sur notre pack &quot;CV + Lettre de motivation&quot;
              </p>
              <a
                href="https://lexpertpro.com/promo"
                target="_blank"
                rel="noopener noreferrer"
                className="block text-center text-sm py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors"
              >
                J&apos;en profite
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

