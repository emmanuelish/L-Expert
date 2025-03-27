"use client"

import dynamic from 'next/dynamic';
import React from 'react'
const Pricing = dynamic(() => import("@/components/Pricing"), { ssr: false });

const page = () => {
  return (
    <Pricing />
  )
}

export default page