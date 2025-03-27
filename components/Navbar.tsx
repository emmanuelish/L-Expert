"use client"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Menu, X } from "lucide-react"

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen)
  }

  const handleClick = () => window.open("https://wa.me/22891989046", "_blank");

  const handleHamburgerClick = () => setIsMenuOpen(false);

  return (
    <nav className="fixed top-0 left-0 right-0 bg-white border-b z-50">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/" className="text-2xl font-bold text-[#2D1155]">
            L&apos;Expert
          </Link>

          {/* Navigation Links - Visible on large screens */}
          <div className="hidden lg:flex items-center space-x-8">
            <Link href="/services" className="text-gray-600 hover:text-gray-900 font-bold">
              Nos Services
            </Link>
            <Link href="/pricing" className="text-gray-600 hover:text-gray-900 font-bold">
              Tarifs
            </Link>
            <Link href="/how-it-works" className="text-gray-600 hover:text-gray-900 font-bold">
              Comment Ça Marche
            </Link>
            <Link href="/about" className="text-gray-600 hover:text-gray-900 font-bold">
              À propos
            </Link>
            <Link href="/blog" className="text-gray-600 hover:text-gray-900 font-bold">
              Blog
            </Link>
          </div>

          {/* CTA Buttons and Hamburger */}
          <div className="flex items-center space-x-4">
            <Button className="bg-[#2D1155] hover:bg-[#1D0B3B] text-white px-6 py-2 rounded-full"
              onClick={handleClick}
            >
              Commander
            </Button>
            
            {/* Hamburger Menu Button - Only visible below lg breakpoint */}
            <button 
              className="lg:hidden text-[#2D1155] focus:outline-none" 
              onClick={toggleMenu}
              aria-label="Toggle menu"
            >
              {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>

        {/* Mobile Menu - Only visible when toggled */}
        {isMenuOpen && (
          <div className="lg:hidden bg-white py-4 border-t">
            <div className="flex flex-col space-y-4 px-4">
              <Link 
                href="/services" 
                className="text-gray-600 hover:text-gray-900 font-bold py-2 text-center"
                onClick={handleHamburgerClick}
              >
                Nos Services
              </Link>
              <Link 
                href="/pricing" 
                className="text-gray-600 hover:text-gray-900 font-bold py-2 text-center"
                onClick={handleHamburgerClick}
              >
                Tarifs
              </Link>
              <Link 
                href="/how-it-works" 
                className="text-gray-600 hover:text-gray-900 font-bold py-2 text-center"
                onClick={handleHamburgerClick}
              >
                Comment Ça Marche
              </Link>
              <Link 
                href="/about" 
                className="text-gray-600 hover:text-gray-900 font-bold py-2 text-center"
                onClick={handleHamburgerClick}
              >
                À propos
              </Link>
              <Link 
                href="/blog" 
                className="text-gray-600 hover:text-gray-900 font-bold py-2 text-center"
                onClick={handleHamburgerClick}
              >
                Blog
              </Link>
            </div>
          </div>
        )}
      </div>
    </nav>
  )
}

export default Navbar