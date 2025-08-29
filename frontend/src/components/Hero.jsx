'use client';

import { ShoppingBag, Star, ArrowRight, CheckCircle, Sparkles, TrendingUp, Zap, Shield } from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';
import { useState, useEffect } from 'react';

const Hero = () => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  // Background images for the sliding carousel
  const backgroundImages = [
    '/hero-bg-1.jpg', // Curtains and drapes
    '/hero-bg-2.jpg', // Wallpapers and patterns
    '/hero-bg-3.jpg', // Cushions and upholstery
  ];

  // Auto-slide background images
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex((prevIndex) => 
        (prevIndex + 1) % backgroundImages.length
      );
    }, 5000); // Change image every 5 seconds

    return () => clearInterval(interval);
  }, [backgroundImages.length]);

  return (
    <section className="relative bg-white">
      {/* Main Hero Banner with Sliding Background */}
      <div className="relative min-h-screen flex items-center overflow-hidden">
        {/* Sliding Background Images */}
        <div className="absolute inset-0">
          {backgroundImages.map((image, index) => (
            <div
              key={index}
              className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${
                index === currentImageIndex ? 'opacity-100' : 'opacity-0'
              }`}
            >
              <div className="absolute inset-0 bg-black/40 z-10" /> {/* Dark overlay */}
              <Image
                src={image}
                alt={`Hero background ${index + 1}`}
                fill
                className="object-cover"
                priority={index === 0}
              />
            </div>
          ))}
        </div>

        {/* Content Overlay */}
        <div className="relative z-20 container-custom py-4">
          <div className="flex justify-between gap-12 items-center">
            
            {/* Left Content */}
            <div className="space-y-8 text-white">
              {/* Trust Badge */}
              <div className="inline-flex items-center gap-2 bg-white/20 backdrop-blur-sm border border-white/30 px-4 py-2 rounded-full shadow-lg">
                <div className="flex items-center gap-1">
                  <Star className="w-4 h-4 text-yellow-400 fill-current" />
                  <span className="text-sm font-medium text-white">4.8/5 Rating</span>
                </div>
                <span className="text-xs text-white/70">•</span>
                <span className="text-sm text-white/90">50,000+ Happy Customers</span>
              </div>
              
              {/* Main Heading */}
              <div className="space-y-6">
                <h1 className="text-4xl lg:text-6xl font-bold leading-tight text-white">
                  Transform Your Home with
                  <span className="block text-yellow-300">Premium Furnishings</span>
                </h1>
                
                {/* <p className="text-lg lg:text-xl text-white/90 leading-relaxed max-w-xl">
                  Discover 2000+ designs, 1200+ colors, and customizable options for curtains, wallpapers, cushions, and more. Made thoughtfully for Indian homes.
                </p> */}
              </div>

              {/* CTA Buttons */}
              <div className="flex flex-col sm:flex-row gap-4">
                <Link href="/collections">
                  <button className="bg-white text-gray-900 hover:bg-gray-100 px-8 py-4 text-lg font-semibold rounded-lg transition-all duration-300 group flex items-center gap-2 shadow-lg">
                    <span>Shop Now</span>
                    <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-300" />
                  </button>
                </Link>
                <Link href="/collections/curtains">
                  <button className="border-2 border-white text-white hover:bg-white hover:text-gray-900 px-8 py-4 text-lg font-semibold rounded-lg transition-all duration-300 group flex items-center gap-2 backdrop-blur-sm">
                    <span>View Curtains</span>
                  </button>
                </Link>
              </div>

              {/* Trust Indicators */}
              <div className="flex flex-wrap gap-4 pt-4">
                <div className="flex items-center gap-2 text-sm text-white/90">
                  <CheckCircle className="w-4 h-4 text-green-400" />
                  <span>Free Shipping</span>
                </div>
                <div className="flex items-center gap-2 text-sm text-white/90">
                  <CheckCircle className="w-4 h-4 text-green-400" />
                  <span>Easy Returns</span>
                </div>
                <div className="flex items-center gap-2 text-sm text-white/90">
                  <CheckCircle className="w-4 h-4 text-green-400" />
                  <span>24/7 Support</span>
                </div>
              </div>
            </div>

            {/* Right Hero Image */}
            <div className="relative">
              <div className="relative w-full max-w-md  bg-white/95 backdrop-blur-sm rounded-xl shadow-xl p-4 transform hover:scale-105 transition-all duration-500">
                <div className="w-full max-w-md h-64 bg-gradient-to-br from-primary-100 via-pink-100 to-purple-100 rounded-lg flex items-center justify-center relative overflow-hidden">
                  {/* Product Showcase */}
                  <div className="text-center z-10">
                    <div className="w-20 h-20 bg-gradient-to-br from-primary-200 to-pink-200 rounded-full flex items-center justify-center mx-auto mb-4 shadow-lg">
                      <ShoppingBag className="w-10 h-10 text-primary-600" />
                    </div>
                    <h3 className="text-lg font-bold text-gray-800 mb-2">Premium Home Furnishings</h3>
                    <p className="text-gray-600 text-sm">Transform your space with style</p>
                  </div>
                  
                  {/* Floating Elements */}
                  <div className="absolute top-4 right-4 w-12 h-12 bg-white/30 rounded-full backdrop-blur-sm"></div>
                  <div className="absolute bottom-4 left-4 w-8 h-8 bg-white/30 rounded-full backdrop-blur-sm"></div>
                </div>
                
                {/* Stats Cards */}
                <div className="grid grid-cols-3 gap-3 mt-4">
                  <div className="text-center p-2 bg-gray-50 rounded-lg">
                    <div className="text-sm font-bold text-primary-600">2000+</div>
                    <div className="text-xs text-gray-600">Designs</div>
                  </div>
                  <div className="text-center p-2 bg-gray-50 rounded-lg">
                    <div className="text-sm font-bold text-blue-600">1200+</div>
                    <div className="text-xs text-gray-600">Colors</div>
                  </div>
                  <div className="text-center p-2 bg-gray-50 rounded-lg">
                    <div className="text-sm font-bold text-green-600">100%</div>
                    <div className="text-xs text-gray-600">Customizable</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Background Image Navigation Dots */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-30 flex gap-3">
          {backgroundImages.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentImageIndex(index)}
              className={`w-3 h-3 rounded-full transition-all duration-300 ${
                index === currentImageIndex 
                  ? 'bg-white scale-125' 
                  : 'bg-white/50 hover:bg-white/75'
              }`}
            />
          ))}
        </div>

        {/* Scroll Indicator */}
        <div className="absolute bottom-8 right-8 z-30">
          <div className="w-6 h-10 border-2 border-white/50 rounded-full flex justify-center">
            <div className="w-1 h-3 bg-white rounded-full mt-2 animate-bounce-gentle" />
          </div>
        </div>
      </div>

    </section>
  );
};

export default Hero;
