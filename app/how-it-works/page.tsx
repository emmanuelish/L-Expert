"use client"

import dynamic from 'next/dynamic';
import React from 'react'
const HowItWorks = dynamic(() => import("@/components/HowItWorks"), { ssr: false });

const page = () => {
  return (
    <div>
      <HowItWorks />
    </div>
  )
}

export default page