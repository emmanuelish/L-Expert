import type { FC } from "react"
import Image from "next/image"

const solutions = [
  {
    title: "Jeunes diplômés",
    description:
      "Démarquez-vous sur le marché du travail avec un CV qui met en valeur vos stages et projets académiques.",
    image:
      "https://images.unsplash.com/photo-1523580494863-6f3031224c94?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80",
  },
  {
    title: "Professionnels en reconversion",
    description: "Mettez en avant vos compétences transférables et votre expérience pour aborder un nouveau secteur.",
    image:
      "https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1472&q=80",
  },
  {
    title: "Cadres expérimentés",
    description: "Soulignez vos réalisations clés et votre leadership pour viser des postes de direction.",
    image:
      "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1469&q=80",
  },
]

const Solutions: FC = () => {
  return (
    <section id="solutions" className="bg-[#F3EEFF] py-8 md:py-16">
      <div className="container mx-auto px-4">
        <h2 className="text-2xl md:text-3xl font-bold text-center text-[#2D1155] mb-3 md:mb-4">
          Des solutions adaptées à votre profil
        </h2>
        <p className="text-center text-gray-600 mb-8 md:mb-12 max-w-2xl mx-auto text-sm md:text-base">
          Que vous soyez en début de carrière, en reconversion professionnelle ou cadre expérimenté, L&apos;Expert propose
          des CV et lettres de motivation parfaitement adaptés à votre situation.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          {solutions.map((solution, index) => (
            <div key={index} className="bg-white rounded-xl overflow-hidden shadow-sm">
              <div className="relative h-40 md:h-48">
                <Image src={solution.image || "/placeholder.svg"} alt={solution.title} fill className="object-cover" />
              </div>
              <div className="p-4 md:p-6">
                <h3 className="text-lg md:text-xl font-semibold text-[#2D1155] mb-2">{solution.title}</h3>
                <p className="text-gray-600 text-sm md:text-base">{solution.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default Solutions

