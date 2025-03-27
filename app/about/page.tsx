"use client"

import dynamic from 'next/dynamic';
import React from 'react'
const About = dynamic(() => import("@/components/About"), { ssr: false });

const page = () => {
  return (
    <div>
      <About />
    </div>
  )
}

export default page