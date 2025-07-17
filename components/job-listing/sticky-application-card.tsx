"use client";

import { Button } from "@/components/ui/button";
import { Heart, Share2 } from "lucide-react";

export function StickyApplicationCard() {
  const handleGetCv = () => {
    // Redirect to CV crafting service or open modal
    window.location.href = "/services#cv-crafting";
  };

  return (
    <div className="sticky top-[88px]">
      <div className="bg-gradient-to-br from-purple-50 to-white p-5 rounded-lg mb-4 shadow-md border border-purple-100 flex flex-col items-center">
        <Heart className="h-8 w-8 text-purple-600 mb-2" />
        <h3 className="font-bold text-lg text-gray-900 mb-2 text-center">
          Boostez votre carrière avec un CV professionnel !
        </h3>
        <p className="text-sm text-gray-700 mb-4 text-center">
          Notre équipe d&apos;experts vous aide à créer un CV percutant et
          personnalisé pour maximiser vos chances d&apos;être recruté.
        </p>
        <Button
          className="w-full bg-purple-600 hover:bg-purple-700 mb-3"
          onClick={handleGetCv}
        >
          Obtenez votre CV sur-mesure
        </Button>
        <div className="flex space-x-2 w-full">
          <Button
            variant="outline"
            size="sm"
            className="flex-1 bg-transparent"
            onClick={handleGetCv}
          >
            <Share2 className="h-4 w-4 mr-1" />
            Partager le service
          </Button>
        </div>
      </div>
      <p className="text-xs text-purple-500 text-center">
        Service rapide et personnalisé
      </p>
    </div>
  );
}
