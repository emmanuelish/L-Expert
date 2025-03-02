const worker = {
  async fetch(request) {
    const { pathname } = new URL(request.url);
    
    // Only process requests for the GTM container
    if (pathname.startsWith('/gtm')) {
      const gtmUrl = `https://www.googletagmanager.com${pathname}`;
      
      // Fetch the GTM container
      const response = await fetch(gtmUrl);
      
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
    }
    
    // Return a simple response for other paths
    return new Response('GTM Worker is running. Use /gtm/... paths to access your container.', {
      headers: { 'Content-Type': 'text/plain' }
    });
  }
};

export default worker;