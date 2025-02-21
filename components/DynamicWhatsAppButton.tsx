"use client";

import dynamic from "next/dynamic";

const DynamicWhatsAppButton = dynamic(() => import("./WhatsAppButton"), { ssr: false });

export default DynamicWhatsAppButton;
