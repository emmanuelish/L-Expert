"use client"

import { useState } from "react"
import Link from "next/link"
import { ChevronDown } from "lucide-react"
import { Button } from "@/components/ui/button"

const Navbar = () => {
  const [isServicesOpen, setIsServicesOpen] = useState(false)

  return (
    <nav className="fixed top-0 left-0 right-0 bg-white border-b z-50">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/" className="text-2xl font-bold text-[#2D1155]">
            L&apos;Expert
          </Link>

          {/* Navigation Links */}
          <div className="hidden md:flex items-center space-x-8">
            <div className="relative group">
              <button
                className="flex items-center space-x-1 text-gray-600 hover:text-gray-900"
                onClick={() => setIsServicesOpen(!isServicesOpen)}
              >
                <span>Services</span>
                <ChevronDown className="w-4 h-4" />
              </button>
              {/* Dropdown */}
              <div className="absolute top-full left-0 mt-2 w-48 bg-white border rounded-lg shadow-lg py-2 hidden group-hover:block">
                <a href="#services" className="block px-4 py-2 text-gray-700 hover:bg-gray-100">
                  Nos Services
                </a>
                <a href="#solutions" className="block px-4 py-2 text-gray-700 hover:bg-gray-100">
                  Solutions Adaptées
                </a>
              </div>
            </div>
            <a href="#features" className="text-gray-600 hover:text-gray-900">
              Caractéristiques
            </a>
            <a href="#testimonials" className="text-gray-600 hover:text-gray-900">
              Témoignages
            </a>
            <a href="#about" className="text-gray-600 hover:text-gray-900">
              À propos
            </a>
          </div>

          {/* CTA Buttons */}
          <div className="flex items-center space-x-4">
            <Link href="/login" className="text-gray-600 hover:text-gray-900">
              Se connecter
            </Link>
            <Button className="bg-[#2D1155] hover:bg-[#1D0B3B] text-white px-6 py-2 rounded-full">Commander</Button>
          </div>
        </div>
      </div>
    </nav>
  )
}

export default Navbar

