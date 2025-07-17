"use client";

import Image from "next/image";

interface HeroBannerProps {
  companyLogo?: string;
  bannerImage: string;
  companyName: string;
}

export function HeroBanner({ bannerImage, companyName }: HeroBannerProps) {
  return (
    <div className=" py-6">
      <div className="max-w-7xl mx-auto px-6">
        <div className="relative h-48 bg-gradient-to-r from-purple-100 to-purple-200 overflow-hidden rounded-2xl">
          <Image
            src={bannerImage || "/images/job-banner.jpg"}
            alt={`${companyName} banner`}
            fill
            className="object-cover rounded-2xl"
          />
          <div className="absolute inset-0 bg-black bg-opacity-20 rounded-2xl" />
        </div>
      </div>
    </div>
  );
}
