'use client';

import { ShoppingBag, Star, ArrowRight, CheckCircle, Sparkles } from 'lucide-react';
import Link from 'next/link';

const Hero = () => {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-br from-slate-50 via-white to-primary-50 pt-2">
      {/* Background Elements */}
      <div className="absolute inset-0">
        {/* Animated Background Shapes */}
        <div className="absolute top-20 left-10 w-72 h-72 bg-gradient-to-r from-primary-100 to-pink-100 rounded-full mix-blend-multiply filter blur-3xl opacity-70 animate-float"></div>
        <div className="absolute top-40 right-10 w-72 h-72 bg-gradient-to-r from-blue-100 to-purple-100 rounded-full mix-blend-multiply filter blur-3xl opacity-70 animate-float" style={{ animationDelay: '2s' }}></div>
        <div className="absolute -bottom-8 left-20 w-72 h-72 bg-gradient-to-r from-yellow-100 to-orange-100 rounded-full mix-blend-multiply filter blur-3xl opacity-70 animate-float" style={{ animationDelay: '4s' }}></div>
        
        {/* Grid Pattern */}
        <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.1)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.1)_1px,transparent_1px)] bg-[size:50px_50px]"></div>
      </div>

      {/* Content */}
      <div className="relative z-10 container-custom">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          
          {/* Left Section */}
          <div className="text-center lg:text-left space-y-8">
            {/* Trust Badge */}
            <div className="inline-flex items-center gap-3 bg-glass px-6 py-3 rounded-full shadow-lg">
              <div className="flex items-center gap-2">
                <Star className="w-5 h-5 text-yellow-500 fill-current" />
                <span className="text-sm font-semibold text-gray-700">Trusted by 50,000+ Happy Customers</span>
              </div>
              <Sparkles className="w-4 h-4 text-primary-500" />
            </div>
            
            {/* Main Heading */}
            <div className="space-y-6">
              <h1 className="text-5xl lg:text-7xl font-bold leading-tight">
                <span className="text-gray-900">Mindful,</span>
                
                <span className="text-gradient">
                  Colorful
                </span>
                <span className="text-gray-900"> & </span>
                <span className="text-gradient">
                  Playful
                </span>
               
                <span className="text-gray-900"> Home Furnishings</span>
              </h1>
              
              <p className="text-xl text-gray-600 leading-relaxed max-w-2xl mx-auto lg:mx-0">
                Transform your home with thoughtfully made products for Indian homes. From modern wallpapers to colorful cushions, contemporary curtains to ultra-chic upholstery.
              </p>
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
              <Link href="/collections/curtains">
                <button className="btn-primary group flex items-center gap-2">
                  <span>Shop Curtains</span>
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-300" />
                </button>
              </Link>
              <Link href="/collections">
                <button className="btn-secondary group flex items-center gap-2">
                  <ShoppingBag className="w-5 h-5" /> 
                  <span>View All Collections</span>
                </button>
              </Link>
            </div>

            

            {/* Trust Indicators */}
            <div className="flex flex-wrap justify-center lg:justify-start gap-6 pt-4">
              <div className="flex items-center gap-2 text-sm text-gray-600 bg-glass px-4 py-2 rounded-full">
                <CheckCircle className="w-4 h-4 text-green-500" />
                <span>Free Shipping</span>
              </div>
              <div className="flex items-center gap-2 text-sm text-gray-600 bg-glass px-4 py-2 rounded-full">
                <CheckCircle className="w-4 h-4 text-green-500" />
                <span>Easy Returns</span>
              </div>
              <div className="flex items-center gap-2 text-sm text-gray-600 bg-glass px-4 py-2 rounded-full">
                <CheckCircle className="w-4 h-4 text-green-500" />
                <span>24/7 Support</span>
              </div>
            </div>
          </div>

          {/* Right Section (Image) */}
          <div className="flex justify-center lg:justify-end">
            <div className="relative group">
              {/* Main Card */}
              <div className="relative bg-white rounded-3xl shadow-2xl p-6 transform group-hover:scale-105 transition-all duration-500">
                <div className="w-full max-w-lg h-96 bg-gradient-to-br from-primary-100 via-pink-100 to-purple-100 rounded-2xl flex items-center justify-center relative overflow-hidden">
                  {/* Floating Elements */}
                  <div className="absolute top-4 right-4 w-20 h-20 bg-white/20 rounded-full backdrop-blur-sm"></div>
                  <div className="absolute bottom-4 left-4 w-16 h-16 bg-white/20 rounded-full backdrop-blur-sm"></div>
                  
                  <div className="text-center z-10">
                    <div className="w-24 h-24 bg-gradient-to-br from-primary-200 to-pink-200 rounded-full flex items-center justify-center mx-auto mb-4 shadow-lg">
                      <ShoppingBag className="w-12 h-12 text-primary-600" />
                    </div>
                    <h3 className="text-xl font-semibold text-gray-700 mb-2">Beautiful Home Interior</h3>
                    <p className="text-gray-500 text-sm">Premium furnishings for your home</p>
                  </div>
                </div>
                
                {/* Floating Card */}
                <div className="absolute -bottom-4 -left-4 bg-white rounded-2xl shadow-xl p-4 border border-gray-100 transform group-hover:scale-110 transition-transform duration-500">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 bg-gradient-to-br from-primary-100 to-pink-100 rounded-full flex items-center justify-center">
                      <Star className="w-6 h-6 text-primary-600 fill-current" />
                    </div>
                    <div>
                      <div className="text-sm font-semibold text-gray-900">Premium Quality</div>
                      <div className="text-xs text-gray-600">Handcrafted with care</div>
                    </div>
                  </div>
                </div>
                {/* Features Grid */}
            <div className="grid grid-cols-3 gap-8 pt-8">
              <div className="text-center group">
                <div className="w-16 h-16 bg-gradient-to-br from-primary-100 to-primary-200 rounded-2xl flex items-center justify-center mx-auto mb-3 group-hover:scale-110 transition-transform duration-300">
                  <span className="text-2xl font-bold text-primary-600">2000+</span>
                </div>
                <div className="text-sm font-medium text-gray-600">Design Options</div>
              </div>
              <div className="text-center group">
                <div className="w-16 h-16 bg-gradient-to-br from-blue-100 to-blue-200 rounded-2xl flex items-center justify-center mx-auto mb-3 group-hover:scale-110 transition-transform duration-300">
                  <span className="text-2xl font-bold text-blue-600">1200+</span>
                </div>
                <div className="text-sm font-medium text-gray-600">Color Variants</div>
              </div>
              <div className="text-center group">
                <div className="w-16 h-16 bg-gradient-to-br from-green-100 to-green-200 rounded-2xl flex items-center justify-center mx-auto mb-3 group-hover:scale-110 transition-transform duration-300">
                  <span className="text-2xl font-bold text-green-600">100%</span>
                </div>
                <div className="text-sm font-medium text-gray-600">Customizable</div>
              </div>
            </div>
              </div>
            </div>
            
          </div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2">
        <div className="w-6 h-10 border-2 border-gray-300 rounded-full flex justify-center">
          <div className="w-1 h-3 bg-primary-600 rounded-full mt-2 animate-bounce-gentle" />
        </div>
      </div>
    </section>
  );
};

export default Hero;
