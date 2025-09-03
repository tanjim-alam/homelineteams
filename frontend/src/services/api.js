const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || 'https://homelineteams-production.up.railway.app';

class ApiService {
  constructor() {
    this.baseURL = API_BASE_URL;
  }

  async request(endpoint, options = {}) {
    const url = `${this.baseURL}${endpoint}`;
    const config = {
      headers: {
        'Content-Type': 'application/json',
        ...options.headers,
      },
      ...options,
    };

    try {
      const response = await fetch(url, config);
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      return await response.json();
    } catch (error) {
      throw error;
    }
  }

  // Health check
  async healthCheck() {
    return this.request('/api/health');
  }

  // Categories
  async getCategories() {
    return this.request('/api/categories');
  }

  async getCategoryById(id) {
    return this.request(`/api/categories/id/${id}`);
  }

  async getCategoryBySlug(slug) {
    return this.request(`/api/categories/${slug}`);
  }

  async getCategoryFilterOptions(slug) {
    return this.request(`/api/categories/${slug}/filter-options`);
  }

  // Products
  async getProducts(params = {}) {
    const queryString = new URLSearchParams(params).toString();
    const endpoint = queryString ? `/api/products?${queryString}` : '/api/products';
    return this.request(endpoint);
  }

  async getProductBySlug(slug) {
    return this.request(`/api/products/${slug}`);
  }

  async getProductsByCategory(categoryId, params = {}) {
    // Convert complex objects to JSON strings for backend
    const processedParams = { ...params };
    
    if (params.priceRange) {
      processedParams.priceRange = JSON.stringify(params.priceRange);
    }
    if (params.brands && Array.isArray(params.brands)) {
      processedParams.brands = JSON.stringify(params.brands);
    }
    if (params.ratings && Array.isArray(params.ratings)) {
      processedParams.ratings = JSON.stringify(params.ratings);
    }
    if (params.availability && Array.isArray(params.availability)) {
      processedParams.availability = JSON.stringify(params.availability);
    }
    
    // Handle dynamic filters
    Object.keys(params).forEach(key => {
      if (key !== 'priceRange' && key !== 'brands' && key !== 'ratings' && key !== 'availability' && key !== 'sort' && key !== 'limit') {
        if (Array.isArray(params[key])) {
          processedParams[key] = JSON.stringify(params[key]);
        }
      }
    });
    
    const queryString = new URLSearchParams({ categoryId, ...processedParams }).toString();
    
    return this.request(`/api/products?${queryString}`);
  }

  async getFeaturedProducts(limit = 8) {
    try {
      // Try to get featured products first
      const featured = await this.request(`/api/products?featured=true&limit=${limit}`);
      if (featured && Array.isArray(featured) && featured.length > 0) {
        return featured;
      }
      
      // Fallback to getting latest products with limit
      const latest = await this.request(`/api/products?limit=${limit}`);
      return latest || [];
    } catch (error) {
      // Final fallback - get all products and limit on frontend
      try {
        const allProducts = await this.request('/api/products');
        return Array.isArray(allProducts) ? allProducts.slice(0, limit) : [];
      } catch (fallbackError) {
        return [];
      }
    }
  }

  // Search
  async searchProducts(query, params = {}) {
    const searchParams = new URLSearchParams({ q: query, ...params }).toString();
    return this.request(`/api/products/search?${searchParams}`);
  }

  // Collections
  async getCollections() {
    // For now, we'll use categories as collections
    return this.request('/api/categories');
  }

  // Orders
  async createOrder(orderData) {
    return this.request('/api/orders', {
      method: 'POST',
      body: JSON.stringify(orderData),
    });
  }

  // Utility methods
  async getProductVariants(productId) {
    const product = await this.getProductBySlug(productId);
    return product.variants || [];
  }

  async getCategoryProducts(categorySlug, params = {}) {
    const category = await this.getCategoryBySlug(categorySlug);
    if (!category) throw new Error('Category not found');
    
    return this.getProductsByCategory(category._id, params);
  }
}

const apiService = new ApiService();
export default apiService;
