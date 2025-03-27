"use client"

import dynamic from 'next/dynamic';
import React from 'react'
const Features = dynamic(() => import("@/components/Features"), { ssr: false });
const Testimonials = dynamic(() => import("@/components/Testimonials"), { ssr: false });

const page = () => {
  return (
    <div>
      <Features />
      <Testimonials />
    </div>
  )
}

export default page