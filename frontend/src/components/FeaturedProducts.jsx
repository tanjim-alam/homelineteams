'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { ChevronRight, Star, ShoppingCart, Heart, ArrowRight } from 'lucide-react';
import ProductCard from './ProductCard';
import api from '@/services/api';

export default function FeaturedProducts() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchFeaturedProducts = async () => {
      try {
        setLoading(true);
        const data = await api.getFeaturedProducts(8);
        console.log('Featured products fetched:', { count: data?.length, data });
        setProducts(data || []);
      } catch (err) {
        console.error('Error fetching featured products:', err);
        setError(err.message);
        // Fallback to sample data with proper structure for new ProductCard
      } finally {
        setLoading(false);
      }
    };

    fetchFeaturedProducts();
  }, []);

  if (loading) {
    return (
      <section className="section-padding bg-white">
        <div className="container-custom">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              Featured{' '}
              <span className="text-gradient">Products</span>
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Discover our handpicked selection of premium home furnishings
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[...Array(8)].map((_, i) => (
              <div key={i} className="animate-pulse">
                <div className="bg-gray-200 h-64 rounded-2xl mb-4"></div>
                <div className="bg-gray-200 h-6 rounded mb-2"></div>
                <div className="bg-gray-200 h-4 rounded w-2/3 mb-2"></div>
                <div className="bg-gray-200 h-6 rounded w-1/3"></div>
              </div>
            ))}
          </div>
        </div>
      </section>
    );
  }

  if (error) {
    console.error('Featured products loading error:', error);
  }

  return (
    <section className="section-padding bg-white">
      <div className="container-custom">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            Featured{' '}
            <span className="text-gradient">Products</span>
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Discover our handpicked selection of premium home furnishings
          </p>
        </div>
        
        {products.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-gray-500 text-lg">No featured products available at the moment.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-12">
            {products.slice(0, 8).map((product) => (
              <ProductCard key={product._id} product={product} />
            ))}
          </div>
        )}
        
        {/* Debug info - remove this in production */}
        {process.env.NODE_ENV === 'development' && (
          <div className="text-center text-xs text-gray-400 mb-4">
            Showing {Math.min(products.length, 8)} of {products.length} products
          </div>
        )}
        
        <div className="text-center">
          <Link href="#">
            <button className="btn-primary group flex items-center gap-2 mx-auto">
              <span>View All Products</span>
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-300" />
            </button>
          </Link>
        </div>
      </div>
    </section>
  );
}
