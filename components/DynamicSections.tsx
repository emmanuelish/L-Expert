"use client";

import dynamic from "next/dynamic";
import Hero from "./Hero";
import Testimonials from "./Testimonials";

const Features = dynamic(() => import("./Features"), { ssr: false });
const HowItWorks = dynamic(() => import("./HowItWorks"), { ssr: false });
const Solutions = dynamic(() => import("./Solutions"), { ssr: false });
const CtaSection = dynamic(() => import("./CtaSection"), { ssr: false });
const About = dynamic(() => import("./About"), { ssr: false });
const Footer = dynamic(() => import("./Footer"), { ssr: false });

export default function DynamicSections() {
  return (
    <>
      <Hero />
      <Features />
      {/* <TrustLogos /> */}
      <Testimonials />
      <HowItWorks />
      <Solutions />
      <CtaSection />
      <About />
      <Footer />
    </>
  );
}
