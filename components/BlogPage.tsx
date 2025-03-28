"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { categories, articles, featuredArticle, type Article } from "@/lib/data/articles"
import { slugify } from "@/lib/utils"

// Fisher-Yates shuffle algorithm to randomize articles
const shuffleArray = (array: Article[]): Article[] => {
  const shuffled = [...array]
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))
    ;[shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]]
  }
  return shuffled
}

export default function BlogPage() {
  // État pour suivre la catégorie sélectionnée
  const [selectedCategory, setSelectedCategory] = useState<string>("Tous les articles")

  // État pour le nombre d'articles à afficher
  const [visiblePosts, setVisiblePosts] = useState<number>(12)

  // État pour les articles mélangés
  const [shuffledArticles, setShuffledArticles] = useState<Article[]>([])

  // Mélanger les articles au chargement initial
  useEffect(() => {
    setShuffledArticles(shuffleArray(articles))
  }, [])

  // Filtrer les articles en fonction de la catégorie sélectionnée
  const filteredPosts =
    selectedCategory === "Tous les articles"
      ? shuffledArticles
      : shuffledArticles.filter((post) => post.category === selectedCategory)

  // Gérer le chargement de plus d'articles
  const handleLoadMore = () => {
    setVisiblePosts((prev) => prev + 12)
  }

  // Mélanger à nouveau les articles lorsque la catégorie change
  const handleCategoryChange = (category: string) => {
    if (category !== selectedCategory) {
      setSelectedCategory(category)
      if (category === "Tous les articles") {
        setShuffledArticles(shuffleArray(articles))
      }
      setVisiblePosts(12)
    }
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      {/* Header */}
      <header className="py-4 text-center">
        <h1 className="text-2xl font-bold">Titre de la Page</h1>
        <div className="flex justify-center space-x-4 text-sm text-gray-500 mt-1">
          <Link href="/" className="hover:text-blue-500">
            Accueil
          </Link>
          <span>•</span>
          <Link href="/blog" className="hover:text-blue-500">
            Blog
          </Link>
        </div>
        <div className="border-t border-blue-100 mt-4"></div>
      </header>

      {/* Featured Post */}
      <div className="my-8 relative overflow-hidden rounded-lg">
        <div className="relative h-[300px] md:h-[400px]">
          <Link href={`/blog/${slugify(featuredArticle.title)}`} className="block h-full">
            <Image
              src={featuredArticle.image || "/placeholder.svg"}
              alt={featuredArticle.alt}
              fill
              priority
              className="object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent"></div>
            <div className="absolute bottom-0 left-0 p-6 text-white">
              <span className="bg-blue-500 text-white text-xs px-2 py-1 rounded">{featuredArticle.category}</span>
              <h2 className="text-2xl md:text-3xl font-bold mt-2 mb-3">{featuredArticle.title}</h2>
              <div className="flex items-center">
                <div className="text-sm">
                  <span className="font-medium">{featuredArticle.author}</span>
                  <span className="mx-2">•</span>
                  <span>{featuredArticle.date}</span>
                </div>
              </div>
            </div>
          </Link>
        </div>
      </div>

      {/* Filtres de catégories */}
      <div className="flex flex-wrap gap-2 mb-8">
        {categories.map((category) => (
          <button
            key={category}
            onClick={() => handleCategoryChange(category)}
            className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
              selectedCategory === category ? "bg-teal-600 text-white" : "bg-gray-100 text-gray-800 hover:bg-gray-200"
            }`}
          >
            {category}
          </button>
        ))}
      </div>

      {/* Blog Posts Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
        {filteredPosts.slice(0, visiblePosts).map((post) => (
          <div
            key={post.id}
            className="border border-gray-200 rounded-lg overflow-hidden shadow-sm h-full flex flex-col"
          >
            <div className="p-4 flex flex-col flex-grow">
              <Link
                href={`/blog/${slugify(post.title)}`}
                className="block relative h-48 mb-4 rounded-lg overflow-hidden"
              >
                <Image
                  src={post.image || "/placeholder.svg"}
                  alt={post.alt}
                  fill
                  priority
                  className="object-cover hover:scale-105 transition-transform duration-300"
                />
              </Link>
              <div className="mb-3">
                <span className="bg-blue-100 text-blue-600 text-xs px-2 py-1 rounded">{post.category}</span>
              </div>
              <h3 className="font-bold text-xl mb-4 line-clamp-2">
                <Link href={`/blog/${slugify(post.title)}`} className="hover:text-blue-500">
                  {post.title}
                </Link>
              </h3>
              <div className="text-sm text-gray-500 mb-4">
                <span>{post.author}</span>
                <span className="mx-2">•</span>
                <span>{post.date}</span>
              </div>
              <div className="mt-auto">
                <Button asChild variant="outline" className="w-full">
                  <Link href={`/blog/${slugify(post.title)}`}>Lire</Link>
                </Button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Load More Button */}
      {filteredPosts.length > visiblePosts && (
        <div className="flex justify-center mb-12">
          <Button variant="outline" className="text-gray-600 border-gray-300" onClick={handleLoadMore}>
            Voir Plus
          </Button>
        </div>
      )}
    </div>
  )
}

