"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"

const Navbar = () => {
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
            <Link href="#features" className="text-gray-600 hover:text-gray-900">
              Tarifs
            </ Link>
            <Link href="#features" className="text-gray-600 hover:text-gray-900">
              Nos Avantages
            </ Link>
            <Link href="#testimonials" className="text-gray-600 hover:text-gray-900">
              Témoignages
            </ Link>
            <Link href="#howItWorks" className="text-gray-600 hover:text-gray-900">
              Comment ça marche
            </ Link>
            <Link href="#about" className="text-gray-600 hover:text-gray-900">
              À propos
            </ Link>
          </div>

          {/* CTA Buttons */}
          <div className="flex items-center space-x-4">
            <Button className="bg-[#2D1155] hover:bg-[#1D0B3B] text-white px-6 py-2 rounded-full"
              onClick={() => window.open("https://wa.me/22891989046", "_blank")}
            >
              Commander
            </Button>
          </div>
        </div>
      </div>
    </nav>
  )
}

export default Navbar

