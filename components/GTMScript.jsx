'use client';

import { useEffect } from 'react';

const GTMScript = () => {
  useEffect(() => {
    // Your sGTM Worker URL
    const sgtmUrl = 'https://sgtm-worker.emmanuelowouko.workers.dev'; // Replace with your actual Worker URL
    const containerId = 'GTM-PZ2F4W5D'; // Replace with your GTM container ID
    
    // Initialize dataLayer
    window.dataLayer = window.dataLayer || [];
    
    // Modified GTM script to use your Cloudflare Worker
    (function(w,d,s,l,i){
      w[l]=w[l]||[];w[l].push({'gtm.start':
      new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
      j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;
      j.src=sgtmUrl+'/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
    })(window,document,'script','dataLayer',containerId);
  }, []);
  
  return null;
}

export default GTMScript