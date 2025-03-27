"use client";

import dynamic from "next/dynamic";
import Hero from "./Hero";

const Features = dynamic(() => import("./Features"), { ssr: false });
const HowItWorks = dynamic(() => import("./HowItWorks"), { ssr: false });
const Testimonials = dynamic(() => import("./Testimonials"), { ssr: false });
const Pricing = dynamic(() => import("./Pricing"), { ssr: false });
const Solutions = dynamic(() => import("./Solutions"), { ssr: false });
const CtaSection = dynamic(() => import("./CtaSection"), { ssr: false });
const About = dynamic(() => import("./About"), { ssr: false });

export default function DynamicSections() {
  return (
    <>
      <Hero />
      <Features />
      {/* <TrustLogos /> */}
      <Testimonials />
      <HowItWorks />
      <Pricing />
      <Solutions />
      <CtaSection />
      <About />
    </>
  );
}
