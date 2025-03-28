import Image from "next/image"
import Link from "next/link"
import { notFound } from "next/navigation"
import { articles, featuredArticle } from "@/lib/data/articles"
import { slugify, getArticleBySlug } from "@/lib/utils"

interface PageProps {
  params: {
    slug: string
  }
}

export function generateStaticParams() {
  // Make sure to include the featured article along with all other articles
  return [featuredArticle, ...articles].map((article) => ({
    slug: slugify(article.title),
  }))
}

export default async function ArticlePage({ params }: PageProps) {
  const { slug } = params
  const article = getArticleBySlug([featuredArticle, ...articles], slug)

  if (!article) {
    notFound()
  }

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
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

      {/* Article Header */}
      <div className="mb-8">
        <h1 className="text-3xl md:text-4xl font-bold mb-4">{article.title}</h1>
        <div className="flex items-center text-gray-500 mb-6">
          <span className="font-medium">{article.author}</span>
          <span className="mx-2">•</span>
          <span>{article.date}</span>
          <span className="mx-2">•</span>
          <span className="bg-blue-100 text-blue-600 text-xs px-2 py-1 rounded">{article.category}</span>
        </div>
      </div>

      {/* Featured Image */}
      <div className="relative h-[300px] md:h-[500px] mb-8 rounded-lg overflow-hidden">
        <Image src={article.image || "/placeholder.svg"} alt={article.alt} fill priority className="object-cover" />
      </div>

      {/* Article Content */}
      <div className="prose prose-lg max-w-none">
        <p>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed euismod, nisl vel ultricies lacinia, nisl nisl
          aliquam nisl, eu aliquam nisl nisl eu nisl. Sed euismod, nisl vel ultricies lacinia, nisl nisl aliquam nisl,
          eu aliquam nisl nisl eu nisl.
        </p>
        <p>
          Sed euismod, nisl vel ultricies lacinia, nisl nisl aliquam nisl, eu aliquam nisl nisl eu nisl. Sed euismod,
          nisl vel ultricies lacinia, nisl nisl aliquam nisl, eu aliquam nisl nisl eu nisl. Sed euismod, nisl vel
          ultricies lacinia, nisl nisl aliquam nisl, eu aliquam nisl nisl eu nisl.
        </p>
        <h2>Les points clés à retenir</h2>
        <ul>
          <li>Sed euismod, nisl vel ultricies lacinia, nisl nisl aliquam nisl, eu aliquam nisl nisl eu nisl.</li>
          <li>Sed euismod, nisl vel ultricies lacinia, nisl nisl aliquam nisl, eu aliquam nisl nisl eu nisl.</li>
          <li>Sed euismod, nisl vel ultricies lacinia, nisl nisl aliquam nisl, eu aliquam nisl nisl eu nisl.</li>
        </ul>
        <p>
          Sed euismod, nisl vel ultricies lacinia, nisl nisl aliquam nisl, eu aliquam nisl nisl eu nisl. Sed euismod,
          nisl vel ultricies lacinia, nisl nisl aliquam nisl, eu aliquam nisl nisl eu nisl.
        </p>
        <blockquote>
          Sed euismod, nisl vel ultricies lacinia, nisl nisl aliquam nisl, eu aliquam nisl nisl eu nisl. Sed euismod,
          nisl vel ultricies lacinia, nisl nisl aliquam nisl, eu aliquam nisl nisl eu nisl.
        </blockquote>
        <p>
          Sed euismod, nisl vel ultricies lacinia, nisl nisl aliquam nisl, eu aliquam nisl nisl eu nisl. Sed euismod,
          nisl vel ultricies lacinia, nisl nisl aliquam nisl, eu aliquam nisl nisl eu nisl.
        </p>
      </div>

      {/* Author Bio */}
      <div className="mt-12 p-6 bg-gray-50 rounded-lg">
        <h3 className="text-lg font-semibold mb-2">À propos de l&apos;auteur</h3>
        <p className="text-gray-600">
          {article.author} est un expert en {article.category.toLowerCase()}. Avec plusieurs années d&apos;expérience dans le
          domaine, il partage régulièrement ses connaissances et conseils pour aider les professionnels à développer
          leur carrière.
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
                      alt={relatedArticle.alt}
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
  )
}

