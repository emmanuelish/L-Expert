"use client";

import React, { FC, useEffect, useState } from "react";
import { IconQuote } from "@tabler/icons-react";
import Image from "next/image";
import AnimatedSection from "./AnimatedSection";

const testimonialsData = [
  {
    id: 1,
    name: "Jolie Akakpo",
    location: "Lomé",
    flag: "https://flagcdn.com/tg.svg",
    title: "CV parfaitement adapté à mon parcours",
    text: "Avant, mon CV était fade et peu attractif. Après l'intervention de L'Expert, j'ai découvert une version de mon parcours beaucoup plus impactante et valorisante. Ça m'a donné un énorme boost de confiance pour mes entretiens !"
  },
  {
    id: 2,
    name: "Marcus Anthony",
    location: "Lomé",
    flag: "https://flagcdn.com/tg.svg",
    title: "Service rapide et professionnel",
    text: "J'avais besoin d'un CV professionnel en urgence pour une offre qui me correspondait parfaitement. En 24h, j'ai reçu un document impeccable, bien structuré et optimisé pour mon secteur. J'ai postulé et obtenu un entretien immédiatement !"
  },
  {
    id: 3,
    name: "Luc Kouassi",
    location: "Abidjan",
    flag: "https://flagcdn.com/ci.svg",
    title: "Résultats garantis",
    text: "J'envoyais des CV depuis des mois sans réponse. Après avoir fait appel à L'Expert, j'ai reçu 3 entretiens en une semaine et décroché un poste en moins d'un mois ! L'Expert fait vraiment la différence. Merci infiniment !"
  }
];

const Testimonials: FC = () => {
  const [isLargeScreen, setIsLargeScreen] = useState(false);

  useEffect(() => {
    if (typeof window !== "undefined") {
      setIsLargeScreen(window.innerWidth >= 1024);
    }
  }, []);

  return (
    <section id="testimonials" className="bg-gray-100 py-16">
      <div className="container mx-auto px-6">
        <AnimatedSection direction="left">
          <div className="flex flex-col items-center text-center">
            <h2 className="text-4xl font-extrabold mt-2">Découvrez ce que nos clients disent de nous</h2>
          </div>
        </AnimatedSection>
        <div className="flex flex-wrap gap-6 justify-center mt-12">
          {testimonialsData.map(({ id, name, location, flag, text, title }) => (
            <AnimatedSection
              key={id}
              direction={isLargeScreen ? (id === 0 ? "left" : id === 2 ? "right" : "down") : "left"}
              index={id}
            >
              <div className="bg-white shadow-lg w-full sm:w-[320px] md:w-[360px] lg:w-[400px] p-6 sm:p-8 relative rounded-lg flex flex-col h-full">
                <span className="text-red-500 text-6xl absolute top-4 right-6">
                  <IconQuote width={40} height={40} className="sm:w-[45px] sm:h-[45px] lg:w-[50px] lg:h-[50px]" />
                </span>
                <div className="flex items-center gap-4 mb-4">
                  <div className="relative w-12 h-12 sm:w-14 sm:h-14">
                    <Image
                      src={flag || "/placeholder.svg"}
                      alt={`Drapeau de ${location}`}
                      fill
                      className="rounded-full"
                    />
                  </div>
                  <div>
                    <h4 className="text-lg font-semibold">{name}</h4>
                    <p className="text-gray-500">{location}</p>
                  </div>
                </div>
                <h4 className="text-center font-bold text-lg mb-3 text-red-500">
                  {title}
                </h4>
                <p className="text-base sm:text-lg font-medium text-gray-900">&quot;{text}&quot;</p>
              </div>
            </AnimatedSection>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
