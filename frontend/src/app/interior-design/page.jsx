'use client';

import { useState } from 'react';
import Link from 'next/link';
import { 
  Home, Calculator, Palette, Ruler, 
  ArrowRight, CheckCircle, Star, 
  Users, Award, Clock, Shield 
} from 'lucide-react';
import Metadata from '@/components/Metadata';
import Image from 'next/image';

export default function InteriorDesignPage() {
  const [activeTab, setActiveTab] = useState('quote');
  const [showDesignSession, setShowDesignSession] = useState(false);

  return (
    <>
      <Metadata 
        title="Interior Design Services - HomeLine"
        description="Transform your space with our professional interior design services. Get instant quotes, modular kitchen designs, and expert consultation."
        keywords="interior design, home design, modular kitchen, cost calculator, design consultation"
      />
      
      <div className="min-h-screen bg-gray-50">
        {/* Hero Section */}
        <div className="relative text-white overflow-hidden min-h-[600px] flex items-center">
          {/* Background Image */}
          <div className="absolute inset-0">
            <Image 
              src="/interior-design-img.jpg" 
              alt="Interior Design Hero Background" 
              fill
              className="object-cover"
              priority
            />
            {/* Overlay */}
            <div className="absolute inset-0 bg-gradient-to-br from-primary-600/50 via-primary-700/50 to-primary-800/80"></div>
          </div>
          
          {/* Decorative Elements */}
          <div className="absolute inset-0">
            <div className="absolute top-20 right-10 w-72 h-72 bg-white/10 rounded-full mix-blend-multiply filter blur-3xl"></div>
            <div className="absolute bottom-20 left-10 w-72 h-72 bg-white/10 rounded-full mix-blend-multiply filter blur-3xl"></div>
          </div>
          
          <div className="container-custom py-16 sm:py-20 lg:py-24 px-4 sm:px-6 lg:px-8 relative z-10">
            <div className="max-w-4xl mx-auto text-center">
              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-6 leading-tight">
                Transform Your Space with 
                <span className="block text-yellow-300">Professional Interior Design</span>
              </h1>
              <p className="text-lg sm:text-xl text-primary-100 mb-8 max-w-2xl mx-auto">
                Get instant quotes, explore modular kitchen designs, and work with our expert designers to create your dream home.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link 
                  href="#quote-estimator"
                  className="bg-yellow-400 hover:bg-yellow-500 text-primary-900 font-bold px-8 py-4 text-lg rounded-lg transition-all duration-200 transform hover:scale-105 shadow-lg"
                >
                  Get Your Free Interior Design Quote
                </Link>
                <Link 
                  href="#kitchen-calculator"
                  className="btn-secondary border-white text-white hover:bg-white hover:text-primary-600 px-8 py-4 text-lg font-semibold"
                >
                  Kitchen Calculator
                </Link>
              </div>
            </div>
          </div>
        </div>

        {/* End-to-end Offerings Section */}
        <div className="py-16 bg-white">
          <div className="container-custom px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between items-center mb-8">
              <h2 className="text-3xl sm:text-4xl font-bold text-gray-900">End-to-end offerings</h2>
              <Link href="/collections" className="text-red-600 hover:text-red-700 font-medium">
                See All
              </Link>
            </div>
            
            <div className="relative">
              <div className="flex gap-6 overflow-x-auto pb-4 scrollbar-hide">
                {/* Living Room Design 1 */}
                <div className="flex-shrink-0 w-80 bg-white rounded-xl shadow-lg overflow-hidden border border-gray-200">
                  <div className="h-48 bg-cover bg-center bg-no-repeat" style={{backgroundImage: 'url("/modernlivingroom.webp")'}}>
                    <div className="h-full bg-opacity-30 flex items-end">
                      <div className="p-4 text-white">
                        <p className="text-sm font-medium">Modern Living Room</p>
                      </div>
                    </div>
                  </div>
                  <div className="p-4">
                    <h3 className="font-semibold text-gray-900 mb-2">Contemporary Living Space</h3>
                    <p className="text-sm text-gray-600 mb-4">Complete living room design with modern furniture and lighting</p>
                    <button 
                      onClick={() => setShowDesignSession(true)}
                      className="w-full bg-yellow-400 hover:bg-yellow-500 text-primary-900 cursor-pointer font-bold py-2 px-4 rounded-lg transition-all duration-200 transform hover:scale-105"
                    >
                      BOOK FREE DESIGN SESSION
                    </button>
                  </div>
                </div>

                {/* TV Unit Design */}
                <div className="flex-shrink-0 w-80 bg-white rounded-xl shadow-lg overflow-hidden border border-gray-200">
                  <div className="h-48 bg-cover bg-center bg-no-repeat" style={{backgroundImage: 'url("/tvunitsdesign.webp"), url("/hero-bg-2.jpg")'}}>
                    <div className="h-full  bg-opacity-30 flex items-end">
                      <div className="p-4 text-white">
                        <Image src="/tvunitsdesign.webp" alt="TV Unit Design" width={100} height={100} />
                        <p className="text-sm font-medium">TV Unit Design</p>
                      </div>
                    </div>
                  </div>
                  <div className="p-4">
                    <h3 className="font-semibold text-gray-900 mb-2">Oceanus Wall-Mounted TV Unit</h3>
                    <p className="text-sm text-gray-600 mb-4">Stylish wall-mounted TV unit with storage and display</p>
                    <button 
                      onClick={() => setShowDesignSession(true)}
                      className="w-full bg-yellow-400 hover:bg-yellow-500 text-primary-900 cursor-pointer font-bold py-2 px-4 rounded-lg transition-all duration-200 transform hover:scale-105"
                    >
                      BOOK FREE DESIGN SESSION
                    </button>
                  </div>
                </div>

                {/* Bedroom Design */}
                <div className="flex-shrink-0 w-80 bg-white rounded-xl shadow-lg overflow-hidden border border-gray-200">
                  <div className="h-48 bg-cover bg-center bg-no-repeat" style={{backgroundImage: 'url("/masterbedroom.jpg")'}}>
                    <div className="h-full  bg-opacity-30 flex items-end">
                      <div className="p-4 text-white">
                        <p className="text-sm font-medium">Master Bedroom</p>
                      </div>
                    </div>
                  </div>
                  <div className="p-4">
                    <h3 className="font-semibold text-gray-900 mb-2">Luxury Bedroom Suite</h3>
                    <p className="text-sm text-gray-600 mb-4">Complete bedroom design with wardrobe and storage</p>
                    <button 
                      onClick={() => setShowDesignSession(true)}
                      className="w-full bg-yellow-400 hover:bg-yellow-500 text-primary-900 cursor-pointer font-bold py-2 px-4 rounded-lg transition-all duration-200 transform hover:scale-105"
                    >
                      BOOK FREE DESIGN SESSION
                    </button>
                  </div>
                </div>

                {/* Wardrobe Design */}
                <div className="flex-shrink-0 w-80 bg-white rounded-xl shadow-lg overflow-hidden border border-gray-200">
                  <div className="h-48 bg-cover bg-center bg-no-repeat" style={{backgroundImage: 'url("https://images.unsplash.com/photo-1558618666-fcd25c85cd64?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80")'}}>
                    <div className="h-full bg-black bg-opacity-30 flex items-end">
                      <div className="p-4 text-white">
                        <p className="text-sm font-medium">Modular Wardrobe</p>
                      </div>
                    </div>
                  </div>
                  <div className="p-4">
                    <h3 className="font-semibold text-gray-900 mb-2">Custom Wardrobe Solutions</h3>
                    <p className="text-sm text-gray-600 mb-4">Space-efficient wardrobe designs for any room</p>
                    <button 
                      onClick={() => setShowDesignSession(true)}
                      className="w-full bg-yellow-400 hover:bg-yellow-500 text-primary-900 cursor-pointer font-bold py-2 px-4 rounded-lg transition-all duration-200 transform hover:scale-105"
                    >
                      BOOK FREE DESIGN SESSION
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Modular Kitchen Designs Section */}
        <div className="py-16 bg-gray-50">
          <div className="container-custom px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between items-center mb-8">
              <h2 className="text-3xl sm:text-4xl font-bold text-gray-900">Modular Kitchen Designs</h2>
              <Link href="/interior-design/kitchen-calculator" className="text-red-600 hover:text-red-700 font-medium">
                See All
              </Link>
            </div>
            
            <div className="relative">
              <div className="flex gap-6 overflow-x-auto pb-4 scrollbar-hide">
                {/* L-Shape Kitchen */}
                <div className="flex-shrink-0 w-80 bg-white rounded-xl shadow-lg overflow-hidden border border-gray-200">
                  <div className="h-48 bg-cover bg-center bg-no-repeat" style={{backgroundImage: 'url("https://images.unsplash.com/photo-1556909114-1184ffa95b32?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80")'}}>
                    <div className="h-full bg-black bg-opacity-30 flex items-end">
                      <div className="p-4 text-white">
                        <p className="text-sm font-medium">L-Shape Kitchen</p>
                      </div>
                    </div>
                  </div>
                  <div className="p-4">
                    <h3 className="font-semibold text-gray-900 mb-2">Modern L-Shape Kitchen</h3>
                    <p className="text-sm text-gray-600 mb-4">Efficient L-shaped layout with premium finishes</p>
                    <button 
                      onClick={() => setShowDesignSession(true)}
                      className="w-full bg-yellow-400 hover:bg-yellow-500 text-primary-900 font-bold py-2 px-4 rounded-lg transition-all duration-200 transform hover:scale-105"
                    >
                      BOOK FREE DESIGN SESSION
                    </button>
                  </div>
                </div>

                {/* U-Shape Kitchen */}
                <div className="flex-shrink-0 w-80 bg-white rounded-xl shadow-lg overflow-hidden border border-gray-200">
                  <div className="h-48 bg-cover bg-center bg-no-repeat" style={{backgroundImage: 'url("https://images.unsplash.com/photo-1566908829077-2e6a4b7fbff2?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80")'}}>
                    <div className="h-full bg-black bg-opacity-30 flex items-end">
                      <div className="p-4 text-white">
                        <p className="text-sm font-medium">U-Shape Kitchen</p>
                      </div>
                    </div>
                  </div>
                  <div className="p-4">
                    <h3 className="font-semibold text-gray-900 mb-2">Spacious U-Shape Kitchen</h3>
                    <p className="text-sm text-gray-600 mb-4">Maximum storage and workspace with U-shaped design</p>
                    <button 
                      onClick={() => setShowDesignSession(true)}
                      className="w-full bg-yellow-400 hover:bg-yellow-500 text-primary-900 font-bold cursor-pointer py-2 px-4 rounded-lg transition-all duration-200 transform hover:scale-105"
                    >
                      BOOK FREE DESIGN SESSION
                    </button>
                  </div>
                </div>

                {/* Island Kitchen */}
                <div className="flex-shrink-0 w-80 bg-white rounded-xl shadow-lg overflow-hidden border border-gray-200">
                  <div className="h-48 bg-cover bg-center bg-no-repeat" style={{backgroundImage: 'url("https://images.unsplash.com/photo-1556909052-f6eea09c6b92?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80")'}}>
                    <div className="h-full bg-black bg-opacity-30 flex items-end">
                      <div className="p-4 text-white">
                        <p className="text-sm font-medium">Island Kitchen</p>
                      </div>
                    </div>
                  </div>
                  <div className="p-4">
                    <h3 className="font-semibold text-gray-900 mb-2">Luxury Island Kitchen</h3>
                    <p className="text-sm text-gray-600 mb-4">Central island with premium appliances and finishes</p>
                    <button 
                      onClick={() => setShowDesignSession(true)}
                      className="w-full bg-yellow-400 hover:bg-yellow-500 text-primary-900 font-bold cursor-pointer py-2 px-4 rounded-lg transition-all duration-200 transform hover:scale-105"
                    >
                      BOOK FREE DESIGN SESSION
                    </button>
                  </div>
                </div>

                {/* Straight Line Kitchen */}
                <div className="flex-shrink-0 w-80 bg-white rounded-xl shadow-lg overflow-hidden border border-gray-200">
                  <div className="h-48 bg-cover bg-center bg-no-repeat" style={{backgroundImage: 'url("https://images.unsplash.com/photo-1556909052-4441bb4e5181?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80")'}}>
                    <div className="h-full bg-black bg-opacity-30 flex items-end">
                      <div className="p-4 text-white">
                        <p className="text-sm font-medium">Straight Line Kitchen</p>
                      </div>
                    </div>
                  </div>
                  <div className="p-4">
                    <h3 className="font-semibold text-gray-900 mb-2">Compact Straight Kitchen</h3>
                    <p className="text-sm text-gray-600 mb-4">Space-efficient straight line design for small spaces</p>
                    <button 
                      onClick={() => setShowDesignSession(true)}
                      className="w-full bg-yellow-400 hover:bg-yellow-500 text-primary-900 cursor-pointer font-bold py-2 px-4 rounded-lg transition-all duration-200 transform hover:scale-105"
                    >
                      BOOK FREE DESIGN SESSION
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Features Section */}
        <div className="py-16 sm:py-20 bg-white">
          <div className="container-custom px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
                Why Choose HomeLine Interior Design?
              </h2>
              <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                We combine technology with expertise to deliver exceptional interior design solutions
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
                <div key={index} className="text-center p-6 rounded-2xl bg-gray-50 hover:bg-primary-50 transition-colors duration-300">
                  <div className="w-16 h-16 bg-primary-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <feature.icon className="w-8 h-8 text-primary-600" />
                  </div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">{feature.title}</h3>
                  <p className="text-gray-600 text-sm">{feature.description}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Quote Estimator Section */}
        <div id="quote-estimator" className="py-16 sm:py-20 bg-gray-50">
          <div className="container-custom px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto">
              <div className="text-center mb-12">
                <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
                  Get Your Free Interior Design Quote
                </h2>
                <p className="text-lg text-gray-600">
                  Answer a few questions and get an instant estimate for your project
                </p>
              </div>

              <div className="bg-white rounded-2xl shadow-lg p-6 sm:p-8">
                <QuoteEstimator />
              </div>
            </div>
          </div>
        </div>

        {/* Kitchen Calculator Section */}
        <div id="kitchen-calculator" className="py-16 sm:py-20 bg-white">
          <div className="container-custom px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto">
              <div className="text-center mb-12">
                <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
                  Modular Kitchen Cost Calculator
                </h2>
                <p className="text-lg text-gray-600">
                  Design your dream kitchen and get accurate pricing instantly
                </p>
              </div>

              <div className="bg-white rounded-2xl shadow-lg p-6 sm:p-8 border border-gray-200">
                <KitchenCalculator 
                  showDesignSession={showDesignSession}
                  setShowDesignSession={setShowDesignSession}
                />
              </div>
            </div>
          </div>
        </div>

        {/* Stats Section */}
        <div className="py-16 sm:py-20 bg-primary-600 text-white">
          <div className="container-custom px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
              {[
                { number: "5000+", label: "Happy Customers" },
                { number: "10+", label: "Years Experience" },
                { number: "98%", label: "Customer Satisfaction" },
                { number: "24/7", label: "Support Available" }
              ].map((stat, index) => (
                <div key={index}>
                  <div className="text-3xl sm:text-4xl font-bold mb-2">{stat.number}</div>
                  <div className="text-primary-100">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* CTA Section */}
        <div className="py-16 sm:py-20 bg-gray-900 text-white">
          <div className="container-custom px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold mb-4">
              Ready to Transform Your Space?
            </h2>
            <p className="text-lg text-gray-300 mb-8 max-w-2xl mx-auto">
              Get in touch with our design experts for a personalized consultation and detailed project planning.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link 
                href="/contact"
                className="btn-primary bg-primary-600 hover:bg-primary-700 px-8 py-4 text-lg font-semibold"
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
}

// Quote Estimator Component
function QuoteEstimator() {
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState({
    homeType: '',
    rooms: [],
    purpose: '',
    timeline: '',
    style: '',
    contactInfo: {
      name: '',
      email: '',
      phone: '',
      city: ''
    }
  });

  const steps = [
    { id: 1, title: 'Home Type', description: 'Select your property type' },
    { id: 2, title: 'Rooms', description: 'Choose rooms to design' },
    { id: 3, title: 'Purpose & Style', description: 'Set your design preferences' },
    { id: 4, title: 'Contact Info', description: 'Share your details' }
  ];

  const homeTypes = [
    { id: '1bhk', name: '1 BHK', description: 'Perfect for small families' },
    { id: '2bhk', name: '2 BHK', description: 'Ideal for growing families' },
    { id: '3bhk', name: '3 BHK', description: 'Spacious family homes' },
    { id: '4bhk', name: '4 BHK', description: 'Luxury family living' },
    { id: 'villa', name: 'Villa', description: 'Premium standalone homes' }
  ];

  const rooms = [
    { id: 'living', name: 'Living Room', icon: '🛋️' },
    { id: 'bedroom', name: 'Bedroom', icon: '🛏️' },
    { id: 'kitchen', name: 'Kitchen', icon: '🍳' },
    { id: 'bathroom', name: 'Bathroom', icon: '🚿' },
    { id: 'dining', name: 'Dining Room', icon: '🍽️' },
    { id: 'study', name: 'Study Room', icon: '📚' }
  ];

  const handleNext = () => {
    if (currentStep < 4) setCurrentStep(currentStep + 1);
  };

  const handlePrev = () => {
    if (currentStep > 1) setCurrentStep(currentStep - 1);
  };

  const getProjectType = () => {
    const homeType = homeTypes.find(h => h.id === formData.homeType);
    return homeType ? `${homeType.name} Interior Design` : 'Interior Design Project';
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
                  ? 'bg-primary-600 text-white' 
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
            className="bg-primary-600 h-2 rounded-full transition-all duration-300"
            style={{ width: `${(currentStep / 4) * 100}%` }}
          ></div>
        </div>
      </div>

      {/* Step Content */}
      <div className="mb-8">
        {currentStep === 1 && (
          <div>
            <h3 className="text-xl font-semibold text-gray-900 mb-6">What type of home are you designing?</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {homeTypes.map((type) => (
                                 <button
                   key={type.id}
                   onClick={() => setFormData({...formData, homeType: type.id})}
                   className={`p-4 rounded-xl border-2 text-left transition-all duration-200 ${
                     formData.homeType === type.id
                       ? 'border-primary-600 bg-primary-50'
                       : 'border-gray-200 hover:border-primary-300'
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
                      ? 'border-primary-600 bg-primary-50'
                      : 'border-gray-200 hover:border-primary-300'
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
            <h3 className="text-xl font-semibold text-gray-900 mb-6">Purpose & Design Preferences</h3>
            <div className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-3">Project Purpose</label>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {[
                    { id: 'new-home', name: 'New Home Setup', description: 'Moving into a new space' },
                    { id: 'renovation', name: 'Home Renovation', description: 'Updating existing space' },
                    { id: 'room-makeover', name: 'Room Makeover', description: 'Redesigning specific rooms' },
                    { id: 'commercial', name: 'Commercial Space', description: 'Office or business space' }
                  ].map((purpose) => (
                    <button
                      key={purpose.id}
                      onClick={() => setFormData({...formData, purpose: purpose.id})}
                      className={`p-4 rounded-lg border-2 text-left transition-all duration-200 ${
                        formData.purpose === purpose.id
                          ? 'border-primary-600 bg-primary-50'
                          : 'border-gray-200 hover:border-primary-300'
                      }`}
                    >
                      <div className="font-semibold text-gray-900">{purpose.name}</div>
                      <div className="text-sm text-gray-600">{purpose.description}</div>
                    </button>
                  ))}
                </div>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-3">Design Style</label>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                  {['Modern', 'Traditional', 'Contemporary', 'Minimalist', 'Scandinavian', 'Industrial'].map((style) => (
                    <button
                      key={style}
                      onClick={() => setFormData({...formData, style})}
                      className={`p-3 rounded-lg border-2 text-center text-gray-700 transition-all duration-200 ${
                        formData.style === style
                          ? 'border-primary-600 bg-primary-50'
                          : 'border-gray-200 hover:border-primary-300'
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
                          ? 'border-primary-600 bg-primary-50'
                          : 'border-gray-200 hover:border-primary-300'
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
                    className="w-full px-4 py-3 border border-gray-300 text-gray-700 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
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
                    className="w-full px-4 py-3 border border-gray-300 text-gray-700 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
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
                    className="w-full px-4 py-3 border border-gray-300 text-gray-700 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
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
                    className="w-full px-4 py-3 border border-gray-300 text-gray-700 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
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
            className="btn-primary px-6 py-3 flex items-center gap-2"
          >
            Next Step
            <ArrowRight className="w-4 h-4" />
          </button>
        ) : (
          <div className="space-y-3">
            {/* <button
              onClick={() => setShowDesignSession(true)}
              className="w-full bg-yellow-400 hover:bg-yellow-500 text-primary-900 font-bold py-3 px-6 rounded-lg transition-all duration-200 transform hover:scale-105"
            >
              BOOK FREE DESIGN SESSION
            </button> */}
            <button
              onClick={() => {
                // Handle form submission
                alert('Quote request submitted! Our team will contact you within 24 hours.');
              }}
              className="w-full btn-primary px-6 py-3 flex items-center justify-center gap-2"
            >
              Get Free Quote
              <CheckCircle className="w-4 h-4" />
            </button>
          </div>
        )}
      </div>

      {/* Project Summary */}
      {currentStep >= 2 && (
        <div className="mt-8 p-4 bg-primary-50 rounded-xl border border-primary-200">
          <div className="text-center">
            <div className="text-sm text-primary-600 font-medium mb-1">Project Summary</div>
            <div className="text-lg font-bold text-primary-700">{getProjectType()}</div>
            <div className="text-xs text-primary-600 mt-1">Our design team will provide a detailed quote after consultation</div>
          </div>
        </div>
      )}
    </div>
  );
}

// Kitchen Calculator Component
function KitchenCalculator({ showDesignSession, setShowDesignSession }) {
  const [kitchenData, setKitchenData] = useState({
    size: '',
    layout: '',
    materials: {
      cabinets: '',
      countertop: '',
      backsplash: '',
      flooring: ''
    },
    appliances: [],
    features: []
  });

  const layouts = [
    { id: 'straight', name: 'Straight Line', icon: '📏' },
    { id: 'l-shape', name: 'L-Shape', icon: '📐' },
    { id: 'u-shape', name: 'U-Shape', icon: '🔄' },
    { id: 'island', name: 'Island', icon: '🏝️' }
  ];

  const materials = {
    cabinets: [
      { id: 'laminate', name: 'Laminate', quality: 'Good', durability: '5-7 years' },
      { id: 'acrylic', name: 'Acrylic', quality: 'Better', durability: '8-10 years' },
      { id: 'wood', name: 'Solid Wood', quality: 'Best', durability: '15+ years' },
      { id: 'pvc', name: 'PVC', quality: 'Good', durability: '6-8 years' }
    ],
    countertop: [
      { id: 'granite', name: 'Granite', quality: 'Good', durability: '20+ years' },
      { id: 'quartz', name: 'Quartz', quality: 'Better', durability: '25+ years' },
      { id: 'marble', name: 'Marble', quality: 'Best', durability: '30+ years' },
      { id: 'ceramic', name: 'Ceramic', quality: 'Basic', durability: '10-15 years' }
    ],
    backsplash: [
      { id: 'tiles', name: 'Ceramic Tiles', quality: 'Good', durability: '10+ years' },
      { id: 'glass', name: 'Glass', quality: 'Better', durability: '15+ years' },
      { id: 'stone', name: 'Natural Stone', quality: 'Best', durability: '20+ years' },
      { id: 'paint', name: 'Paint', quality: 'Basic', durability: '3-5 years' }
    ],
    flooring: [
      { id: 'tiles', name: 'Ceramic Tiles', quality: 'Good', durability: '15+ years' },
      { id: 'vitrified', name: 'Vitrified Tiles', quality: 'Better', durability: '20+ years' },
      { id: 'wood', name: 'Wooden', quality: 'Best', durability: '25+ years' },
      { id: 'marble', name: 'Marble', quality: 'Better', durability: '30+ years' }
    ]
  };

  const appliances = [
    { id: 'hob', name: 'Gas Hob', category: 'Cooking', essential: true },
    { id: 'hood', name: 'Chimney', category: 'Ventilation', essential: true },
    { id: 'oven', name: 'Built-in Oven', category: 'Cooking', essential: false },
    { id: 'microwave', name: 'Microwave', category: 'Cooking', essential: false },
    { id: 'refrigerator', name: 'Refrigerator', category: 'Storage', essential: true },
    { id: 'dishwasher', name: 'Dishwasher', category: 'Cleaning', essential: false }
  ];

  const features = [
    { id: 'soft-close', name: 'Soft Close Hinges', category: 'Hardware' },
    { id: 'pull-out', name: 'Pull-out Drawers', category: 'Storage' },
    { id: 'corner', name: 'Corner Solutions', category: 'Storage' },
    { id: 'lighting', name: 'LED Lighting', category: 'Lighting' },
    { id: 'water', name: 'Water Purifier', category: 'Utility' }
  ];

  const getKitchenSummary = () => {
    const sizeMap = {
      'small': 'Small Kitchen (6x8 ft)',
      'medium': 'Medium Kitchen (8x10 ft)',
      'large': 'Large Kitchen (10x12 ft)'
    };
    
    const layoutMap = {
      'straight': 'Straight Line Layout',
      'l-shape': 'L-Shape Layout',
      'u-shape': 'U-Shape Layout',
      'island': 'Island Layout'
    };
    
    return {
      size: sizeMap[kitchenData.size] || 'Kitchen',
      layout: layoutMap[kitchenData.layout] || 'Layout',
      appliances: kitchenData.appliances.length,
      features: kitchenData.features.length
    };
  };

  return (
    <div className="max-w-4xl mx-auto">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Configuration Panel */}
        <div className="space-y-6">
          {/* Kitchen Size */}
          <div>
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Kitchen Size</h3>
            <div className="grid grid-cols-3 gap-3">
              {[
                { id: 'small', name: 'Small', desc: '6x8 ft' },
                { id: 'medium', name: 'Medium', desc: '8x10 ft' },
                { id: 'large', name: 'Large', desc: '10x12 ft' }
              ].map((size) => (
                <button
                  key={size.id}
                  onClick={() => setKitchenData({...kitchenData, size: size.id})}
                  className={`p-4 rounded-lg border-2 text-center transition-all duration-200 ${
                    kitchenData.size === size.id
                      ? 'border-primary-600 bg-primary-50'
                      : 'border-gray-200 hover:border-primary-300'
                  }`}
                >
                  <div className="font-semibold text-gray-900">{size.name}</div>
                  <div className="text-sm text-gray-600">{size.desc}</div>
                </button>
              ))}
            </div>
          </div>

          {/* Layout */}
          <div>
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Kitchen Layout</h3>
            <div className="grid grid-cols-2 gap-3">
              {layouts.map((layout) => (
                <button
                  key={layout.id}
                  onClick={() => setKitchenData({...kitchenData, layout: layout.id})}
                  className={`p-4 rounded-lg border-2 text-center transition-all duration-200 ${
                    kitchenData.layout === layout.id
                      ? 'border-primary-600 bg-primary-50'
                      : 'border-gray-200 hover:border-primary-300'
                  }`}
                >
                  <div className="text-2xl mb-2">{layout.icon}</div>
                  <div className="text-sm font-medium text-gray-900">{layout.name}</div>
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
                  <div className="grid grid-cols-2 gap-2">
                    {options.map((option) => (
                                             <button
                         key={option.id}
                         onClick={() => setKitchenData({
                           ...kitchenData,
                           materials: {...kitchenData.materials, [category]: option.id}
                         })}
                         className={`p-3 rounded-lg border-2 text-left transition-all duration-200 ${
                           kitchenData.materials[category] === option.id
                             ? 'border-primary-600 bg-primary-50'
                             : 'border-gray-200 hover:border-primary-300'
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

          {/* Appliances */}
          <div>
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Appliances</h3>
            <div className="grid grid-cols-2 gap-3">
              {appliances.map((appliance) => (
                                 <button
                   key={appliance.id}
                   onClick={() => {
                     const newAppliances = kitchenData.appliances.includes(appliance.id)
                       ? kitchenData.appliances.filter(a => a !== appliance.id)
                       : [...kitchenData.appliances, appliance.id];
                     setKitchenData({...kitchenData, appliances: newAppliances});
                   }}
                   className={`p-3 rounded-lg border-2 text-left transition-all duration-200 ${
                     kitchenData.appliances.includes(appliance.id)
                       ? 'border-primary-600 bg-primary-50'
                       : 'border-gray-200 hover:border-primary-300'
                   }`}
                 >
                   <div className="text-sm font-medium text-gray-900">{appliance.name}</div>
                   <div className="text-xs text-gray-600">{appliance.category}</div>
                 </button>
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
                     const newFeatures = kitchenData.features.includes(feature.id)
                       ? kitchenData.features.filter(f => f !== feature.id)
                       : [...kitchenData.features, feature.id];
                     setKitchenData({...kitchenData, features: newFeatures});
                   }}
                   className={`p-3 rounded-lg border-2 text-left transition-all duration-200 ${
                     kitchenData.features.includes(feature.id)
                       ? 'border-primary-600 bg-primary-50'
                       : 'border-gray-200 hover:border-primary-300'
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
            <h3 className="text-xl font-semibold text-gray-900 mb-6">Kitchen Design Summary</h3>
            
            <div className="space-y-4 mb-6">
              {(() => {
                const summary = getKitchenSummary();
                return (
                  <>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Kitchen Size</span>
                      <span className="font-medium">{summary.size}</span>
                    </div>
                    
                    <div className="flex justify-between">
                      <span className="text-gray-600">Layout</span>
                      <span className="font-medium">{summary.layout}</span>
                    </div>
                    
                    <div className="flex justify-between">
                      <span className="text-gray-600">Selected Appliances</span>
                      <span className="font-medium">{summary.appliances} items</span>
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
                className="w-full bg-yellow-400 hover:bg-yellow-500 text-primary-900 font-bold py-3 px-6 rounded-lg transition-all duration-200 transform hover:scale-105"
              >
                BOOK FREE DESIGN SESSION
              </button>
              <button className="w-full btn-primary py-3">
                Get Detailed Quote
              </button>
              <button className="w-full btn-secondary py-3">
                Schedule Site Visit
              </button>
            </div>

            <div className="mt-6 p-4 bg-primary-50 rounded-lg">
              <div className="flex items-center gap-2 text-primary-700 font-medium mb-2">
                <Star className="w-4 h-4" />
                Free Design Consultation
              </div>
              <p className="text-sm text-primary-600">
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
                <h2 className="text-2xl font-bold text-gray-900">Book Free Design Session</h2>
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
                {/* Session Type */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-3">Session Type</label>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {[
                      { id: 'online', name: 'Online Consultation', description: 'Video call with our designer', icon: '💻' },
                      { id: 'in-person', name: 'In-Person Visit', description: 'Visit our experience center', icon: '🏢' }
                    ].map((type) => (
                      <button
                        key={type.id}
                        className="p-4 rounded-lg border-2 text-left transition-all duration-200 border-gray-200 hover:border-primary-300"
                      >
                        <div className="flex items-center gap-3">
                          <span className="text-2xl">{type.icon}</span>
                          <div>
                            <div className="font-semibold text-gray-900">{type.name}</div>
                            <div className="text-sm text-gray-600">{type.description}</div>
                          </div>
                        </div>
                      </button>
                    ))}
                  </div>
                </div>

                {/* Contact Information */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Full Name</label>
                    <input
                      type="text"
                      className="w-full px-4 py-3 border border-gray-300 text-gray-700 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                      placeholder="Enter your name"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Phone Number</label>
                    <input
                      type="tel"
                      className="w-full px-4 py-3 border border-gray-300 text-gray-700 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                      placeholder="Enter your phone"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Email</label>
                    <input
                      type="email"
                      className="w-full px-4 py-3 border border-gray-300 text-gray-700 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                      placeholder="Enter your email"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">City</label>
                    <select className="w-full px-4 py-3 border border-gray-300 text-gray-700 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent">
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

                {/* Project Details */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Project Type</label>
                  <select className="w-full px-4 py-3 border border-gray-300 text-gray-700 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent">
                    <option value="">Select project type</option>
                    <option value="full-home">Full Home Interiors</option>
                    <option value="kitchen">Modular Kitchen</option>
                    <option value="bedroom">Bedroom Design</option>
                    <option value="living-room">Living Room</option>
                    <option value="wardrobe">Wardrobe Design</option>
                    <option value="bathroom">Bathroom Design</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Preferred Date & Time</label>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <input
                      type="date"
                      className="w-full px-4 py-3 border border-gray-300 text-gray-700 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                    />
                    <select className="w-full px-4 py-3 border border-gray-300 text-gray-700 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent">
                      <option value="">Select time slot</option>
                      <option value="10:00">10:00 AM</option>
                      <option value="11:00">11:00 AM</option>
                      <option value="12:00">12:00 PM</option>
                      <option value="14:00">2:00 PM</option>
                      <option value="15:00">3:00 PM</option>
                      <option value="16:00">4:00 PM</option>
                      <option value="17:00">5:00 PM</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Additional Requirements (Optional)</label>
                  <textarea
                    rows={3}
                    className="w-full px-4 py-3 border border-gray-300 text-gray-700 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                    placeholder="Tell us about your specific requirements, budget range, or any questions you have..."
                  />
                </div>

                {/* Benefits */}
                <div className="bg-primary-50 p-4 rounded-lg">
                  <h3 className="font-semibold text-primary-900 mb-3">What you'll get:</h3>
                  <ul className="space-y-2 text-sm text-primary-700">
                    <li className="flex items-center gap-2">
                      <CheckCircle className="w-4 h-4 text-primary-600" />
                      Personalized 3D design visualization
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle className="w-4 h-4 text-primary-600" />
                      Detailed cost breakdown
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle className="w-4 h-4 text-primary-600" />
                      Expert design consultation
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle className="w-4 h-4 text-primary-600" />
                      Material and finish recommendations
                    </li>
                  </ul>
                </div>

                {/* Submit Button */}
                <button 
                  onClick={() => {
                    alert('Design session booked! Our team will contact you within 24 hours to confirm your appointment.');
                    setShowDesignSession(false);
                  }}
                  className="w-full bg-primary-600 hover:bg-primary-700 text-white font-bold py-4 px-6 rounded-lg transition-all duration-200 transform hover:scale-105"
                >
                  Book Free Design Session
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
