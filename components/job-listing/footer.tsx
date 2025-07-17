"use client";

import Link from "next/link";
import Image from "next/image";

export function JobListingFooter() {
  const footerSections = [
    {
      title: "Recherches similaires",
      links: [
        "Emploi Assistant commercial",
        "Emploi Secrétaire",
        "Emploi Assistant de direction",
        "Emploi Chargé de clientèle",
        "Emploi Téléconseiller",
        "Emploi Gestionnaire",
        "voir plus...",
      ],
    },
    {
      title: "Les sites",
      links: [
        "Offres d'emploi par ville",
        "Offres d'emploi par région",
        "Offres d'emploi par métier",
        "Offres d'emploi par secteur",
        "Annuaire",
        "L'Expert",
        "Meteojob",
      ],
    },
    {
      title: "L'emploi",
      links: [
        "Offres d'emploi par ville",
        "Offres d'emploi par région",
        "Offres d'emploi par métier",
        "Offres d'emploi par secteur",
      ],
    },
    {
      title: "L'entreprise",
      links: [
        "Qui sommes-nous ?",
        "Nos offres",
        "Aide en ligne",
        "Nous contacter",
      ],
    },
    {
      title: "Les apps",
      links: [],
    },
  ];

  return (
    <footer className="bg-white border-t border-gray-200">
      <div className="max-w-7xl mx-auto px-6 py-12">
        <div className="grid grid-cols-2 md:grid-cols-5 gap-8">
          {footerSections.map((section, index) => (
            <div key={index}>
              <h3 className="font-semibold text-gray-900 mb-4">
                {section.title}
              </h3>
              {section.title === "Les apps" ? (
                <div className="space-y-2">
                  <Image
                    src="/placeholder.svg?height=40&width=120"
                    alt="Download on App Store"
                    width={120}
                    height={40}
                    className="object-contain"
                  />
                  <Image
                    src="/placeholder.svg?height=40&width=120"
                    alt="Get it on Google Play"
                    width={120}
                    height={40}
                    className="object-contain"
                  />
                </div>
              ) : (
                <ul className="space-y-2">
                  {section.links.map((link, linkIndex) => (
                    <li key={linkIndex}>
                      <Link
                        href="#"
                        className="text-sm text-gray-600 hover:text-gray-900"
                      >
                        {link}
                      </Link>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          ))}
        </div>

        <div className="border-t border-gray-200 mt-12 pt-8">
          <div className="flex flex-col md:flex-row items-center justify-between">
            <div className="flex items-center space-x-4 mb-4 md:mb-0">
              <span className="text-sm text-gray-500">Nous suivre sur :</span>
              <div className="flex space-x-2">
                {/* Social media icons would go here */}
                <div className="w-6 h-6 bg-gray-300 rounded"></div>
                <div className="w-6 h-6 bg-gray-300 rounded"></div>
                <div className="w-6 h-6 bg-gray-300 rounded"></div>
              </div>
            </div>

            <div className="flex flex-wrap items-center space-x-4 text-xs text-gray-500">
              <Link href="#" className="hover:text-gray-700">
                Mentions légales
              </Link>
              <Link href="#" className="hover:text-gray-700">
                Politique de confidentialité
              </Link>
              <Link href="#" className="hover:text-gray-700">
                Conditions d&apos;utilisation
              </Link>
              <Link href="#" className="hover:text-gray-700">
                Plan du site
              </Link>
              <span>© 2024 L&apos;Expert</span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
