import type { FC } from "react"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import AnimatedSection from "./AnimatedSection"

const steps = [
  {
    number: 1,
    title: "Vous nous donnez vos informations",
    illustration: "https://illustrations.popsy.co/amber/message.svg",
  },
  {
    number: 2,
    title: "Nos Experts conçoivent un CV personnalisé pour vous",
    illustration: "https://illustrations.popsy.co/amber/designer.svg",
  },
  {
    number: 3,
    title: "Vous recevez votre CV en moins de 24 heures",
    illustration: "https://illustrations.popsy.co/amber/success.svg",
  },
]

const HowItWorks: FC = () => {
  return (
    <section className="py-16 bg-white" style={{
      background: `url(//images.ctfassets.net/rz1oowkt5gyp/7KgS3XVFhGu3TiclJKloEp/c10aad1…/ViewsBackground_Left_Narrow.svg) left center / contain no-repeat scroll padding-box border-box,
                   url(//images.ctfassets.net/rz1oowkt5gyp/2HisRmboWIdXSYaaUSDzon/dadecff…/ViewsBackground_Right_Narrow.svg) right center / contain no-repeat scroll padding-box border-box,
                   linear-gradient(240deg, rgb(0, 184, 217), rgb(0, 101, 255)) 0% 0% / auto repeat scroll padding-box border-box rgb(0, 101, 255)`,
      backgroundBlendMode: "normal, normal, normal",
      color: "rgb(255, 255, 255)"
    }}>
      <div className="container mx-auto px-4">
        <AnimatedSection direction="left">
          <h2 className="text-3xl font-bold text-center text-[#2D1155] mb-16">Comment ça marche ?</h2>
        </AnimatedSection>

        <div className="relative max-w-4xl mx-auto">
          {/* Connection lines */}
          <div className="absolute top-[120px] left-[10%] right-[10%] h-0.5 bg-gray-200 hidden md:block">
            <div className="absolute left-1/3 top-1/2 transform -translate-y-1/2 flex items-center w-8">
              <div className="w-2 h-2 rotate-45 border-t-2 border-r-2 border-gray-300 ml-auto"></div>
            </div>
            <div className="absolute left-2/3 top-1/2 transform -translate-y-1/2 flex items-center w-8">
              <div className="w-2 h-2 rotate-45 border-t-2 border-r-2 border-gray-300 ml-auto"></div>
            </div>
          </div>

          {/* Steps */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-y-8 md:gap-y-0 md:justify-between md:space-x-8 relative">
            {steps.map((step, index) => (
              <AnimatedSection
                key={index}
                direction={window.innerWidth >= 768 ? (index === 0 ? "left" : index === 2 ? "right" : "down") : "left"}
                index={index}
              >
                <div className="bg-white rounded-lg p-6 shadow-lg">
                  <div className="flex flex-col items-center text-center">
                    <div className="w-32 h-32 mb-6">
                      <Image
                        src={step.illustration || "/placeholder.svg"}
                        alt={step.title}
                        width={128}
                        height={128}
                        className="w-full h-full object-contain"
                      />
                    </div>
                    <div className="w-12 h-12 rounded-full border-2 border-[#FF7F6B] flex items-center justify-center mb-4">
                      <span className="text-[#FF7F6B] text-xl font-semibold">{step.number}</span>
                    </div>
                    <h3 className="text-xl font-semibold text-[#2D1155] mb-1">{step.title}</h3>
                  </div>
                </div>
              </AnimatedSection>
            ))}
          </div>
        </div>

        <AnimatedSection direction="left">
          <div className="mt-12 text-center flex justify-center">
            <Button
              className="bg-[#2D1155] hover:bg-[#1D0B3B] text-white px-4 sm:px-8 py-4 rounded-full text-base sm:text-lg w-full sm:w-auto h-auto min-h-[48px] flex items-center justify-center whitespace-normal"
              onClick={() => window.open("https://wa.me/22897864808", "_blank")}
            >
              Commencer maintenant sur WhatsApp
            </Button>
          </div>
        </AnimatedSection>
      </div>
    </section>
  )
}

export default HowItWorks

