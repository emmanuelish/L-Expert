import { Clock, FileCheck, Target, Users } from "lucide-react"

const features = [
  {
    icon: Users,
    title: "Rédigé par des experts",
    description: "Notre équipe de rédacteurs professionnels connaît les attentes des recruteurs dans votre secteur.",
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
  {
    icon: Target,
    title: "Optimisé pour les ATS",
    description:
      "Nos documents sont optimisés pour passer les systèmes de suivi des candidatures (ATS) utilisés par de nombreuses entreprises.",
  },
]

export default function Features() {
  return (
    <section id="features" className="bg-[#FFE8CC] py-8 md:py-16">
      <div className="container mx-auto px-4">
        <div className="max-w-2xl mx-auto mb-8 md:mb-12">
          <h2 className="text-2xl md:text-3xl font-bold text-[#2D1155] mb-3 md:mb-4 text-center">
            Pourquoi choisir L&apos;Expert pour rédiger votre CV ou votre lettre de motivation ?
          </h2>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-8">
          {features.map((feature, index) => (
            <div key={index} className="bg-white p-4 md:p-6 rounded-xl shadow-sm">
              <feature.icon className="w-6 h-6 md:w-8 md:h-8 text-[#2D1155] mb-3 md:mb-4" />
              <h3 className="text-lg md:text-xl font-semibold text-[#2D1155] mb-2 md:mb-3">{feature.title}</h3>
              <p className="text-gray-600 text-sm md:text-base">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export const dynamic = "force-static"

