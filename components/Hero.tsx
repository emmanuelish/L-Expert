import Image from "next/image"
import { Button } from "@/components/ui/button"
import React from "react"

const Hero: React.FC = React.memo(() => {
  return (
    <section className="bg-[#F3EEFF] relative overflow-hidden">
      <div className="container mx-auto px-4 py-8 md:py-16">
        <div className="grid md:grid-cols-2 gap-8 items-center">
          <div className="text-center md:text-left">
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-[#2D1155] mb-4 md:mb-6">
              Nos experts rédigent votre CV et lettre de motivation en moins de 24h !
            </h1>
            <p className="text-base md:text-lg text-gray-600 mb-6 md:mb-8">
              L&apos;Expert vous offre des CV et lettres de motivation sur mesure, rédigés par des professionnels, pour
              booster votre carrière. Recevez vos documents en moins de 24 heures !
            </p>
            <Button className="bg-[#2D1155] hover:bg-[#1D0B3B] text-white px-6 md:px-8 py-4 md:py-6 rounded-full text-base md:text-lg w-full md:w-auto"
              onClick={() => window.open("https://wa.me/22897864808", "_blank")}
            >
              Commandez maintenant
            </Button>
          </div>
          <div className="relative mt-8 md:mt-0">
            <div className="relative w-full h-[250px] md:h-[400px]">
              <Image
                src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-1HFUiG4e4E740pNsS22cp6aEwyHqt1.png"
                alt="Professional success celebration"
                layout="fill"
                objectFit="contain"
                priority
                loading="eager"
                className="rounded-2xl"
              />
            </div>
            <div className="absolute top-4 right-4 bg-white rounded-full px-3 py-1 md:px-4 md:py-2 shadow-lg flex items-center gap-2">
              <div className="w-2 h-2 bg-green-500 rounded-full"></div>
              <span className="text-xs md:text-sm font-medium">L&apos;Expert AI</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
})

Hero.displayName = "Hero"

export default Hero

