'use client';

import { useState } from 'react';
import Link from 'next/link';
import { 
  Home, Calculator, Palette, Ruler, 
  ArrowRight, CheckCircle, Star, 
  Users, Award, Clock, Shield, Package, ChefHat
} from 'lucide-react';
import Metadata from '@/components/Metadata';
import Image from 'next/image';
import api from '@/services/api';

export default function TwoBHKPackagePage() {
  const [activeTab, setActiveTab] = useState('quote');
  const [showDesignSession, setShowDesignSession] = useState(false);
  const [packageConfig, setPackageConfig] = useState({
    kitchenType: '',
    wardrobe1Type: '',
    wardrobe2Type: ''
  });
  const [leadForm, setLeadForm] = useState({
    name: '',
    phone: '',
    city: '',
    homeType: ''
  });
  const [submitting, setSubmitting] = useState(false);

  const handleLeadSubmit = async () => {
    if (!leadForm.name || !leadForm.phone || !leadForm.homeType) {
      alert('Please fill in all required fields');
      return;
    }

    setSubmitting(true);
    try {
      await api.createLead({
        name: leadForm.name,
        phone: leadForm.phone,
        city: leadForm.city,
        homeType: leadForm.homeType,
        sourcePage: '2 BHK Package Page',
        message: 'Interested in 2 BHK interior design package',
        meta: {
          packageConfig,
          page: '2bhk-package'
        }
      });
      
      alert('2 BHK design session booked! Our team will contact you within 24 hours to confirm your appointment.');
      setShowDesignSession(false);
      setLeadForm({ name: '', phone: '', city: '', homeType: '' });
    } catch (error) {
      console.error('Error submitting lead:', error);
      alert('Failed to submit your request. Please try again or contact us directly.');
    } finally {
      setSubmitting(false);
    }
  };

  // Sample package data based on Qarpentri's offerings
  const allPackages = [
    {
      name: "Solid and Natural Teak 2BHK Kitchen - Sliding Wardrobe Package",
      image: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
      price: 136599,
      originalPrice: 142129,
      wardrobes: "2",
      kitchen: "1",
      kitchenType: "L Shape",
      wardrobe1Type: "Sliding Wardrobe",
      wardrobe2Type: "4 Door"
    },
    {
      name: "Mango and ebony full house 2BHK Kitchen - Sliding Wardrobe Package",
      image: "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
      price: 161199,
      originalPrice: 183749,
      wardrobes: "2",
      kitchen: "1",
      kitchenType: "U Shape",
      wardrobe1Type: "Sliding Wardrobe",
      wardrobe2Type: "3 Door"
    },
    {
      name: "Dark Walnut 2 BHK Kitchen-Wardrobe Package",
      image: "https://images.unsplash.com/photo-1556909114-1184ffa95b32?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
      price: 189799,
      originalPrice: 199749,
      wardrobes: "2",
      kitchen: "1",
      kitchenType: "Straight Shape",
      wardrobe1Type: "4 Door",
      wardrobe2Type: "5 Door"
    },
    {
      name: "Mango and Frosty white 2 BHK-Medium Package",
      image: "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
      price: 190699,
      originalPrice: 215124,
      wardrobes: "2",
      kitchen: "1",
      kitchenType: "L Shape",
      wardrobe1Type: "3 Door",
      wardrobe2Type: "4 Door"
    },
    {
      name: "Cream 2BHK Kitchen-Wardrobe Package",
      image: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
      price: 190899,
      originalPrice: 200874,
      wardrobes: "2",
      kitchen: "1",
      kitchenType: "Parallel Shape",
      wardrobe1Type: "2 Door",
      wardrobe2Type: "3 Door"
    },
    {
      name: "Ebony 2 BHK-Medium Package",
      image: "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
      price: 192699,
      originalPrice: 215124,
      wardrobes: "2",
      kitchen: "1",
      kitchenType: "U Shape",
      wardrobe1Type: "5 Door",
      wardrobe2Type: "2 Door"
    },
    {
      name: "Light Wood And Solid 2 BHK Kitchen - Wardrobe Package",
      image: "https://images.unsplash.com/photo-1556909114-1184ffa95b32?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
      price: 200899,
      originalPrice: 211374,
      wardrobes: "2",
      kitchen: "1",
      kitchenType: "Straight Shape",
      wardrobe1Type: "4 Door",
      wardrobe2Type: "4 Door"
    },
    {
      name: "Solid And Neutral 2 BHK Kitchen - Wardrobe Package",
      image: "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
      price: 204499,
      originalPrice: 215124,
      wardrobes: "2",
      kitchen: "1",
      kitchenType: "L Shape",
      wardrobe1Type: "Sliding Wardrobe",
      wardrobe2Type: "5 Door"
    },
    {
      name: "Grey And Mango 2 BHK Kitchen-Wardrobe Package",
      image: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
      price: 206699,
      originalPrice: 217499,
      wardrobes: "2",
      kitchen: "1",
      kitchenType: "Parallel Shape",
      wardrobe1Type: "3 Door",
      wardrobe2Type: "3 Door"
    },
    {
      name: "Brown Teak 2 BHK Kitchen-Wardrobe Package",
      image: "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
      price: 208999,
      originalPrice: 219874,
      wardrobes: "2",
      kitchen: "1",
      kitchenType: "U Shape",
      wardrobe1Type: "4 Door",
      wardrobe2Type: "4 Door"
    },
    {
      name: "Grey and White 2 BHK Kitchen-Wardrobe Package",
      image: "https://images.unsplash.com/photo-1556909114-1184ffa95b32?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
      price: 212799,
      originalPrice: 223874,
      wardrobes: "2",
      kitchen: "1",
      kitchenType: "Straight Shape",
      wardrobe1Type: "5 Door",
      wardrobe2Type: "2 Door"
    },
    {
      name: "Berry And Grey 2 BHK Kitchen - Wardrobe Package",
      image: "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
      price: 213499,
      originalPrice: 224624,
      wardrobes: "2",
      kitchen: "1",
      kitchenType: "L Shape",
      wardrobe1Type: "2 Door",
      wardrobe2Type: "3 Door"
    }
  ];

  // Filter packages based on configuration
  const filteredPackages = allPackages.filter(pkg => {
    const kitchenMatch = !packageConfig.kitchenType || pkg.kitchenType === packageConfig.kitchenType;
    const wardrobe1Match = !packageConfig.wardrobe1Type || pkg.wardrobe1Type === packageConfig.wardrobe1Type;
    const wardrobe2Match = !packageConfig.wardrobe2Type || pkg.wardrobe2Type === packageConfig.wardrobe2Type;
    
    return kitchenMatch && wardrobe1Match && wardrobe2Match;
  });

  return (
    <>
      <Metadata 
        title="2 BHK Complete Interior Package - HomeLine"
        description="Comprehensive interior design package for 2 BHK homes with premium furniture and modern designs. Get instant quotes and 3D visualizations."
        keywords="2 bhk interior design, complete home package, 2 bedroom package, family home design, premium interior design"
      />
      
      <div className="min-h-screen bg-gray-50">
        {/* Hero Section */}
        {/* <div className="relative text-white overflow-hidden min-h-[600px] flex items-center">
          <div className="absolute inset-0">
            <Image 
              src="/interior-design-img.jpg" 
              alt="2 BHK Package Hero Background" 
              fill
              className="object-cover"
              priority
            />
            <div className="absolute inset-0 bg-gradient-to-br from-purple-600/50 via-pink-700/50 to-purple-800/80"></div>
          </div>
          
          <div className="container-custom py-16 sm:py-20 lg:py-24 px-4 sm:px-6 lg:px-8 relative z-10">
            <div className="max-w-4xl mx-auto text-center">
              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-6 leading-tight">
                Complete 2 BHK Interior 
                <span className="block text-yellow-300">Design Package</span>
              </h1>
              <p className="text-lg sm:text-xl text-purple-100 mb-8 max-w-2xl mx-auto">
                Get instant quotes, explore complete home designs, and work with our expert designers to create your perfect 2 BHK space.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link 
                  href="#quote-estimator"
                  className="bg-yellow-400 hover:bg-yellow-500 text-purple-900 font-bold px-8 py-4 text-lg rounded-lg transition-all duration-200 transform hover:scale-105 shadow-lg"
                >
                  Get Your Free 2 BHK Quote
                </Link>
                <Link 
                  href="#package-calculator"
                  className="btn-secondary border-white text-white hover:bg-white hover:text-purple-600 px-8 py-4 text-lg font-semibold"
                >
                  Package Calculator
                </Link>
              </div>
            </div>
          </div>
        </div> */}

        {/* Product Configuration Tool with Fixed Sidebar */}
        <div className="py-16 bg-white">
          <div className="container-custom px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-8">
              <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">2 BHK Package</h2>
              <p className="text-lg text-gray-600">Configure your perfect 2 BHK package</p>
            </div>

            <div className="flex flex-col lg:flex-row gap-8">
              {/* Fixed Sidebar Filter */}
              <div className="lg:w-80 lg:sticky lg:top-8 lg:h-fit">
                <div className="bg-gradient-to-b from-purple-50 to-pink-50 rounded-2xl p-4 border border-purple-100 shadow-lg">
                  <div className="text-center mb-4">
                    <h3 className="text-lg font-bold text-gray-900 mb-1">Filters</h3>
                    <p className="text-xs text-gray-600">{filteredPackages.length} packages found</p>
                  </div>

                  <div className="space-y-4">
                    {/* Kitchen Configuration */}
                    <div className="bg-white rounded-lg p-3 shadow-sm border border-gray-100">
                      <h4 className="text-xs font-semibold text-gray-900 mb-2 flex items-center gap-1">
                        <ChefHat className="w-3 h-3 text-purple-600" />
                        Kitchen Type
                      </h4>
                      <div className="space-y-1">
                        {['L Shape', 'Parallel Shape', 'Straight Shape'].map((type) => (
                          <button
                            key={type}
                            className={`w-full p-2 rounded-md border text-left text-gray-700 transition-all duration-200 ${
                              packageConfig.kitchenType === type
                                ? 'border-purple-600 bg-purple-100 text-purple-900'
                                : 'border-gray-200 hover:border-purple-300 hover:bg-purple-50'
                            }`}
                            onClick={() => setPackageConfig({...packageConfig, kitchenType: type})}
                          >
                            <div className="flex items-center justify-between">
                              <span className="text-xs font-medium">{type}</span>
                              {packageConfig.kitchenType === type && (
                                <CheckCircle className="w-3 h-3 text-purple-600" />
                              )}
                            </div>
                          </button>
                        ))}
                      </div>
                    </div>

                    {/* Wardrobe 1 Configuration */}
                    <div className="bg-white rounded-lg p-3 shadow-sm border border-gray-100">
                      <h4 className="text-xs font-semibold text-gray-900 mb-2 flex items-center gap-1">
                        <Home className="w-3 h-3 text-purple-600" />
                        Wardrobe 1
                      </h4>
                      <div className="grid grid-cols-2 gap-1">
                        {['2 Door', '3 Door', '4 Door', '5 Door', 'Sliding'].map((type) => (
                          <button
                            key={type}
                            className={`w-full p-1.5 rounded-md border text-left text-gray-700 transition-all duration-200 ${
                              packageConfig.wardrobe1Type === type
                                ? 'border-purple-600 bg-purple-100 text-purple-900'
                                : 'border-gray-200 hover:border-purple-300 hover:bg-purple-50'
                            }`}
                            onClick={() => setPackageConfig({...packageConfig, wardrobe1Type: type})}
                          >
                            <div className="flex items-center justify-between">
                              <span className="text-xs font-medium">{type}</span>
                              {packageConfig.wardrobe1Type === type && (
                                <CheckCircle className="w-2 h-2 text-purple-600" />
                              )}
                            </div>
                          </button>
                        ))}
                      </div>
                    </div>

                    {/* Wardrobe 2 Configuration */}
                    <div className="bg-white rounded-lg p-3 shadow-sm border border-gray-100">
                      <h4 className="text-xs font-semibold text-gray-900 mb-2 flex items-center gap-1">
                        <Home className="w-3 h-3 text-purple-600" />
                        Wardrobe 2
                      </h4>
                      <div className="grid grid-cols-2 gap-1">
                        {['2 Door', '3 Door', '4 Door', '5 Door'].map((type) => (
                          <button
                            key={type}
                            className={`w-full p-1.5 rounded-md border text-left text-gray-700 transition-all duration-200 ${
                              packageConfig.wardrobe2Type === type
                                ? 'border-purple-600 bg-purple-100 text-purple-900'
                                : 'border-gray-200 hover:border-purple-300 hover:bg-purple-50'
                            }`}
                            onClick={() => setPackageConfig({...packageConfig, wardrobe2Type: type})}
                          >
                            <div className="flex items-center justify-between">
                              <span className="text-xs font-medium">{type}</span>
                              {packageConfig.wardrobe2Type === type && (
                                <CheckCircle className="w-2 h-2 text-purple-600" />
                              )}
                            </div>
                          </button>
                        ))}
                      </div>
                    </div>
                  </div>

                  <div className="flex flex-col gap-2 mt-4 pt-3 border-t border-purple-200">
                    <button 
                      onClick={() => setPackageConfig({kitchenType: '', wardrobe1Type: '', wardrobe2Type: ''})}
                      className="flex items-center justify-center gap-1 px-3 py-2 text-xs text-gray-500 hover:text-gray-700 hover:bg-gray-100 rounded-md transition-all duration-200"
                    >
                      <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                      </svg>
                      Clear all
                    </button>
                    <button 
                      onClick={() => setShowDesignSession(true)}
                      className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white px-3 py-2 rounded-md text-xs font-semibold shadow-lg transition-all duration-200"
                    >
                      Book Consultation
                    </button>
                  </div>
                </div>
              </div>

              {/* Product Listings */}
              <div className="flex-1">
                {filteredPackages.length > 0 ? (
                  <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                    {filteredPackages.map((pkg, index) => (
                      <div key={index} className="bg-white rounded-xl shadow-lg overflow-hidden border border-gray-200 hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
                        <div className="h-48 bg-cover bg-center bg-no-repeat" style={{backgroundImage: `url("${pkg.image}")`}}>
                          <div className="h-full bg-opacity-20 flex items-end">
                            <div className="p-3 text-white">
                              <p className="text-sm font-medium line-clamp-2">{pkg.name}</p>
                            </div>
                          </div>
                        </div>
                        <div className="p-4">
                          <h3 className="font-semibold text-gray-900 mb-2 line-clamp-2 text-sm">{pkg.name}</h3>
                          <div className="flex items-center gap-2 mb-2">
                            <span className="text-xs text-gray-600">{pkg.wardrobes} Wardrobe</span>
                            <span className="text-xs text-gray-600">•</span>
                            <span className="text-xs text-gray-600">{pkg.kitchen} Kitchen</span>
                          </div>
                          <div className="flex items-center gap-2 mb-3">
                            <span className="text-xs text-gray-500">*Excluding applicable taxes</span>
                          </div>
                          <div className="flex items-center gap-2 mb-3">
                            <span className="text-lg font-bold text-gray-900">₹ {pkg.price.toLocaleString()}</span>
                            {pkg.originalPrice && (
                              <span className="text-sm text-gray-500 line-through">₹ {pkg.originalPrice.toLocaleString()}</span>
                            )}
                          </div>
                          <div className="text-xs text-gray-600 mb-3">Delivery in 15 days*</div>
                          <button 
                            onClick={() => setShowDesignSession(true)}
                            className="w-full bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white py-2 rounded-lg font-semibold transition-all duration-200 transform hover:scale-105 text-sm"
                          >
                            Book Consultation
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-16">
                    <div className="w-20 h-20 mx-auto mb-4 bg-gray-100 rounded-full flex items-center justify-center">
                      <Package className="w-10 h-10 text-gray-400" />
                    </div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">No packages found</h3>
                    <p className="text-gray-600 mb-4">Try adjusting your filters to see more options</p>
                    <button 
                      onClick={() => setPackageConfig({kitchenType: '', wardrobe1Type: '', wardrobe2Type: ''})}
                      className="bg-purple-600 hover:bg-purple-700 text-white px-6 py-2 rounded-lg font-semibold transition-all duration-200"
                    >
                      Clear all filters
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Features Section */}
        <div className="py-16 sm:py-20 bg-gray-50">
          <div className="container-custom px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
                Why Choose HomeLine 2 BHK Package?
              </h2>
              <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                We combine technology with expertise to deliver exceptional complete home solutions
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
              {[
                {
                  icon: Calculator,
                  title: "Instant Quotes",
                  description: "Get accurate cost estimates in minutes with our advanced calculator"
                },
                {
                  icon: Palette,
                  title: "Complete Design",
                  description: "Work with certified interior designers with 10+ years experience"
                },
                {
                  icon: Ruler,
                  title: "Precise Measurements",
                  description: "3D visualization and accurate space planning for perfect fit"
                },
                {
                  icon: Shield,
                  title: "Quality Assurance",
                  description: "Premium materials and craftsmanship with 2-year warranty"
                }
              ].map((feature, index) => (
                <div key={index} className="text-center p-6 rounded-2xl bg-white hover:bg-purple-50 transition-colors duration-300">
                  <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <feature.icon className="w-8 h-8 text-purple-600" />
                  </div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">{feature.title}</h3>
                  <p className="text-gray-600 text-sm">{feature.description}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        

        {/* Stats Section */}
        <div className="py-16 sm:py-20 bg-gradient-to-r from-primary-600 to-primary-700 hover:from-primary-600 hover:to-primary-700 text-white">
          <div className="container-custom px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
              {[
                { number: "2000+", label: "2 BHK Projects" },
                { number: "10+", label: "Years Experience" },
                { number: "98%", label: "Customer Satisfaction" },
                { number: "24/7", label: "Support Available" }
              ].map((stat, index) => (
                <div key={index}>
                  <div className="text-3xl sm:text-4xl font-bold mb-2">{stat.number}</div>
                  <div className="text-purple-100">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* CTA Section */}
        <div className="py-16 sm:py-20 bg-gray-900 text-white">
          <div className="container-custom px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold mb-4">
              Ready to Transform Your 2 BHK?
            </h2>
            <p className="text-lg text-gray-300 mb-8 max-w-2xl mx-auto">
              Get in touch with our design experts for a personalized consultation and detailed project planning.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link 
                href="/contact"
                className="btn-primary bg-purple-600 hover:bg-purple-700 px-8 py-4 text-lg font-semibold"
              >
                Schedule Consultation
              </Link>
              <Link 
                href="tel:+91987000000"
                className="btn-secondary border-white text-white hover:bg-white hover:text-gray-900 px-8 py-4 text-lg font-semibold"
              >
                Call Now: +91 98700 0000
              </Link>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}// 2 BHK Quote Estimator Component
function TwoBHKQuoteEstimator() {
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState({
    apartmentType: '',
    rooms: [],
    style: '',
    timeline: '',
    contactInfo: {
      name: '',
      email: '',
      phone: '',
      city: ''
    }
  });

  const steps = [
    { id: 1, title: 'Apartment Type', description: 'Select your apartment type' },
    { id: 2, title: 'Rooms', description: 'Choose rooms to design' },
    { id: 3, title: 'Style & Budget', description: 'Set your design preferences' },
    { id: 4, title: 'Contact Info', description: 'Share your details' }
  ];

  const apartmentTypes = [
    { id: 'standard', name: 'Standard 2 BHK', description: 'Traditional 2 bedroom layout' },
    { id: 'premium', name: 'Premium 2 BHK', description: 'Luxury 2 BHK with modern amenities' },
    { id: 'luxury', name: 'Luxury 2 BHK', description: 'High-end 2 BHK with premium finishes' }
  ];

  const rooms = [
    { id: 'living', name: 'Living Room', icon: '🛋️' },
    { id: 'master-bedroom', name: 'Master Bedroom', icon: '🛏️' },
    { id: 'second-bedroom', name: 'Second Bedroom', icon: '🛏️' },
    { id: 'kitchen', name: 'Kitchen', icon: '🍳' },
    { id: 'bathroom', name: 'Bathroom', icon: '🚿' },
    { id: 'balcony', name: 'Balcony', icon: '🌿' }
  ];

  const handleNext = () => {
    if (currentStep < 4) setCurrentStep(currentStep + 1);
  };

  const handlePrev = () => {
    if (currentStep > 1) setCurrentStep(currentStep - 1);
  };

  const getProjectType = () => {
    const apartmentType = apartmentTypes.find(a => a.id === formData.apartmentType);
    return apartmentType ? `${apartmentType.name} Design` : '2 BHK Design Project';
  };

  return (
    <div className="max-w-2xl mx-auto">
      {/* Progress Bar */}
      <div className="mb-8">
        <div className="flex items-center justify-between mb-4">
          {steps.map((step) => (
            <div key={step.id} className="flex flex-col items-center">
              <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-semibold ${
                currentStep >= step.id 
                  ? 'bg-purple-600 text-white' 
                  : 'bg-gray-200 text-gray-600'
              }`}>
                {currentStep > step.id ? <CheckCircle className="w-5 h-5" /> : step.id}
              </div>
              <div className="text-xs text-center mt-2 hidden sm:block">
                <div className="font-medium">{step.title}</div>
                <div className="text-gray-500">{step.description}</div>
              </div>
            </div>
          ))}
        </div>
        <div className="w-full bg-gray-200 rounded-full h-2">
          <div 
            className="bg-purple-600 h-2 rounded-full transition-all duration-300"
            style={{ width: `${(currentStep / 4) * 100}%` }}
          ></div>
        </div>
      </div>

      {/* Step Content */}
      <div className="mb-8">
        {currentStep === 1 && (
          <div>
            <h3 className="text-xl font-semibold text-gray-900 mb-6">What type of 2 BHK apartment do you have?</h3>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              {apartmentTypes.map((type) => (
                <button
                  key={type.id}
                  onClick={() => setFormData({...formData, apartmentType: type.id})}
                  className={`p-4 rounded-xl border-2 text-left transition-all duration-200 ${
                    formData.apartmentType === type.id
                      ? 'border-purple-600 bg-purple-50'
                      : 'border-gray-200 hover:border-purple-300'
                  }`}
                >
                  <div className="font-semibold text-gray-900">{type.name}</div>
                  <div className="text-sm text-gray-600">{type.description}</div>
                </button>
              ))}
            </div>
          </div>
        )}

        {currentStep === 2 && (
          <div>
            <h3 className="text-xl font-semibold text-gray-900 mb-6">Which rooms would you like to design?</h3>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
              {rooms.map((room) => (
                <button
                  key={room.id}
                  onClick={() => {
                    const newRooms = formData.rooms.includes(room.id)
                      ? formData.rooms.filter(r => r !== room.id)
                      : [...formData.rooms, room.id];
                    setFormData({...formData, rooms: newRooms});
                  }}
                  className={`p-4 rounded-xl border-2 text-center transition-all duration-200 ${
                    formData.rooms.includes(room.id)
                      ? 'border-purple-600 bg-purple-50'
                      : 'border-gray-200 hover:border-purple-300'
                  }`}
                >
                  <div className="text-2xl mb-2">{room.icon}</div>
                  <div className="text-sm font-medium text-gray-900">{room.name}</div>
                </button>
              ))}
            </div>
          </div>
        )}

        {currentStep === 3 && (
          <div>
            <h3 className="text-xl font-semibold text-gray-900 mb-6">Style & Design Preferences</h3>
            <div className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-3">Design Style</label>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                  {['Modern', 'Traditional', 'Contemporary', 'Minimalist', 'Scandinavian', 'Industrial'].map((style) => (
                    <button
                      key={style}
                      onClick={() => setFormData({...formData, style})}
                      className={`p-3 rounded-lg border-2 text-center text-gray-700 transition-all duration-200 ${
                        formData.style === style
                          ? 'border-purple-600 bg-purple-50'
                          : 'border-gray-200 hover:border-purple-300'
                      }`}
                    >
                      {style}
                    </button>
                  ))}
                </div>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-3">Project Timeline</label>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {['ASAP', '1-2 months', '3-6 months', '6+ months'].map((timeline) => (
                    <button
                      key={timeline}
                      onClick={() => setFormData({...formData, timeline})}
                      className={`p-3 rounded-lg border-2 text-center text-gray-700 transition-all duration-200 ${
                        formData.timeline === timeline
                          ? 'border-purple-600 bg-purple-50'
                          : 'border-gray-200 hover:border-purple-300'
                      }`}
                    >
                      {timeline}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}

        {currentStep === 4 && (
          <div>
            <h3 className="text-xl font-semibold text-gray-900 mb-6">Share your contact details</h3>
            <div className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Full Name</label>
                  <input
                    type="text"
                    value={formData.contactInfo.name}
                    onChange={(e) => setFormData({
                      ...formData, 
                      contactInfo: {...formData.contactInfo, name: e.target.value}
                    })}
                    className="w-full px-4 py-3 border border-gray-300 text-gray-700 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                    placeholder="Enter your name"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Phone Number</label>
                  <input
                    type="tel"
                    value={formData.contactInfo.phone}
                    onChange={(e) => setFormData({
                      ...formData, 
                      contactInfo: {...formData.contactInfo, phone: e.target.value}
                    })}
                    className="w-full px-4 py-3 border border-gray-300 text-gray-700 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                    placeholder="+91 98765 43210"
                  />
                </div>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Email Address</label>
                  <input
                    type="email"
                    value={formData.contactInfo.email}
                    onChange={(e) => setFormData({
                      ...formData, 
                      contactInfo: {...formData.contactInfo, email: e.target.value}
                    })}
                    className="w-full px-4 py-3 border border-gray-300 text-gray-700 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                    placeholder="your@email.com"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">City</label>
                  <input
                    type="text"
                    value={formData.contactInfo.city}
                    onChange={(e) => setFormData({
                      ...formData, 
                      contactInfo: {...formData.contactInfo, city: e.target.value}
                    })}
                    className="w-full px-4 py-3 border border-gray-300 text-gray-700 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                    placeholder="Bangalore"
                  />
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Navigation Buttons */}
      <div className="flex justify-between">
        <button
          onClick={handlePrev}
          disabled={currentStep === 1}
          className="px-6 py-3 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          Previous
        </button>
        
        {currentStep < 4 ? (
          <button
            onClick={handleNext}
            className="bg-purple-600 hover:bg-purple-700 text-white px-6 py-3 flex items-center gap-2 rounded-lg"
          >
            Next Step
            <ArrowRight className="w-4 h-4" />
          </button>
        ) : (
          <button
            onClick={() => {
              alert('2 BHK package quote request submitted! Our team will contact you within 24 hours.');
            }}
            className="bg-purple-600 hover:bg-purple-700 text-white px-6 py-3 flex items-center justify-center gap-2 rounded-lg"
          >
            Get Free Quote
            <CheckCircle className="w-4 h-4" />
          </button>
        )}
      </div>

      {/* Project Summary */}
      {currentStep >= 2 && (
        <div className="mt-8 p-4 bg-purple-50 rounded-xl border border-purple-200">
          <div className="text-center">
            <div className="text-sm text-purple-600 font-medium mb-1">Project Summary</div>
            <div className="text-lg font-bold text-purple-700">{getProjectType()}</div>
            <div className="text-xs text-purple-600 mt-1">Our design team will provide a detailed quote after consultation</div>
          </div>
        </div>
      )}
    </div>
  );
}

// 2 BHK Package Calculator Component
function TwoBHKPackageCalculator({ showDesignSession, setShowDesignSession, leadForm, setLeadForm, submitting, handleLeadSubmit }) {
  const [packageData, setPackageData] = useState({
    rooms: [],
    materials: {
      flooring: '',
      paint: '',
      furniture: ''
    },
    features: []
  });

  const rooms = [
    { id: 'living', name: 'Living Room', icon: '🛋️' },
    { id: 'master-bedroom', name: 'Master Bedroom', icon: '🛏️' },
    { id: 'second-bedroom', name: 'Second Bedroom', icon: '🛏️' },
    { id: 'kitchen', name: 'Kitchen', icon: '🍳' },
    { id: 'bathroom', name: 'Bathroom', icon: '🚿' },
    { id: 'balcony', name: 'Balcony', icon: '🌿' }
  ];

  const materials = {
    flooring: [
      { id: 'tiles', name: 'Ceramic Tiles', quality: 'Good', durability: '10+ years' },
      { id: 'vitrified', name: 'Vitrified Tiles', quality: 'Better', durability: '15+ years' },
      { id: 'wood', name: 'Wooden Flooring', quality: 'Best', durability: '20+ years' }
    ],
    paint: [
      { id: 'basic', name: 'Basic Paint', quality: 'Good', durability: '3-5 years' },
      { id: 'premium', name: 'Premium Paint', quality: 'Better', durability: '5-7 years' },
      { id: 'luxury', name: 'Luxury Paint', quality: 'Best', durability: '7+ years' }
    ],
    furniture: [
      { id: 'basic', name: 'Basic Furniture', quality: 'Good', durability: '5-7 years' },
      { id: 'premium', name: 'Premium Furniture', quality: 'Better', durability: '8-10 years' },
      { id: 'luxury', name: 'Luxury Furniture', quality: 'Best', durability: '12+ years' }
    ]
  };

  const features = [
    { id: 'lighting', name: 'LED Lighting', category: 'Lighting' },
    { id: 'storage', name: 'Smart Storage', category: 'Storage' },
    { id: 'ac', name: 'AC Installation', category: 'Comfort' },
    { id: 'security', name: 'Security System', category: 'Security' },
    { id: 'smart', name: 'Smart Home', category: 'Technology' },
    { id: 'garden', name: 'Balcony Garden', category: 'Outdoor' }
  ];

  const getPackageSummary = () => {
    return {
      rooms: packageData.rooms.length,
      features: packageData.features.length
    };
  };

  return (
    <div className="max-w-4xl mx-auto">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Configuration Panel */}
        <div className="space-y-6">
          {/* Rooms */}
          <div>
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Select Rooms</h3>
            <div className="grid grid-cols-2 gap-3">
              {rooms.map((room) => (
                <button
                  key={room.id}
                  onClick={() => {
                    const newRooms = packageData.rooms.includes(room.id)
                      ? packageData.rooms.filter(r => r !== room.id)
                      : [...packageData.rooms, room.id];
                    setPackageData({...packageData, rooms: newRooms});
                  }}
                  className={`p-4 rounded-lg border-2 text-center transition-all duration-200 ${
                    packageData.rooms.includes(room.id)
                      ? 'border-purple-600 bg-purple-50'
                      : 'border-gray-200 hover:border-purple-300'
                  }`}
                >
                  <div className="text-2xl mb-2">{room.icon}</div>
                  <div className="text-sm font-medium text-gray-900">{room.name}</div>
                </button>
              ))}
            </div>
          </div>

          {/* Materials */}
          <div>
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Materials & Finishes</h3>
            <div className="space-y-4">
              {Object.entries(materials).map(([category, options]) => (
                <div key={category}>
                  <label className="block text-sm font-medium text-gray-700 mb-2 capitalize">
                    {category.replace(/([A-Z])/g, ' $1')}
                  </label>
                  <div className="grid grid-cols-1 gap-2">
                    {options.map((option) => (
                      <button
                        key={option.id}
                        onClick={() => setPackageData({
                          ...packageData,
                          materials: {...packageData.materials, [category]: option.id}
                        })}
                        className={`p-3 rounded-lg border-2 text-left transition-all duration-200 ${
                          packageData.materials[category] === option.id
                            ? 'border-purple-600 bg-purple-50'
                            : 'border-gray-200 hover:border-purple-300'
                        }`}
                      >
                        <div className="text-sm font-medium text-gray-900">{option.name}</div>
                        <div className="text-xs text-gray-600">Quality: {option.quality}</div>
                        <div className="text-xs text-gray-500">Durability: {option.durability}</div>
                      </button>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Features */}
          <div>
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Additional Features</h3>
            <div className="grid grid-cols-1 gap-3">
              {features.map((feature) => (
                <button
                  key={feature.id}
                  onClick={() => {
                    const newFeatures = packageData.features.includes(feature.id)
                      ? packageData.features.filter(f => f !== feature.id)
                      : [...packageData.features, feature.id];
                    setPackageData({...packageData, features: newFeatures});
                  }}
                  className={`p-3 rounded-lg border-2 text-left transition-all duration-200 ${
                    packageData.features.includes(feature.id)
                      ? 'border-purple-600 bg-purple-50'
                      : 'border-gray-200 hover:border-purple-300'
                  }`}
                >
                  <div className="text-sm font-medium text-gray-900">{feature.name}</div>
                  <div className="text-xs text-gray-600">{feature.category}</div>
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Project Summary */}
        <div className="lg:sticky lg:top-8">
          <div className="bg-gray-50 rounded-2xl p-6">
            <h3 className="text-xl font-semibold text-gray-900 mb-6">2 BHK Package Summary</h3>
            
            <div className="space-y-4 mb-6">
              {(() => {
                const summary = getPackageSummary();
                return (
                  <>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Selected Rooms</span>
                      <span className="font-medium">{summary.rooms} rooms</span>
                    </div>
                    
                    <div className="flex justify-between">
                      <span className="text-gray-600">Additional Features</span>
                      <span className="font-medium">{summary.features} features</span>
                    </div>
                  </>
                );
              })()}
            </div>

            <div className="border-t border-gray-200 pt-4 mb-6">
              <div className="text-center">
                <div className="text-lg font-bold text-gray-900 mb-2">Ready for Quote?</div>
                <p className="text-sm text-gray-500">
                  Our design team will provide a detailed quote after consultation
                </p>
              </div>
            </div>

            <div className="space-y-3">
              <button 
                onClick={() => setShowDesignSession(true)}
                className="w-full bg-purple-400 hover:bg-purple-500 text-purple-900 font-bold py-3 px-6 rounded-lg transition-all duration-200 transform hover:scale-105"
              >
                BOOK FREE DESIGN SESSION
              </button>
              <button className="w-full bg-purple-600 hover:bg-purple-700 text-white py-3 rounded-lg">
                Get Detailed Quote
              </button>
              <button className="w-full border border-purple-600 text-purple-600 hover:bg-purple-50 py-3 rounded-lg">
                Schedule Site Visit
              </button>
            </div>

            <div className="mt-6 p-4 bg-purple-50 rounded-lg">
              <div className="flex items-center gap-2 text-purple-700 font-medium mb-2">
                <Star className="w-4 h-4" />
                Free Design Consultation
              </div>
              <p className="text-sm text-purple-600">
                Get a personalized 3D design and detailed quote from our expert designers.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Design Session Modal */}
      {showDesignSession && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-bold text-gray-900">Book Free 2 BHK Design Session</h2>
                <button 
                  onClick={() => setShowDesignSession(false)}
                  className="text-gray-400 hover:text-gray-600"
                >
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>

              <div className="space-y-6">
                {/* Home Type Selection */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-3">Home Type</label>
                  <div className="grid grid-cols-2 gap-3">
                    {[
                      { id: '1bhk', name: '1 BHK', description: 'Perfect for small families' },
                      { id: '2bhk', name: '2 BHK', description: 'Ideal for growing families' },
                      { id: '3bhk', name: '3 BHK', description: 'Spacious family homes' },
                      { id: '4bhk', name: '4 BHK', description: 'Luxury family living' }
                    ].map((type) => (
                      <button
                        key={type.id}
                        onClick={() => setLeadForm({ ...leadForm, homeType: type.name })}
                        className={`p-3 rounded-lg border-2 text-center transition-all duration-200 ${leadForm.homeType === type.name ? 'border-purple-400 bg-purple-50' : 'border-gray-200 hover:border-purple-300'}`}
                      >
                        <div className="font-semibold text-gray-900 text-sm">{type.name}</div>
                        <div className="text-xs text-gray-600">{type.description}</div>
                      </button>
                    ))}
                  </div>
                </div>

                {/* Contact Information */}
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Full Name</label>
                    <input
                      type="text"
                      value={leadForm.name}
                      onChange={(e) => setLeadForm({ ...leadForm, name: e.target.value })}
                      className="w-full px-4 py-3 border border-gray-300 text-gray-700 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                      placeholder="Enter your name"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Phone Number</label>
                    <input
                      type="tel"
                      value={leadForm.phone}
                      onChange={(e) => setLeadForm({ ...leadForm, phone: e.target.value })}
                      className="w-full px-4 py-3 border border-gray-300 text-gray-700 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                      placeholder="Enter your phone"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">City</label>
                    <select 
                      value={leadForm.city}
                      onChange={(e) => setLeadForm({ ...leadForm, city: e.target.value })}
                      className="w-full px-4 py-3 border border-gray-300 text-gray-700 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                    >
                      <option value="">Select your city</option>
                      <option value="mumbai">Mumbai</option>
                      <option value="delhi">Delhi</option>
                      <option value="bangalore">Bangalore</option>
                      <option value="hyderabad">Hyderabad</option>
                      <option value="chennai">Chennai</option>
                      <option value="pune">Pune</option>
                      <option value="kolkata">Kolkata</option>
                      <option value="ahmedabad">Ahmedabad</option>
                    </select>
                  </div>
                </div>

                {/* Submit Button */}
                <button 
                  onClick={handleLeadSubmit}
                  disabled={submitting}
                  className={`w-full bg-purple-600 hover:bg-purple-700 text-white font-bold py-4 px-6 rounded-lg transition-all duration-200 transform hover:scale-105 ${submitting ? 'opacity-70 cursor-not-allowed' : 'cursor-pointer'}`}
                >
                  {submitting ? 'Submitting...' : 'Book Free 2 BHK Design Session'}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}


