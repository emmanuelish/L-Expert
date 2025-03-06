import Link from "next/link"

export default function Header() {
  const handleClick = () => window.open("https://wa.me/22891989046", "_blank")

  return (
    <header className="bg-white shadow-md">
      <nav className="container mx-auto px-6 py-4">
        <div className="flex justify-between items-center">
          <Link href="/" className="text-2xl font-bold text-gray-800">
            ResumeForge
          </Link>
          <div className="space-x-4">
            <Link href="#services" className="text-gray-600 hover:text-gray-800">
              Services
            </Link>
            <Link href="#testimonials" className="text-gray-600 hover:text-gray-800">
              Testimonials
            </Link>
            <Link href="#contact" className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
              onClick={handleClick}
            >
              Contact Us
            </Link>
          </div>
        </div>
      </nav>
    </header>
  )
}

