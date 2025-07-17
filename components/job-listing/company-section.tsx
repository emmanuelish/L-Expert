"use client"

import Image from "next/image"
import { Button } from "@/components/ui/button"

interface CompanySectionProps {
  companyName: string
  description: string
  images: string[]
}

export function CompanySection({ companyName, description, images }: CompanySectionProps) {
  return (
    <div className="mb-8">
      <h2 className="text-xl font-semibold text-gray-900 mb-4">Bienvenue chez {companyName}</h2>

      <div className="prose prose-sm max-w-none text-gray-700 leading-relaxed mb-6">
        <p>{description}</p>
      </div>

      {images.length > 0 && (
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-6">
          {images.map((image, index) => (
            <div key={index} className="relative aspect-video rounded-lg overflow-hidden">
              <Image
                src={image || "/placeholder.svg"}
                alt={`${companyName} image ${index + 1}`}
                fill
                className="object-cover"
              />
            </div>
          ))}
        </div>
      )}

      <Button variant="outline" size="sm">
        + de photos
      </Button>
    </div>
  )
}
