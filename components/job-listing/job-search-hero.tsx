import Image from "next/image";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Search, Briefcase } from "lucide-react";

export function JobSearchHero() {
  return (
    <div className="relative w-full h-[400px] flex items-center justify-center text-center overflow-hidden">
      <Image
        src="/images/jobs.jpg"
        alt="Background image of a camera"
        fill
        className="object-cover brightness-50"
        priority
      />
      <div className="relative z-10 p-4 max-w-3xl mx-auto">
        <h3 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-8 leading-tight">
          Retrouvez toutes les offres d&apos;emploi : <br />
          Trouvez votre prochain défi professionnel
        </h3>
        <div className="flex w-full max-w-xl mx-auto bg-white rounded-full shadow-lg overflow-hidden">
          <div className="relative flex-1">
            <Briefcase className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
            <Input
              type="text"
              placeholder="Métier, compétence, mot-clé, n° d'offre"
              className="w-full pl-12 pr-4 py-3 h-12 border-none focus-visible:ring-0 focus-visible:ring-offset-0 rounded-l-full"
            />
          </div>
          <Button className="bg-purple-600 hover:bg-purple-700 text-white px-6 rounded-r-full h-12">
            <Search className="h-5 w-5" />
            <span className="sr-only">Rechercher</span>
          </Button>
        </div>
      </div>
    </div>
  );
}
