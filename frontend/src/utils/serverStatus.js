// Server status utility
class ServerStatus {
  constructor() {
    this.isOnline = false;
    this.lastCheck = null;
    this.checkInterval = 30000; // Check every 30 seconds
  }

  async checkServerStatus() {
    try {
      // Skip health check in production to prevent errors
      const isProduction = typeof window !== 'undefined' && 
        (window.location.hostname.includes('vercel.app') || 
         window.location.hostname.includes('homelineteams'));
      
      if (isProduction) {
        this.isOnline = true; // Assume online in production
        this.lastCheck = new Date();
        return true;
      }

      const apiBaseUrl = process.env.NEXT_PUBLIC_API_BASE_URL || 
        (typeof window !== 'undefined' && window.location.hostname === 'localhost' 
          ? 'http://localhost:5000' 
          : 'https://homelineteams-production.up.railway.app');

      const response = await fetch(`${apiBaseUrl}/api/health`, {
        method: 'GET',
        timeout: 5000
      });
      
      this.isOnline = response.ok;
      this.lastCheck = new Date();
      return this.isOnline;
    } catch (error) {
      console.warn('Backend server is not available:', error.message);
      this.isOnline = false;
      this.lastCheck = new Date();
      return false;
    }
  }

  async getStatus() {
    // If we haven't checked recently, check now
    if (!this.lastCheck || (Date.now() - this.lastCheck.getTime()) > this.checkInterval) {
      await this.checkServerStatus();
    }
    return this.isOnline;
  }

  // Get fallback data for different endpoints
  getFallbackData(endpoint) {
    const fallbackData = {
      '/api/categories': [
        { _id: '1', slug: 'curtains', name: 'Curtains' },
        { _id: '2', slug: 'table-runners', name: 'Table Runners' },
        { _id: '3', slug: 'cushions', name: 'Cushions' },
        { _id: '4', slug: 'bedding', name: 'Bedding' }
      ],
      '/api/products': [],
      '/api/hero-section': {
        success: true,
        data: {
          backgroundImages: [
            { imageUrl: '/mobileheroimg1.png', altText: 'Hero Background 1', isActive: true },
            { imageUrl: '/mobileheroimg.jpg', altText: 'Hero Background 2', isActive: true },
            { imageUrl: '/mobileheroimg2.png', altText: 'Hero Background 3', isActive: true },
            { imageUrl: '/mobileheroimg3.png', altText: 'Hero Background 4', isActive: true }
          ],
          categories: [
            { imageUrl: 'https://www.vijayhomeservices.com/static/media/vp1.126c81b8638d44a4a4a1.png', title: 'Home Cleaning', link: '/collections/home-cleaning', altText: 'Home Cleaning', isActive: true },
            { imageUrl: 'https://www.vijayhomeservices.com/static/media/vp1.126c81b8638d44a4a4a1.png', title: 'Kitchen Cleaning', link: '/collections/kitchen-cleaning', altText: 'Kitchen Cleaning', isActive: true },
            { imageUrl: 'https://www.vijayhomeservices.com/static/media/vp1.126c81b8638d44a4a4a1.png', title: 'Bathroom Cleaning', link: '/collections/bathroom-cleaning', altText: 'Bathroom Cleaning', isActive: true },
            { imageUrl: 'https://www.vijayhomeservices.com/static/media/vp1.126c81b8638d44a4a4a1.png', title: 'Pest Control', link: '/collections/pest-control', altText: 'Pest Control', isActive: true }
          ],
          sliderSettings: {
            autoSlide: true,
            slideInterval: 3000,
            transitionDuration: 1000
          }
        }
      }
    };

    return fallbackData[endpoint] || null;
  }
}

export const serverStatus = new ServerStatus();
export default serverStatus;
