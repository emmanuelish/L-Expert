import type { FC } from "react"
import { Button } from "@/components/ui/button"

const CtaSection: FC = () => {
  return (
    <section className="bg-[#2D1155] py-8 md:py-12">
      <div className="container mx-auto px-4">
        <div className="bg-[#1D0B3B] rounded-xl p-4 md:p-8 text-center">
          <h2 className="text-xl md:text-2xl font-bold text-white mb-4">
            Boostez votre carrière avec nos CV personnalisés
          </h2>
          <Button className="bg-[#8B5CF6] hover:bg-[#7C3AED] text-white px-6 md:px-8 py-4 md:py-6 rounded-full text-base md:text-lg w-full sm:w-auto">
            Commander mon CV
          </Button>
        </div>
      </div>
    </section>
  )
}

export default CtaSection

