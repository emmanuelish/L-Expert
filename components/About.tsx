import { WhatsAppLogo, InstagramLogo, FacebookLogo, TikTokLogo, TelegramLogo } from "./social-icons"

export default function About() {
  return (
    <section id="about" className="bg-[#F3EEFF] py-16">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center text-[#2D1155] mb-8">À propos de L&apos;Expert</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto mb-12">
          <div className="space-y-4">
            <h3 className="text-xl font-semibold text-[#2D1155]">Notre Mission</h3>
            <p className="text-gray-600">
              Chez L&apos;Expert, notre mission est de vous aider à décrocher l&apos;emploi de vos rêves grâce à des CV et lettres
              de motivation professionnels et personnalisés.
            </p>
          </div>
          <div className="space-y-4">
            <h3 className="text-xl font-semibold text-[#2D1155]">Notre Engagement</h3>
            <p className="text-gray-600">
              Nous nous engageons à fournir un service rapide et de qualité, avec une livraison garantie en 24h et un
              accompagnement personnalisé.
            </p>
          </div>
        </div>

        <div className="text-center mb-8">
          <h3 className="text-xl font-semibold text-[#2D1155] mb-4">Suivez-nous sur les réseaux sociaux</h3>
          <div className="flex flex-wrap justify-center gap-6">
            <a
              href="https://wa.me/22891989046"
              target="_blank"
              rel="noopener noreferrer"
              className="transform hover:scale-110 transition-transform duration-200"
            >
              <WhatsAppLogo />
            </a>
            <a
              href="https://www.instagram.com/yourinstagram"
              target="_blank"
              rel="noopener noreferrer"
              className="transform hover:scale-110 transition-transform duration-200"
            >
              <InstagramLogo />
            </a>
            <a
              href="https://www.facebook.com/yourfacebook"
              target="_blank"
              rel="noopener noreferrer"
              className="transform hover:scale-110 transition-transform duration-200"
            >
              <FacebookLogo />
            </a>
            <a
              href="https://www.tiktok.com/@yourtiktok"
              target="_blank"
              rel="noopener noreferrer"
              className="transform hover:scale-110 transition-transform duration-200"
            >
              <TikTokLogo />
            </a>
            <a
              href="https://t.me/yourtelegram"
              target="_blank"
              rel="noopener noreferrer"
              className="transform hover:scale-110 transition-transform duration-200"
            >
              <TelegramLogo />
            </a>
          </div>
        </div>
      </div>
    </section>
  )
}

