"use client";

import dynamic from "next/dynamic";
import Hero from "./Hero";
import Testimonials from "./Testimonials";

const TrustLogos = dynamic(() => import("./TrustLogos"), { ssr: false });
const Features = dynamic(() => import("./Features"), { ssr: false });
const EverythingYouNeed = dynamic(() => import("./EverythingYouNeed"), { ssr: false });
const Solutions = dynamic(() => import("./Solutions"), { ssr: false });
const CtaSection = dynamic(() => import("./CtaSection"), { ssr: false });
const About = dynamic(() => import("./About"), { ssr: false });
const Footer = dynamic(() => import("./Footer"), { ssr: false });

export default function DynamicSections() {
  return (
    <>
      <Hero />
      <Features />
      <TrustLogos />
      <Testimonials />
      <EverythingYouNeed />
      <Solutions />
      <CtaSection />
      <About />
      <Footer />
    </>
  );
}
