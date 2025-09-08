'use client';

import { useState } from 'react';
import Link from 'next/link';
import { 
  Home, Calculator, Palette, Ruler, 
  ArrowRight, CheckCircle, Star, 
  Users, Award, Clock, Shield, Shirt
} from 'lucide-react';
import Metadata from '@/components/Metadata';
import Image from 'next/image';
import api from '@/services/api';

export default function WardrobesPage() {
  const [activeTab, setActiveTab] = useState('quote');
  const [showDesignSession, setShowDesignSession] = useState(false);
  const [wardrobeConfig, setWardrobeConfig] = useState({
    type: '',
    doors: ''
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
        sourcePage: 'Wardrobes Page',
        message: 'Interested in wardrobe design',
        meta: {
          wardrobeConfig,
          page: 'wardrobes'
        }
      });
      
      alert('Wardrobe design session booked! Our team will contact you within 24 hours to confirm your appointment.');
      setShowDesignSession(false);
      setLeadForm({ name: '', phone: '', city: '', homeType: '' });
    } catch (error) {
      console.error('Error submitting lead:', error);
      alert('Failed to submit your request. Please try again or contact us directly.');
    } finally {
      setSubmitting(false);
    }
  };

  // Sample wardrobe data based on Qarpentri's offerings
  const allWardrobes = [
    {
      name: "2 Door Sliding Wardrobe With Ebony Finish",
      image: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
      price: 42599,
      originalPrice: 44874,
      size: "4' x 2' x 7'",
      type: "Sliding",
      doors: "2 Door"
    },
    {
      name: "2 Door Sliding Wardrobe With Rose Red and Grey Linen Laminate",
      image: "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
      price: 49399,
      originalPrice: 51999,
      size: "5' x 2' x 7'",
      type: "Sliding",
      doors: "2 Door"
    },
    {
      name: "2 Door Sliding Wardrobe With Forest Green and Brown Teak Finish",
      image: "https://images.unsplash.com/photo-1556909114-1184ffa95b32?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
      price: 57699,
      originalPrice: 60749,
      size: "5'6\" x 2' x 7'",
      type: "Sliding",
      doors: "2 Door"
    },
    {
      name: "A 2-Door Wardrobe Finished In Berry Laminate",
      image: "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
      price: 27599,
      originalPrice: 28999,
      size: "3' x 2' x 7'",
      type: "Swinging",
      doors: "2 Door"
    },
    {
      name: "A 2-Door Wardrobe Finished In Brown Teak Laminate",
      image: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
      price: 28099,
      originalPrice: 28999,
      size: "3' x 2' x 7'",
      type: "Swinging",
      doors: "2 Door"
    },
    {
      name: "A 2-Door Wardrobe In A Light Grey Finish",
      image: "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
      price: 28399,
      originalPrice: 29874,
      size: "3'6\" x 2' x 7'",
      type: "Swinging",
      doors: "2 Door"
    },
    {
      name: "A 2-Door Wardrobe Finished In Ebony Laminate",
      image: "https://images.unsplash.com/photo-1556909114-1184ffa95b32?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
      price: 29899,
      originalPrice: 31499,
      size: "3' x 2' x 7'",
      type: "Swinging",
      doors: "2 Door"
    },
    {
      name: "A 2-Door Wardrobe In A Frosty White Finish",
      image: "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
      price: 39099,
      originalPrice: 41124,
      size: "4' x 2' x 7'",
      type: "Swinging",
      doors: "2 Door"
    },
    {
      name: "A 3-Door Wardrobe Finished With Ebony And Cream Coloured Laminate",
      image: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
      price: 48099,
      originalPrice: 50624,
      size: "6' x 2' x 7'",
      type: "Swinging",
      doors: "3 Door"
    },
    {
      name: "A 3-Door Wardrobe In Brown Teak Laminate",
      image: "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
      price: 48499,
      originalPrice: 50999,
      size: "6' x 2' x 7'",
      type: "Swinging",
      doors: "3 Door"
    },
    {
      name: "A 4-Door Wardrobe In A Berry Coloured Laminate",
      image: "https://images.unsplash.com/photo-1556909114-1184ffa95b32?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
      price: 59399,
      originalPrice: 62499,
      size: "8' x 2' x 7'",
      type: "Swinging",
      doors: "4 Door"
    },
    {
      name: "A 5-Door Wardrobe In Grey Linen And Brown Teak Laminate",
      image: "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
      price: 72899,
      originalPrice: 76749,
      size: "10' x 2' x 7'",
      type: "Swinging",
      doors: "5 Door"
    }
  ];

  // Filter wardrobes based on configuration
  const filteredWardrobes = allWardrobes.filter(wardrobe => {
    const typeMatch = !wardrobeConfig.type || wardrobe.type === wardrobeConfig.type;
    const doorsMatch = !wardrobeConfig.doors || wardrobe.doors === wardrobeConfig.doors;
    return typeMatch && doorsMatch;
  });

  return (
    <>
      <Metadata 
        title="Custom Wardrobe Solutions - HomeLine"
        description="Explore our complete range of custom wardrobe designs that maximize storage and enhance your bedroom aesthetics. Get instant quotes and 3D visualizations."
        keywords="wardrobe design, custom wardrobe, bedroom storage, wardrobe solutions, modular wardrobe, wardrobe calculator"
      />
      
      <div className="min-h-screen bg-gray-50">
        {/* Hero Section */}
        {/* <div className="relative text-white overflow-hidden min-h-[600px] flex items-center">
          <div className="absolute inset-0">
            <Image 
              src="/interior-design-img.jpg" 
              alt="Wardrobe Solutions Hero Background" 
              fill
              className="object-cover"
              priority
            />
            <div className="absolute inset-0 bg-gradient-to-br from-blue-600/50 via-purple-700/50 to-blue-800/80"></div>
          </div>
          
          <div className="container-custom py-16 sm:py-20 lg:py-24 px-4 sm:px-6 lg:px-8 relative z-10">
            <div className="max-w-4xl mx-auto text-center">
              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-6 leading-tight">
                Transform Your Storage with 
                <span className="block text-yellow-300">Custom Wardrobe Solutions</span>
              </h1>
              <p className="text-lg sm:text-xl text-blue-100 mb-8 max-w-2xl mx-auto">
                Get instant quotes, explore wardrobe designs, and work with our expert designers to create your perfect storage solution.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link 
                  href="#quote-estimator"
                  className="bg-yellow-400 hover:bg-yellow-500 text-blue-900 font-bold px-8 py-4 text-lg rounded-lg transition-all duration-200 transform hover:scale-105 shadow-lg"
                >
                  Get Your Free Wardrobe Quote
                </Link>
                <Link 
                  href="#wardrobe-calculator"
                  className="btn-secondary border-white text-white hover:bg-white hover:text-blue-600 px-8 py-4 text-lg font-semibold"
                >
                  Wardrobe Calculator
                </Link>
              </div>
            </div>
          </div>
        </div> */}

        {/* Product Configuration Tool with Fixed Sidebar */}
        <div className="py-16 bg-white">
          <div className="container-custom px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-8">
              <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">Wardrobes (42)</h2>
              <p className="text-lg text-gray-600">Find your perfect wardrobe solution</p>
            </div>

            <div className="flex flex-col lg:flex-row gap-8">
              {/* Fixed Sidebar Filter */}
              <div className="lg:w-80 lg:sticky lg:top-8 lg:h-fit">
                <div className="bg-gradient-to-b from-blue-50 to-purple-50 rounded-2xl p-4 border border-blue-100 shadow-lg">
                  <div className="text-center mb-4">
                    <h3 className="text-lg font-bold text-gray-900 mb-1">Filters</h3>
                    <p className="text-xs text-gray-600">{filteredWardrobes.length} wardrobes found</p>
                  </div>

                  <div className="space-y-4">
                    {/* Wardrobe Type Configuration */}
                    <div className="bg-white rounded-lg p-3 shadow-sm border border-gray-100">
                      <h4 className="text-xs font-semibold text-gray-900 mb-2 flex items-center gap-1">
                        <Shirt className="w-3 h-3 text-blue-600" />
                        Wardrobe Type
                      </h4>
                      <div className="space-y-1">
                        {['Sliding', 'Swinging'].map((type) => (
                          <button
                            key={type}
                            className={`w-full p-2 rounded-md border text-left text-gray-700 transition-all duration-200 ${
                              wardrobeConfig.type === type
                                ? 'border-blue-600 bg-blue-100 text-blue-900'
                                : 'border-gray-200 hover:border-blue-300 hover:bg-blue-50'
                            }`}
                            onClick={() => setWardrobeConfig({...wardrobeConfig, type: type})}
                          >
                            <div className="flex items-center justify-between">
                              <span className="text-xs font-medium">{type}</span>
                              {wardrobeConfig.type === type && (
                                <CheckCircle className="w-3 h-3 text-blue-600" />
                              )}
                            </div>
                          </button>
                        ))}
                      </div>
                    </div>

                    {/* Door Configuration */}
                    <div className="bg-white rounded-lg p-3 shadow-sm border border-gray-100">
                      <h4 className="text-xs font-semibold text-gray-900 mb-2 flex items-center gap-1">
                        <Home className="w-3 h-3 text-blue-600" />
                        Number of Doors
                      </h4>
                      <div className="grid grid-cols-2 gap-1">
                        {['2 Door', '3 Door', '4 Door', '5 Door'].map((doors) => (
                          <button
                            key={doors}
                            className={`w-full p-1.5 rounded-md border text-left text-gray-700 transition-all duration-200 ${
                              wardrobeConfig.doors === doors
                                ? 'border-blue-600 bg-blue-100 text-blue-900'
                                : 'border-gray-200 hover:border-blue-300 hover:bg-blue-50'
                            }`}
                            onClick={() => setWardrobeConfig({...wardrobeConfig, doors: doors})}
                          >
                            <div className="flex items-center justify-between">
                              <span className="text-xs font-medium">{doors}</span>
                              {wardrobeConfig.doors === doors && (
                                <CheckCircle className="w-2 h-2 text-blue-600" />
                              )}
                            </div>
                          </button>
                        ))}
                      </div>
                    </div>
                  </div>

                  <div className="flex flex-col gap-2 mt-4 pt-3 border-t border-blue-200">
                    <button 
                      onClick={() => setWardrobeConfig({type: '', doors: ''})}
                      className="flex items-center justify-center gap-1 px-3 py-2 text-xs text-gray-500 hover:text-gray-700 hover:bg-gray-100 rounded-md transition-all duration-200"
                    >
                      <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                      </svg>
                      Clear all
                    </button>
                    <button 
                      onClick={() => setShowDesignSession(true)}
                      className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-3 py-2 rounded-md text-xs font-semibold shadow-lg transition-all duration-200"
                    >
                      Book Consultation
                    </button>
                  </div>
                </div>
              </div>

              {/* Product Listings */}
              <div className="flex-1">
                {filteredWardrobes.length > 0 ? (
                  <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                    {filteredWardrobes.map((wardrobe, index) => (
                      <div key={index} className="bg-white rounded-xl shadow-lg overflow-hidden border border-gray-200 hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
                        <div className="h-48 bg-cover bg-center bg-no-repeat" style={{backgroundImage: `url("${wardrobe.image}")`}}>
                          <div className="h-full bg-black bg-opacity-20 flex items-end">
                            <div className="p-3 text-white">
                              <p className="text-sm font-medium line-clamp-2">{wardrobe.name}</p>
                            </div>
                          </div>
                        </div>
                        <div className="p-4">
                          <h3 className="font-semibold text-gray-900 mb-2 line-clamp-2 text-sm">{wardrobe.name}</h3>
                          <div className="flex items-center gap-2 mb-2">
                            <span className="text-xs text-gray-600">Size: {wardrobe.size}</span>
                          </div>
                          <div className="flex items-center gap-2 mb-3">
                            <span className="text-xs text-gray-500">*Excluding applicable taxes</span>
                          </div>
                          <div className="flex items-center gap-2 mb-3">
                            <span className="text-lg font-bold text-gray-900">₹ {wardrobe.price.toLocaleString()}</span>
                            {wardrobe.originalPrice && (
                              <span className="text-sm text-gray-500 line-through">₹ {wardrobe.originalPrice.toLocaleString()}</span>
                            )}
                          </div>
                          <div className="text-xs text-gray-600 mb-3">Delivery in 15 days*</div>
                          <button 
                            onClick={() => setShowDesignSession(true)}
                            className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white py-2 rounded-lg font-semibold transition-all duration-200 transform hover:scale-105 text-sm"
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
                      <Shirt className="w-10 h-10 text-gray-400" />
                    </div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">No wardrobes found</h3>
                    <p className="text-gray-600 mb-4">Try adjusting your filters to see more options</p>
                    <button 
                      onClick={() => setWardrobeConfig({type: '', doors: ''})}
                      className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg font-semibold transition-all duration-200"
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
                Why Choose HomeLine Wardrobe Design?
              </h2>
              <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                We combine technology with expertise to deliver exceptional wardrobe storage solutions
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
                  title: "Design Expertise",
                  description: "Work with certified wardrobe designers with 10+ years experience"
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
                <div key={index} className="text-center p-6 rounded-2xl bg-white hover:bg-blue-50 transition-colors duration-300">
                  <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <feature.icon className="w-8 h-8 text-blue-600" />
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
                { number: "2500+", label: "Wardrobe Projects" },
                { number: "10+", label: "Years Experience" },
                { number: "98%", label: "Customer Satisfaction" },
                { number: "24/7", label: "Support Available" }
              ].map((stat, index) => (
                <div key={index}>
                  <div className="text-3xl sm:text-4xl font-bold mb-2">{stat.number}</div>
                  <div className="text-blue-100">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* CTA Section */}
        <div className="py-16 sm:py-20 bg-gray-900 text-white">
          <div className="container-custom px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold mb-4">
              Ready to Transform Your Storage?
            </h2>
            <p className="text-lg text-gray-300 mb-8 max-w-2xl mx-auto">
              Get in touch with our wardrobe design experts for a personalized consultation and detailed project planning.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link 
                href="/contact"
                className="btn-primary bg-blue-600 hover:bg-blue-700 px-8 py-4 text-lg font-semibold"
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
}// Wardrobe Quote Estimator Component
function WardrobeQuoteEstimator() {
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState({
    wardrobeType: '',
    size: '',
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
    { id: 1, title: 'Wardrobe Type', description: 'Select your wardrobe type' },
    { id: 2, title: 'Size & Space', description: 'Choose wardrobe size' },
    { id: 3, title: 'Style & Materials', description: 'Set your design preferences' },
    { id: 4, title: 'Contact Info', description: 'Share your details' }
  ];

  const wardrobeTypes = [
    { id: 'sliding', name: 'Sliding Wardrobe', description: 'Space-efficient sliding doors' },
    { id: 'walk-in', name: 'Walk-in Wardrobe', description: 'Luxury walk-in design' },
    { id: 'corner', name: 'Corner Wardrobe', description: 'Smart corner solutions' },
    { id: 'built-in', name: 'Built-in Wardrobe', description: 'Custom integrated design' }
  ];

  const sizes = [
    { id: 'small', name: 'Small (6x8 ft)', description: 'Perfect for compact bedrooms' },
    { id: 'medium', name: 'Medium (8x10 ft)', description: 'Ideal for average bedrooms' },
    { id: 'large', name: 'Large (10x12 ft)', description: 'Spacious master bedrooms' },
    { id: 'custom', name: 'Custom Size', description: 'Tailored to your space' }
  ];

  const handleNext = () => {
    if (currentStep < 4) setCurrentStep(currentStep + 1);
  };

  const handlePrev = () => {
    if (currentStep > 1) setCurrentStep(currentStep - 1);
  };

  const getProjectType = () => {
    const wardrobeType = wardrobeTypes.find(w => w.id === formData.wardrobeType);
    return wardrobeType ? `${wardrobeType.name} Design` : 'Wardrobe Design Project';
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
                  ? 'bg-blue-600 text-white' 
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
            className="bg-blue-600 h-2 rounded-full transition-all duration-300"
            style={{ width: `${(currentStep / 4) * 100}%` }}
          ></div>
        </div>
      </div>

      {/* Step Content */}
      <div className="mb-8">
        {currentStep === 1 && (
          <div>
            <h3 className="text-xl font-semibold text-gray-900 mb-6">What type of wardrobe are you looking for?</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {wardrobeTypes.map((type) => (
                <button
                  key={type.id}
                  onClick={() => setFormData({...formData, wardrobeType: type.id})}
                  className={`p-4 rounded-xl border-2 text-left transition-all duration-200 ${
                    formData.wardrobeType === type.id
                      ? 'border-blue-600 bg-blue-50'
                      : 'border-gray-200 hover:border-blue-300'
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
            <h3 className="text-xl font-semibold text-gray-900 mb-6">What size wardrobe do you need?</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {sizes.map((size) => (
                <button
                  key={size.id}
                  onClick={() => setFormData({...formData, size: size.id})}
                  className={`p-4 rounded-xl border-2 text-left transition-all duration-200 ${
                    formData.size === size.id
                      ? 'border-blue-600 bg-blue-50'
                      : 'border-gray-200 hover:border-blue-300'
                  }`}
                >
                  <div className="font-semibold text-gray-900">{size.name}</div>
                  <div className="text-sm text-gray-600">{size.description}</div>
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
                          ? 'border-blue-600 bg-blue-50'
                          : 'border-gray-200 hover:border-blue-300'
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
                          ? 'border-blue-600 bg-blue-50'
                          : 'border-gray-200 hover:border-blue-300'
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
                    className="w-full px-4 py-3 border border-gray-300 text-gray-700 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
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
                    className="w-full px-4 py-3 border border-gray-300 text-gray-700 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
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
                    className="w-full px-4 py-3 border border-gray-300 text-gray-700 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
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
                    className="w-full px-4 py-3 border border-gray-300 text-gray-700 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
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
            className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 flex items-center gap-2 rounded-lg"
          >
            Next Step
            <ArrowRight className="w-4 h-4" />
          </button>
        ) : (
          <button
            onClick={() => {
              alert('Wardrobe quote request submitted! Our team will contact you within 24 hours.');
            }}
            className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 flex items-center justify-center gap-2 rounded-lg"
          >
            Get Free Quote
            <CheckCircle className="w-4 h-4" />
          </button>
        )}
      </div>

      {/* Project Summary */}
      {currentStep >= 2 && (
        <div className="mt-8 p-4 bg-blue-50 rounded-xl border border-blue-200">
          <div className="text-center">
            <div className="text-sm text-blue-600 font-medium mb-1">Project Summary</div>
            <div className="text-lg font-bold text-blue-700">{getProjectType()}</div>
            <div className="text-xs text-blue-600 mt-1">Our design team will provide a detailed quote after consultation</div>
          </div>
        </div>
      )}
    </div>
  );
}

// Wardrobe Calculator Component
function WardrobeCalculator({ showDesignSession, setShowDesignSession, leadForm, setLeadForm, submitting, handleLeadSubmit }) {
  const [wardrobeData, setWardrobeData] = useState({
    type: '',
    size: '',
    materials: {
      doors: '',
      interior: '',
      hardware: ''
    },
    features: []
  });

  const wardrobeTypes = [
    { id: 'sliding', name: 'Sliding Wardrobe', icon: '🚪' },
    { id: 'walk-in', name: 'Walk-in Wardrobe', icon: '🚶' },
    { id: 'corner', name: 'Corner Wardrobe', icon: '📐' },
    { id: 'built-in', name: 'Built-in Wardrobe', icon: '🏠' }
  ];

  const materials = {
    doors: [
      { id: 'laminate', name: 'Laminate', quality: 'Good', durability: '5-7 years' },
      { id: 'acrylic', name: 'Acrylic', quality: 'Better', durability: '8-10 years' },
      { id: 'wood', name: 'Solid Wood', quality: 'Best', durability: '15+ years' },
      { id: 'glass', name: 'Glass', quality: 'Better', durability: '10+ years' }
    ],
    interior: [
      { id: 'basic', name: 'Basic Shelving', quality: 'Good', durability: '5+ years' },
      { id: 'modular', name: 'Modular System', quality: 'Better', durability: '8+ years' },
      { id: 'premium', name: 'Premium Interior', quality: 'Best', durability: '12+ years' }
    ],
    hardware: [
      { id: 'standard', name: 'Standard Hardware', quality: 'Good', durability: '3-5 years' },
      { id: 'soft-close', name: 'Soft Close', quality: 'Better', durability: '5-8 years' },
      { id: 'premium', name: 'Premium Hardware', quality: 'Best', durability: '10+ years' }
    ]
  };

  const features = [
    { id: 'lighting', name: 'LED Lighting', category: 'Lighting' },
    { id: 'mirror', name: 'Mirror Doors', category: 'Design' },
    { id: 'drawers', name: 'Soft Close Drawers', category: 'Storage' },
    { id: 'shoe-rack', name: 'Shoe Rack', category: 'Storage' },
    { id: 'tie-rack', name: 'Tie Rack', category: 'Storage' },
    { id: 'jewelry', name: 'Jewelry Drawer', category: 'Storage' }
  ];

  const getWardrobeSummary = () => {
    const typeMap = {
      'sliding': 'Sliding Wardrobe',
      'walk-in': 'Walk-in Wardrobe',
      'corner': 'Corner Wardrobe',
      'built-in': 'Built-in Wardrobe'
    };
    
    const sizeMap = {
      'small': 'Small (6x8 ft)',
      'medium': 'Medium (8x10 ft)',
      'large': 'Large (10x12 ft)',
      'custom': 'Custom Size'
    };
    
    return {
      type: typeMap[wardrobeData.type] || 'Wardrobe',
      size: sizeMap[wardrobeData.size] || 'Size',
      features: wardrobeData.features.length
    };
  };

  return (
    <div className="max-w-4xl mx-auto">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Configuration Panel */}
        <div className="space-y-6">
          {/* Wardrobe Type */}
          <div>
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Wardrobe Type</h3>
            <div className="grid grid-cols-2 gap-3">
              {wardrobeTypes.map((type) => (
                <button
                  key={type.id}
                  onClick={() => setWardrobeData({...wardrobeData, type: type.id})}
                  className={`p-4 rounded-lg border-2 text-center transition-all duration-200 ${
                    wardrobeData.type === type.id
                      ? 'border-blue-600 bg-blue-50'
                      : 'border-gray-200 hover:border-blue-300'
                  }`}
                >
                  <div className="text-2xl mb-2">{type.icon}</div>
                  <div className="text-sm font-medium text-gray-900">{type.name}</div>
                </button>
              ))}
            </div>
          </div>

          {/* Size */}
          <div>
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Wardrobe Size</h3>
            <div className="grid grid-cols-2 gap-3">
              {[
                { id: 'small', name: 'Small', desc: '6x8 ft' },
                { id: 'medium', name: 'Medium', desc: '8x10 ft' },
                { id: 'large', name: 'Large', desc: '10x12 ft' },
                { id: 'custom', name: 'Custom', desc: 'Your size' }
              ].map((size) => (
                <button
                  key={size.id}
                  onClick={() => setWardrobeData({...wardrobeData, size: size.id})}
                  className={`p-4 rounded-lg border-2 text-center transition-all duration-200 ${
                    wardrobeData.size === size.id
                      ? 'border-blue-600 bg-blue-50'
                      : 'border-gray-200 hover:border-blue-300'
                  }`}
                >
                  <div className="font-semibold text-gray-900">{size.name}</div>
                  <div className="text-sm text-gray-600">{size.desc}</div>
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
                        onClick={() => setWardrobeData({
                          ...wardrobeData,
                          materials: {...wardrobeData.materials, [category]: option.id}
                        })}
                        className={`p-3 rounded-lg border-2 text-left transition-all duration-200 ${
                          wardrobeData.materials[category] === option.id
                            ? 'border-blue-600 bg-blue-50'
                            : 'border-gray-200 hover:border-blue-300'
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
                    const newFeatures = wardrobeData.features.includes(feature.id)
                      ? wardrobeData.features.filter(f => f !== feature.id)
                      : [...wardrobeData.features, feature.id];
                    setWardrobeData({...wardrobeData, features: newFeatures});
                  }}
                  className={`p-3 rounded-lg border-2 text-left transition-all duration-200 ${
                    wardrobeData.features.includes(feature.id)
                      ? 'border-blue-600 bg-blue-50'
                      : 'border-gray-200 hover:border-blue-300'
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
            <h3 className="text-xl font-semibold text-gray-900 mb-6">Wardrobe Design Summary</h3>
            
            <div className="space-y-4 mb-6">
              {(() => {
                const summary = getWardrobeSummary();
                return (
                  <>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Wardrobe Type</span>
                      <span className="font-medium">{summary.type}</span>
                    </div>
                    
                    <div className="flex justify-between">
                      <span className="text-gray-600">Size</span>
                      <span className="font-medium">{summary.size}</span>
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
                className="w-full bg-blue-400 hover:bg-blue-500 text-blue-900 font-bold py-3 px-6 rounded-lg transition-all duration-200 transform hover:scale-105"
              >
                BOOK FREE DESIGN SESSION
              </button>
              <button className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-lg">
                Get Detailed Quote
              </button>
              <button className="w-full border border-blue-600 text-blue-600 hover:bg-blue-50 py-3 rounded-lg">
                Schedule Site Visit
              </button>
            </div>

            <div className="mt-6 p-4 bg-blue-50 rounded-lg">
              <div className="flex items-center gap-2 text-blue-700 font-medium mb-2">
                <Star className="w-4 h-4" />
                Free Design Consultation
              </div>
              <p className="text-sm text-blue-600">
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
                <h2 className="text-2xl font-bold text-gray-900">Book Free Wardrobe Design Session</h2>
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
                        className={`p-3 rounded-lg border-2 text-center transition-all duration-200 ${leadForm.homeType === type.name ? 'border-blue-400 bg-blue-50' : 'border-gray-200 hover:border-blue-300'}`}
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
                      className="w-full px-4 py-3 border border-gray-300 text-gray-700 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="Enter your name"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Phone Number</label>
                    <input
                      type="tel"
                      value={leadForm.phone}
                      onChange={(e) => setLeadForm({ ...leadForm, phone: e.target.value })}
                      className="w-full px-4 py-3 border border-gray-300 text-gray-700 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="Enter your phone"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">City</label>
                    <select 
                      value={leadForm.city}
                      onChange={(e) => setLeadForm({ ...leadForm, city: e.target.value })}
                      className="w-full px-4 py-3 border border-gray-300 text-gray-700 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
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
                  className={`w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-4 px-6 rounded-lg transition-all duration-200 transform hover:scale-105 ${submitting ? 'opacity-70 cursor-not-allowed' : 'cursor-pointer'}`}
                >
                  {submitting ? 'Submitting...' : 'Book Free Wardrobe Design Session'}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}


