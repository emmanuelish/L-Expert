import type { FC } from "react"

const TrustLogos: FC = () => {
  return (
    <section className="py-12 bg-white">
      <div className="container mx-auto px-4">
        <h2 className="text-xl text-center text-gray-700 mb-8">Ils nous font déjà confiance</h2>
        <div className="flex justify-center items-center gap-12">
          <div className="text-2xl font-bold text-gray-400">OWLA</div>
          <div className="text-2xl font-bold text-gray-400">EtriLabs</div>
        </div>
      </div>
    </section>
  )
}

export default TrustLogos

