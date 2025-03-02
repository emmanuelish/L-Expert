"use client"

// import { Check } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import AnimatedSection from "./AnimatedSection";

// Define types for our pricing data
interface PricingPlan {
  name: string;
  price: string;
  description: string;
  features: string[];
  popular: boolean;
  color: string;
}

interface PricingData {
  Étudiant: PricingPlan[];
  Particulier: PricingPlan[];
}

export default function PricingSection() {
  const pricing: PricingData = {
    Étudiant: [
      {
        name: "Lettre de Motivation",
        price: "1.500FCFA",
        description: "Création d'un curriculum vitae professionnel adapté aux étudiants entrant sur le marché du travailt",
        features: [
          "ATS-optimized format",
          "Professional template selection",
          "Skills assessment",
          "2 rounds of revisions",
          "Digital delivery within 3 days",
        ],
        popular: false,
        color: "bg-vibrant-blue",
      },
      {
        name: "CV",
        price: "1.500FCFA",
        description: "Création d'un curriculum vitae professionnel adapté aux étudiants entrant sur le marché du travail",
        features: [
          "Personalized content",
          "Academic focus",
          "Achievement highlighting",
          "2 rounds of revisions",
          "Digital delivery within 3 days",
        ],
        popular: true,
        color: "bg-vibrant-teal",
      },
      {
        name: "CV + Lettre de Motivation",
        price: "2.500FCFA",
        description: "Dossier de candidature complet avec CV et lettre de motivation à un prix réduit",
        features: [
          "Everything in CV & LM packages",
          "Consistent styling across documents",
          "Priority processing",
          "3 rounds of revisions",
          "Digital delivery within 5 days",
        ],
        popular: false,
        color: "bg-vibrant-purple",
      },
    ],
    Particulier: [
      {
        name: "Lettre de Motivation",
        price: "3.500FCFA",
        description: "Lettre de motivation convaincante mettant en valeur votre expérience professionnelle",
        features: [
          "ATS-optimized format",
          "Professional template selection",
          "Career achievement focus",
          "2 rounds of revisions",
          "Digital delivery within 3 days",
        ],
        popular: false,
        color: "bg-vibrant-blue",
      },
      {
        name: "CV",
        price: "3.500FCFA",
        description: "Création d'un CV professionnel pour les professionnels expérimentés",
        features: [
          "Personalized content",
          "Industry-specific focus",
          "Achievement highlighting",
          "2 rounds of revisions",
          "Digital delivery within 3 days",
        ],
        popular: true,
        color: "bg-vibrant-teal",
      },
      {
        name: "CV + Lettre de Motivation",
        price: "6.500FCFA",
        description: "Dossier de candidature complet avec CV et lettre de motivation à un prix réduit",
        features: [
          "Everything in CV & LM packages",
          "Consistent styling across documents",
          "Priority processing",
          "3 rounds of revisions",
          "Digital delivery within 5 days",
        ],
        popular: false,
        color: "bg-vibrant-purple",
      },
    ],
  }

  return (
    <section id="pricing" className="bg-gradient-to-b from-[#dfafe1] via-[#f2dce0] to-[#adc9e4] mx-auto py-12 px-4 ">
      <AnimatedSection direction="left">
        <div className="text-center mb-10">
          <h2 className="text-3xl font-bold tracking-tight text-black bg-clip-text">
            Nos Tarifs
          </h2>
          <p className="text-black mt-4 max-w-2xl mx-auto">
          Choisissez le forfait qui correspond à vos besoins. Des tarifs spéciaux sont disponibles pour les étudiants.
          </p>
        </div>
      </AnimatedSection>

      <Tabs defaultValue="Étudiant" className="w-full max-w-5xl mx-auto">
        <div className="flex justify-center mb-8">
          <TabsList className="grid w-full max-w-md grid-cols-2 p-1  rounded-full">
            <TabsTrigger
              value="Étudiant"
              className=" font-bold rounded-full data-[state=active]:bg-black data-[state=active]:text-white"
            >
              Étudiant
            </TabsTrigger>
            <TabsTrigger
              value="Particulier"
              className="font-bold text-black rounded-full data-[state=active]:bg-black data-[state=active]:text-white"
            >
              Particulier
            </TabsTrigger>
          </TabsList>
        </div>

        {(["Étudiant", "Particulier"] as const).map((type) => (
          <TabsContent key={type} value={type} className="space-y-8 mt-4">
            <div className="grid gap-6 md:grid-cols-3">
              {pricing[type].map((plan: PricingPlan, index: number) => (
                <AnimatedSection
                  key={index}
                  direction={window.innerWidth >= 768 ? (index === 0 ? "left" : index === 2 ? "right" : "down") : "left"}
                  index={index}
                >
                  <Card
                    key={index}
                    className={`flex flex-col transform transition-all duration-300 hover:scale-105 ${plan.popular ? "border-primary shadow-xl relative" : "hover:shadow-lg"}`}
                  >
                    {plan.popular && (
                      <div className="absolute top-0 right-0 transform translate-x-2 -translate-y-2">
                        <span className="bg-gradient-to-r from-vibrant-pink to-vibrant-purple text-white text-xs font-semibold px-4 py-1 rounded-full shadow-md">
                          Populaire
                        </span>
                      </div>
                    )}
                    <div className={`h-2 w-full rounded-t-lg ${plan.color}`}></div>
                    <CardHeader>
                      <CardTitle className={`text-2xl text-center font-bold ${plan.popular ? "text-vibrant-purple" : ""}`}>
                        {plan.name}
                      </CardTitle>
                      <CardDescription className="text-center">{plan.description}</CardDescription>
                    </CardHeader>
                    <CardContent className="flex-grow flex justify-center items-center">
                      <div className="text-center ">
                        <span className={`text-5xl  font-bold ${plan.popular ? "text-vibrant-purple" : ""}`}>
                          {plan.price}
                        </span>
                      </div>
                      {/* <ul className="space-y-3 mt-4">
                        {plan.features.map((feature: string, i: number) => (
                          <li key={i} className="flex items-center">
                            <div className={`rounded-full p-1 mr-2 ${plan.color}`}>
                              <Check className="h-3 w-3 text-white" />
                            </div>
                            <span className="text-sm">{feature}</span>
                          </li>
                        ))}
                      </ul> */}
                    </CardContent>
                    <CardFooter>
                      <Button
                        className={`w-full rounded-full transition-all duration-300 hover:shadow-lg ${plan.popular ? `${plan.color} hover:opacity-90` : "bg-white hover:bg-gray-50 text-gray-800 border-2 border-gray-200"}`}
                        variant={plan.popular ? "default" : "outline"}
                      >
                        Commander maintenant
                      </Button>
                    </CardFooter>
                  </Card>
                </AnimatedSection>
              ))}
            </div>
          </TabsContent>
        ))}
      </Tabs>

      <div className="text-center mt-12 text-sm text-muted-foreground">
        <p>Tous les forfaits sont assortis d&apos;une garantie de satisfaction. Vous n&apos;êtes pas satisfait ? Nous réviserons le texte jusqu&apos;à ce que vous le soyez.</p>
        <p className="mt-2">
        Vous avez besoin d&apos;une solution personnalisée ?{" "}
          <a href="#" className="text-vibrant-purple font-medium hover:text-vibrant-pink underline transition-colors">
          Contactez-nous
          </a>{" "}
          pour une tarification personnalisée.
        </p>
      </div>
    </section>
  )
}