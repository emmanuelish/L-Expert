"use client"

import { Button } from "@/components/ui/button"
import { ChevronDown } from "lucide-react"
import { useState } from "react"

interface JobSectionProps {
  title: string
  content: string | string[]
  collapsible?: boolean
  defaultExpanded?: boolean
}

export function JobSection({ title, content, collapsible = false, defaultExpanded = true }: JobSectionProps) {
  const [isExpanded, setIsExpanded] = useState(defaultExpanded)

  const renderContent = () => {
    if (Array.isArray(content)) {
      return (
        <ul className="space-y-2">
          {content.map((item, index) => (
            <li key={index} className="flex items-start space-x-2">
              <span className="text-purple-600 mt-1">•</span>
              <span className="text-gray-700 leading-relaxed">{item}</span>
            </li>
          ))}
        </ul>
      )
    }

    return (
      <div
        className="prose prose-sm max-w-none text-gray-700 leading-relaxed"
        dangerouslySetInnerHTML={{ __html: content }}
      />
    )
  }

  return (
    <div className="mb-8">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-xl font-semibold text-gray-900">{title}</h2>
        {collapsible && (
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setIsExpanded(!isExpanded)}
            className="text-purple-600 hover:text-purple-700"
          >
            Voir {isExpanded ? "moins" : "plus"} de détails
            <ChevronDown className={`h-4 w-4 ml-1 transition-transform ${isExpanded ? "rotate-180" : ""}`} />
          </Button>
        )}
      </div>

      {isExpanded && renderContent()}
    </div>
  )
}
