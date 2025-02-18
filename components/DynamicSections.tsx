"use client";

import dynamic from "next/dynamic";
import Hero from "./Hero";

const TrustLogos = dynamic(() => import("./TrustLogos"), { ssr: false });
const Features = dynamic(() => import("./Features"), { ssr: false });
const TestimonialSection = dynamic(() => import("./TestimonialSection"), { ssr: false });
const EverythingYouNeed = dynamic(() => import("./EverythingYouNeed"), { ssr: false });
const Solutions = dynamic(() => import("./Solutions"), { ssr: false });
const CtaSection = dynamic(() => import("./CtaSection"), { ssr: false });
const About = dynamic(() => import("./About"), { ssr: false });
const Footer = dynamic(() => import("./Footer"), { ssr: false });

export default function DynamicSections() {
  return (
    <>
      <Hero />
      <TrustLogos />
      <Features />
      <TestimonialSection />
      <EverythingYouNeed />
      <Solutions />
      <CtaSection />
      <About />
      <Footer />
    </>
  );
}
