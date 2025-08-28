'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { ChevronRight, Star, ShoppingCart, Heart } from 'lucide-react';
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
        setProducts(data);
      } catch (err) {
        console.error('Error fetching featured products:', err);
        setError(err.message);
        // Fallback to sample data with proper structure
        setProducts([
          {
            _id: '1',
            name: 'Modern Kitchen Curtains',
            slug: 'modern-kitchen-curtains',
            description: 'Elegant kitchen curtains with modern design',
            basePrice: 89.99,
            mainImages: ['/images/kitchen-curtains.jpg'],
            variants: [
              { 
                price: 89.99, 
                mrp: 129.99, 
                discount: 31, 
                stock: 15,
                fields: { size: 'Standard', color: 'White' }
              }
            ],
            hasVariants: false,
            categoryId: 'kitchen-dining'
          },
          {
            _id: '2',
            name: 'Living Room Blinds',
            slug: 'living-room-blinds',
            description: 'Stylish blinds for your living room',
            basePrice: 149.99,
            mainImages: ['/images/living-room-blinds.jpg'],
            variants: [
              { 
                price: 149.99, 
                mrp: 199.99, 
                discount: 25, 
                stock: 8,
                fields: { size: 'Large', color: 'Beige' }
              }
            ],
            hasVariants: false,
            categoryId: 'living-room'
          },
          {
            _id: '3',
            name: 'Bedroom Curtains Set',
            slug: 'bedroom-curtains-set',
            description: 'Complete bedroom curtains set',
            basePrice: 129.99,
            mainImages: ['/images/bedroom-curtains.jpg'],
            variants: [
              { 
                price: 129.99, 
                mrp: 179.99, 
                discount: 28, 
                stock: 12,
                fields: { size: 'Queen', color: 'Blue' }
              }
            ],
            hasVariants: false,
            categoryId: 'bedroom'
          },
          {
            _id: '4',
            name: 'Bathroom Window Treatment',
            slug: 'bathroom-window-treatment',
            description: 'Water-resistant bathroom curtains',
            basePrice: 69.99,
            mainImages: ['/images/bathroom-curtains.jpg'],
            variants: [
              { 
                price: 69.99, 
                mrp: 99.99, 
                discount: 30, 
                stock: 20,
                fields: { size: 'Small', color: 'Gray' }
              }
            ],
            hasVariants: false,
            categoryId: 'bathroom'
          }
        ]);
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
            {[...Array(4)].map((_, i) => (
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
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
          {products.map((product) => (
            <ProductCard key={product._id} product={product} />
          ))}
        </div>
        
        <div className="text-center">
          <Link href="/collections" className="btn-primary group">
            View All Products
            <ChevronRight className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-300" />
          </Link>
        </div>
      </div>
    </section>
  );
}
