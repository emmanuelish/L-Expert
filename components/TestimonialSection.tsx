"use client"

import { useState } from "react"
import Image from "next/image"
import { ChevronLeft, ChevronRight } from "lucide-react"

const testimonials = [
  {
    id: 1,
    name: "Thomas Martin",
    role: "Ingénieur Senior",
    rating: 4,
    title: "CV parfaitement adapté à mon secteur",
    content:
      "L'Expert a su mettre en valeur mon parcours d'ingénieur et mes compétences techniques. J'ai reçu mon CV en moins de 24h et j'ai décroché plusieurs entretiens dans la semaine qui a suivi.",
    image: "/placeholder.svg",
  },
  {
    id: 2,
    name: "Marie Laurent",
    role: "Jeune Diplômée",
    rating: 5,
    title: "Un accompagnement exceptionnel",
    content:
      "En tant que jeune diplômée, je ne savais pas comment mettre en avant mes stages et projets. L'Expert m'a aidée à créer un CV qui a vraiment retenu l'attention des recruteurs. J'ai trouvé mon premier emploi en moins d'un mois !",
    image: "/placeholder.svg",
  },
  {
    id: 3,
    name: "Philippe Dubois",
    role: "Directeur Commercial",
    rating: 4,
    title: "Service rapide et professionnel",
    content:
      "La qualité du CV et de la lettre de motivation était impressionnante. Tous mes accomplissements commerciaux ont été parfaitement mis en valeur. Je recommande vivement leurs services.",
    image: "/placeholder.svg",
  },
  {
    id: 4,
    name: "Sophie Moreau",
    role: "Reconversion Professionnelle",
    rating: 5,
    title: "Exactement ce dont j'avais besoin",
    content:
      "Pour ma reconversion professionnelle, j'avais besoin d'un CV qui mette en avant mes compétences transférables. Le résultat était parfait et livré en 24h comme promis.",
    image: "/placeholder.svg",
  },
]

export default function TestimonialSection() {
  const [activeSlide, setActiveSlide] = useState(0)
  const totalSlides = testimonials.length

  const nextSlide = () => {
    setActiveSlide((prev) => (prev + 1) % totalSlides)
  }

  const prevSlide = () => {
    setActiveSlide((prev) => (prev - 1 + totalSlides) % totalSlides)
  }

  const getVisibleTestimonials = () => {
    const current = activeSlide
    const prev = (current - 1 + totalSlides) % totalSlides
    const next = (current + 1) % totalSlides
    return [prev, current, next]
  }

  return (
    <section className="bg-white py-16">
      <div className="container mx-auto px-4">
        <h2 className="text-4xl font-medium text-gray-700 text-center mb-16">What Our Clients Say About Us</h2>

        <div className="relative">
          {/* Navigation Buttons */}
          <button
            onClick={prevSlide}
            className="absolute left-0 top-1/2 -translate-y-1/2 z-10 p-2 text-gray-600 hover:text-gray-800"
          >
            <ChevronLeft className="w-8 h-8" />
          </button>
          <button
            onClick={nextSlide}
            className="absolute right-0 top-1/2 -translate-y-1/2 z-10 p-2 text-gray-600 hover:text-gray-800"
          >
            <ChevronRight className="w-8 h-8" />
          </button>

          {/* Testimonials */}
          <div className="flex justify-center items-center gap-4 px-12">
            {getVisibleTestimonials().map((index, i) => (
              <div
                key={testimonials[index].id}
                className={`transition-all duration-300 ${
                  i === 1 ? "w-[650px] opacity-100 scale-110 z-10" : "w-[350px] opacity-70 scale-90 z-0"
                }`}
              >
                <div className={`bg-white rounded-xl p-8 shadow-lg ${i === 1 ? "transform translate-y-[-10px]" : ""}`}>
                  <div className="flex items-center gap-4 mb-4">
                    <div className="relative w-16 h-16">
                      <Image
                        src={testimonials[index].image || "/placeholder.svg"}
                        alt={testimonials[index].name}
                        fill
                        className="rounded-full object-cover"
                      />
                    </div>
                    <div>
                      <h3 className="font-medium text-xl">{testimonials[index].name}</h3>
                      <p className="text-gray-600">{testimonials[index].role}</p>
                    </div>
                  </div>
                  <div className="flex gap-1 mb-4">
                    {[...Array(5)].map((_, starIndex) => (
                      <svg
                        key={starIndex}
                        className={`w-5 h-5 ${
                          starIndex < testimonials[index].rating
                            ? "text-yellow-400 fill-yellow-400"
                            : "text-gray-300 fill-gray-300"
                        }`}
                        viewBox="0 0 20 20"
                      >
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                      </svg>
                    ))}
                  </div>
                  <h4 className="font-medium text-xl mb-4">{testimonials[index].title}</h4>
                  <p className="text-gray-600">{testimonials[index].content}</p>
                </div>
              </div>
            ))}
          </div>

          {/* Pagination dots */}
          <div className="flex justify-center gap-2 mt-8">
            {testimonials.map((_, index) => (
              <button
                key={index}
                onClick={() => setActiveSlide(index)}
                className={`w-2 h-2 rounded-full transition-colors ${
                  activeSlide === index ? "bg-[#FF1493]" : "bg-gray-300"
                }`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

