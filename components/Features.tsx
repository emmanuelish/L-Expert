import { Clock, FileCheck, Target, Users } from "lucide-react"
import AnimatedSection from "./AnimatedSection"

const features = [
  {
    icon: Users,
    title: "Rédigé par des experts",
    description: "Notre équipe de rédacteurs professionnels connaît les attentes des recruteurs dans votre secteur.",
  },
  {
    icon: Target,
    title: "Tarifs Moins Chers",
    description:
      "Nos tarifs sont les moins chers du marché ! Chez nous, tout le monde peut s’offrir un CV de qualité sans se ruiner.",
  },
  {
    icon: Clock,
    title: "Livraison en 24 heures",
    description:
      "Recevez votre CV et lettre de motivation personnalisés en moins de 24 heures, parfaits pour les candidatures urgentes.",
  },
  {
    icon: FileCheck,
    title: "Documents sur mesure",
    description:
      "Chaque CV et lettre de motivation est créé spécifiquement pour vous et le poste visé, mettant en valeur vos compétences uniques.",
  },
]

export default function Features() {
  return (
    <section id="features" className="bg-[#FFE9B7] py-8 md:py-16">
      <div className="container mx-auto px-4">
        <AnimatedSection direction="left">
          <div className="max-w-2xl mx-auto mb-8 md:mb-12">
            <h2 className="text-2xl md:text-3xl font-bold text-[#2D1155] mb-3 md:mb-4 text-center">
              Pourquoi choisir L&apos;Expert pour rédiger votre CV ou votre lettre de motivation ?
            </h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-8">
            {features.map((feature, index) => (
              <AnimatedSection
                key={index}
                direction={window.innerWidth >= 1024 ? (index === 0 ? "left" : index === 3 ? "right" : "down") : "left"}
                index={index}
              >
                <div className="bg-white p-4 md:p-6 rounded-xl shadow-sm">
                  <feature.icon className="w-6 h-6 md:w-8 md:h-8 text-[#2D1155] mb-3 md:mb-4" />
                  <h3 className="text-lg md:text-xl font-bold text-[#2D1155] mb-2 md:mb-3">{feature.title}</h3>
                  <p className="text-gray-600 text-sm md:text-base">{feature.description}</p>
                </div>
              </AnimatedSection>
            ))}
          </div>
        </AnimatedSection>
      </div>
    </section>
  )
}

export const dynamic = "force-static"

