"use client";

import React from "react";
import { IconQuote } from "@tabler/icons-react";
import Image from "next/image";
import { ScrollReveal } from "reveal-on-scroll-react";
import Img2 from "@/public/pfp1.jpg";
import Img3 from "@/public/pfp2.jpg";

const testimonialsData = [
  {
    id: 1,
    name: "Jolie Akakpo",
    location: "Lomé",
    image: Img2,
    title: "CV parfaitement adapté à mon parcours",
    text: "Avant, mon CV était fade et peu attractif. Après l'intervention de L'Expert, j'ai découvert une version de mon parcours beaucoup plus impactante et valorisante. Ça m'a donné un énorme boost de confiance pour mes entretiens !"
  },
  {
    id: 2,
    name: "Marcus Anthony",
    location: "Los Angeles",
    image: Img3,
    title: "Service rapide et professionnel",
    text: "J'avais besoin d'un CV professionnel en urgence pour une offre qui me correspondait parfaitement. En 24h, j'ai reçu un document impeccable, bien structuré et optimisé pour mon secteur. J'ai postulé et obtenu un entretien immédiatement !"
  },
  {
    id: 3,
    name: "Luc Kouassi",
    location: "Abidjan",
    image: Img3,
    title: "Résultats garantis",
    text: "J'envoyais des CV depuis des mois sans réponse. Après avoir fait appel à L'Expert, j'ai reçu 3 entretiens en une semaine et décroché un poste en moins d'un mois ! L'Expert fait vraiment la différence. Merci infiniment !"
  }
];

const Testimonials = () => {
  return (
    <div id="testimonials">
      <ScrollReveal.div className="bg-gray-100 py-20 flex items-center justify-center">
        <div className="container mx-auto px-6">
          <div className="flex flex-col items-center text-center">
            <h4 className="text-2xl font-semibold text-gray-900">Témoignages</h4>
            <h2 className="text-4xl font-extrabold mt-2">Découvrez ce que nos clients disent de nous</h2>
          </div>
          <div className="flex flex-wrap gap-8 justify-center mt-12">
            {testimonialsData.map(({ id, name, location, image, text, title }) => (
              <div 
                key={id} 
                className="bg-white shadow-lg w-full md:max-w-md p-8 md:p-12 relative rounded-lg"
              >
                <span className="text-red-500 text-6xl absolute top-4 right-6 md:top-8 md:right-12">
                  <IconQuote width={50} height={50} />
                </span>
                <div className="flex items-center gap-4 mb-4 md:mb-6">
                  <Image src={image} alt="user_img" width={56} height={56} className="rounded-full" />
                  <div>
                    <h4 className="text-lg font-semibold">{name}</h4>
                    <p className="text-gray-500">{location}</p>
                  </div>
                </div>
                <h4 className="font-bold text-lg md:text-xl mb-3 md:mb-4 text-red-500">
                  {title}
                </h4>
                <p className="text-lg md:text-xl font-medium text-gray-900">&quot;{text}&quot;</p>
              </div>
            ))}
          </div>
        </div>
      </ScrollReveal.div>
    </div>
  );
};

export default Testimonials;
