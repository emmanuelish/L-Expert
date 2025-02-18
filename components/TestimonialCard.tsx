import type React from "react"
import Image from "next/image"
import { Star } from "lucide-react"

interface TestimonialCardProps {
  imageSrc: string
  name: string
  role: string
  rating: number
  testimonial: string
  size: "small" | "medium" | "large"
}

const TestimonialCard: React.FC<TestimonialCardProps> = ({ imageSrc, name, role, rating, testimonial, size }) => {
  const sizeClasses = {
    small: "px-6 pb-6 text-sm",
    medium: "px-8 pb-8 text-base",
    large: "px-10 pb-10 text-lg",
  }

  const imageClasses = {
    small: "w-16 h-16",
    medium: "w-20 h-20",
    large: "w-24 h-24",
  }

  const nameClasses = {
    small: "text-lg",
    medium: "text-xl",
    large: "text-2xl",
  }

  return (
    <div className={`flex flex-col items-center ${sizeClasses[size]} text-center bg-white rounded-2xl shadow-lg`}>
      <div className={`relative ${imageClasses[size]} mb-4`}>
        <Image
          src={imageSrc || "/placeholder.svg"}
          alt={`Portrait of ${name}`}
          fill
          className="object-cover rounded-full"
        />
      </div>
      <h3 className={`${nameClasses[size]} font-bold text-gray-800 mb-1`}>{name}</h3>
      <p className="text-gray-600 mb-2">{role}</p>
      <div className="flex items-center gap-1 mb-4">
        {[...Array(5)].map((_, i) => (
          <Star
            key={i}
            className={`w-5 h-5 ${
              i < Math.min(5, rating / 2) ? "fill-yellow-400 text-yellow-400" : "fill-gray-200 text-gray-200"
            }`}
          />
        ))}
      </div>
      <p className="text-gray-600 leading-relaxed">{testimonial}</p>
    </div>
  )
}

export default TestimonialCard

