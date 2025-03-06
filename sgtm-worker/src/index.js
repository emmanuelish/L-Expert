const worker = {
  async fetch(request) {
    const url = new URL(request.url);
    const { pathname } = url;
    
    // Handle both /gtm.js and /gtm/gtm.js formats
    if (pathname.includes('gtm.js')) {
      const gtmPath = pathname.startsWith('/gtm/') ? pathname : `/gtm${pathname}`;
      const gtmUrl = `https://www.googletagmanager.com${gtmPath}${url.search}`;
      
      try {
        // Fetch the GTM container
        const response = await fetch(gtmUrl);
        
        if (!response.ok) {
          return new Response(`Error fetching GTM: ${response.status}`, { 
            status: response.status 
          });
        }
        
        // Clone the response so we can read and modify it
        const originalResponse = await response.clone();
        let text = await originalResponse.text();
        
        // Create a modified response with appropriate CORS headers
        return new Response(text, {
          headers: {
            'Content-Type': 'application/javascript',
            'Access-Control-Allow-Origin': '*',
            'Cache-Control': 'public, max-age=7200'
          }
        });
      } catch (error) {
        return new Response(`Error: ${error.message}`, { status: 500 });
      }
    }
    
    // Return a simple response for other paths
    return new Response('GTM Worker is running. Use /gtm.js?id=YOUR_GTM_ID to access your container.', {
      headers: { 'Content-Type': 'text/plain' }
    });
  }
};

export default worker;