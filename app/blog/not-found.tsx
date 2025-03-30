import Link from "next/link"

export default function NotFound() {
  return (
    <div
      className="flex flex-col items-center justify-center min-h-[70vh] px-4 text-center"
      role="alert"
      aria-labelledby="not-found-title"
    >
      <h2 id="not-found-title" className="text-3xl font-bold mb-4">
        Article introuvable
      </h2>
      <p className="text-gray-600 mb-8">
        Désolé, l&apos;article que vous recherchez n&apos;existe pas ou a été déplacé.
      </p>
      <Link
        href="/blog"
        className="px-6 py-3 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
        aria-label="Retourner à la page du blog"
      >
        Retour au blog
      </Link>
    </div>
  )
}

