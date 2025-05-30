import type { FC } from "react"
import Link from "next/link"
import { WhatsAppLogo, InstagramLogo, TikTokLogo } from "./social-icons"

const Footer: FC = () => {
  return (
    <footer className="bg-[#1a2942] text-white py-16">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-8">
          {/* Company Section */}
          <div className="text-center md:text-left">
            <h3 className="text-lg font-semibold mb-4">ENTREPRISE</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/about" className="text-gray-300 hover:text-white">
                  À propos de nous
                </Link>
              </li>
              <li>
                <Link href="/about" className="text-gray-300 hover:text-white">
                  Nous contacter
                </Link>
              </li>
              <li>
                <Link href="/blog" className="text-gray-300 hover:text-white">
                  Blog
                </Link>
              </li>
            </ul>
          </div>

          {/* Legal Section */}
          <div className="text-center md:text-left">
            <h3 className="text-lg font-semibold mb-4">LÉGAL</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/" className="text-gray-300 hover:text-white">
                  Conditions d&apos;utilisation
                </Link>
              </li>
              <li>
                <Link href="/" className="text-gray-300 hover:text-white">
                  Politique de confidentialité
                </Link>
              </li>
              <li>
                <Link href="/" className="text-gray-300 hover:text-white">
                  RGPD
                </Link>
              </li>
              <li>
                <Link href="/" className="text-gray-300 hover:text-white">
                  Cookies
                </Link>
              </li>
            </ul>
          </div>

          {/* Services Section */}
          <div className="text-center md:text-left">
            <h3 className="text-lg font-semibold mb-4">NOS SERVICES</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/" className="text-gray-300 hover:text-white">
                  Rédaction de CV
                </Link>
              </li>
              <li>
                <Link href="/" className="text-gray-300 hover:text-white">
                  Lettre de motivation
                </Link>
              </li>
              <li>
                <Link href="/" className="text-gray-300 hover:text-white">
                  Optimisation LinkedIn
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact Section */}
          <div className="text-center md:text-left">
            <h3 className="text-lg font-semibold mb-4">CONTACT</h3>
            <ul className="space-y-2">
              <li className="text-gray-300">Email: contact@lexpert.com</li>
              <li className="text-gray-300">Tél: +228 91 98 90 46</li>
              <li className="flex justify-center md:justify-start space-x-4 mt-4">
                <Link
                  href="https://wa.me/22891989046"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="transform hover:scale-110 transition-transform duration-200"
                >
                  <WhatsAppLogo />
                </ Link>
                <Link
                  href="https://www.instagram.com/lexpertpro"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="transform hover:scale-110 transition-transform duration-200"
                >
                  <InstagramLogo />
                </ Link>
                <Link
                  href="https://www.tiktok.com/@lexpertpro"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="transform hover:scale-110 transition-transform duration-200"
                >
                  <TikTokLogo />
                </ Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-700 pt-8 mt-8 flex justify-center">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="text-gray-400 mb-4 md:mb-0 text-center">
              © {new Date().getFullYear()} L&apos;Expert. Tous droits réservés.
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer