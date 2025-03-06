import type { FC } from "react"
import { Button } from "@/components/ui/button"
import AnimatedSection from "./AnimatedSection"

const CtaSection: FC = () => {
  const handleClick = () => window.open("https://wa.me/22891989046", "_blank")

  return (
    <section className="relative overflow-hidden py-20">
      {/* Gradient background */}
      <div 
        className="absolute inset-0"
        style={{
          background: "linear-gradient(60deg, rgb(82, 67, 170), rgb(237, 80, 180))"
        }} 
      />

      {/* Floating tags */}
      <div className="absolute inset-0">
        <span className="absolute top-4 left-16 bg-cyan-400 text-white px-3 py-1 rounded-md text-sm">CV Pro</span>
        <span className="absolute top-4 right-16 bg-green-400 text-white px-3 py-1 rounded-md text-sm">Carrière</span>
        <span className="absolute bottom-4 left-24 bg-pink-400 text-white px-3 py-1 rounded-md text-sm">Entretien</span>
        <span className="absolute top-1/2 left-12 bg-yellow-400 text-white px-3 py-1 rounded-md text-sm">Coaching</span>
        <span className="absolute bottom-12 right-16 bg-blue-400 text-white px-3 py-1 rounded-md text-sm">
          LinkedIn
        </span>
        <span className="absolute top-1/2 right-20 bg-purple-400 text-white px-3 py-1 rounded-md text-sm">Emploi</span>
      </div>

      {/* Content */}
      <div className="relative  mx-auto px-4 text-center">
        <AnimatedSection direction="left">
          <div className=" mx-auto px-4 max-w-[500px] max-h-[300px]">
            <div className="bg-[#1D0B3B] rounded-xl p-4 md:p-8 text-center">
              <h2 className="text-xl md:text-2xl font-bold text-white mb-4">
                Boostez votre carrière avec nos CV personnalisés
              </h2>
              <Button className="bg-[#8B5CF6] hover:bg-[#7C3AED] text-white px-6 md:px-8 py-4 md:py-6 rounded-full text-base md:text-lg w-full sm:w-auto"
                onClick={handleClick}
              >
                Commander mon CV
              </Button>
            </div>
          </div>
        </AnimatedSection>
      </div>
    </section>
  )
}

export default CtaSection

