'use client';

import { useState } from 'react';
import Link from 'next/link';
import { 
  Home, Calculator, Palette, Ruler, 
  ArrowRight, CheckCircle, Star, 
  Users, Award, Clock, Shield, ChefHat
} from 'lucide-react';
import Metadata from '@/components/Metadata';
import Image from 'next/image';

export default function KitchenCollectionPage() {
  const [activeTab, setActiveTab] = useState('quote');
  const [showDesignSession, setShowDesignSession] = useState(false);
  const [kitchenConfig, setKitchenConfig] = useState({
    kitchenType: '',
    layout: '',
    material: ''
  });

  // Sample kitchen data based on Qarpentri's offerings
  const allKitchenPackages = [
    {
      name: "An L-Shaped Kitchen In Forest Green And Frosty White Laminates",
      image: "https://images.unsplash.com/photo-1556909114-1184ffa95b32?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
      price: 149199,
      originalPrice: 156999,
      kitchenType: "L Shape"
    },
    {
      name: "A Parallel-Shaped Kitchen In Light Grey And Cream Coloured Laminates",
      image: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
      price: 142399,
      originalPrice: 149874,
      kitchenType: "Parallel Shape"
    },
    {
      name: "A Parallel Shaped Kitchen In Kingfisher Blue Paired With Frosted Glass Shutters",
      image: "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
      price: 128499,
      originalPrice: 135249,
      kitchenType: "Parallel Shape"
    },
    {
      name: "A Parallel Shaped Kitchen In Ebony And Light Grey",
      image: "https://images.unsplash.com/photo-1556909114-1184ffa95b32?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
      price: 119199,
      originalPrice: null,
      kitchenType: "Parallel Shape"
    },
    {
      name: "An L-Shaped Kitchen Finished In Natural Teak With Frosted Glass Shutters",
      image: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
      price: 113899,
      originalPrice: 119874,
      kitchenType: "L Shape"
    },
    {
      name: "An L-Shaped Kitchen In Wood Texture And Frosted Glass",
      image: "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
      price: 113599,
      originalPrice: 119499,
      kitchenType: "L Shape"
    },
    {
      name: "An L-Shaped Kitchen In Dark Walnut And Frosty White Laminates",
      image: "https://images.unsplash.com/photo-1556909114-1184ffa95b32?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
      price: 110399,
      originalPrice: 116124,
      kitchenType: "L Shape"
    },
    {
      name: "An L-Shaped Kitchen In Cream And Ebony Laminates",
      image: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
      price: 107199,
      originalPrice: 112749,
      kitchenType: "L Shape"
    },
    {
      name: "An L-Shaped Kitchen In Natural Teak Wood Finish",
      image: "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
      price: 105399,
      originalPrice: 110874,
      kitchenType: "L Shape"
    },
    {
      name: "An L-Shaped Kitchen In Mango Yellow And Frosty White",
      image: "https://images.unsplash.com/photo-1556909114-1184ffa95b32?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
      price: 102799,
      originalPrice: 108124,
      kitchenType: "L Shape"
    },
    {
      name: "A Parallel-Shaped Kitchen In Dark Walnut And Cream Coloured Laminates",
      image: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
      price: 102599,
      originalPrice: 107999,
      kitchenType: "Parallel Shape"
    },
    {
      name: "A Parallel Shaped Kitchen In A Pine Wood Finish Paired With Frosted Glass",
      image: "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
      price: 101899,
      originalPrice: 114398,
      kitchenType: "Parallel Shape"
    },
    {
      name: "An L-Shaped Kitchen In Light Grey And Rose Red",
      image: "https://images.unsplash.com/photo-1556909114-1184ffa95b32?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
      price: 100399,
      originalPrice: 105624,
      kitchenType: "L Shape"
    },
    {
      name: "A Parallel Shaped Kitchen In Berry And Frosty White",
      image: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
      price: 99399,
      originalPrice: 104624,
      kitchenType: "Parallel Shape"
    },
    {
      name: "An L-Shaped Kitchen In A Light Grey Laminate",
      image: "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
      price: 96899,
      originalPrice: 108798,
      kitchenType: "L Shape"
    },
    {
      name: "An L-Shaped Kitchen In Ebony Or Dark Wood Laminate",
      image: "https://images.unsplash.com/photo-1556909114-1184ffa95b32?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
      price: 94999,
      originalPrice: 106665,
      kitchenType: "L Shape"
    },
    {
      name: "A Light Grey L-Shaped Kitchen",
      image: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
      price: 92399,
      originalPrice: 97124,
      kitchenType: "L Shape"
    },
    {
      name: "An L-Shaped Kitchen In A Grey Linen Textured Finish",
      image: "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
      price: 90799,
      originalPrice: 95499,
      kitchenType: "L Shape"
    },
    {
      name: "A Berry Coloured L-Shaped Kitchen With Frosted Glass Shutters",
      image: "https://images.unsplash.com/photo-1556909114-1184ffa95b32?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
      price: 89799,
      originalPrice: 94499,
      kitchenType: "L Shape"
    },
    {
      name: "A Parallel Shaped Kitchen Finished In Ebony Or Dark Wood",
      image: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
      price: 88399,
      originalPrice: 92999,
      kitchenType: "Parallel Shape"
    },
    {
      name: "An L-Shaped Kitchen In Cream Coloured Laminate",
      image: "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
      price: 81699,
      originalPrice: 85999,
      kitchenType: "L Shape"
    },
    {
      name: "A Straight Kitchen Finished With Forest Green Coloured Laminate",
      image: "https://images.unsplash.com/photo-1556909114-1184ffa95b32?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
      price: 80699,
      originalPrice: 84874,
      kitchenType: "Straight Shape"
    },
    {
      name: "A Straight Kitchen Finished In Dark Walnut Coloured Laminate",
      image: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
      price: 79999,
      originalPrice: 84249,
      kitchenType: "Straight Shape"
    },
    {
      name: "An L-Shaped Kitchen In Brown Teak Finish Laminate",
      image: "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
      price: 73399,
      originalPrice: 77249,
      kitchenType: "L Shape"
    },
    {
      name: "A Straight Kitchen Finished With Natural Teak and Rose Red Laminate",
      image: "https://images.unsplash.com/photo-1556909114-1184ffa95b32?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
      price: 67999,
      originalPrice: 71624,
      kitchenType: "Straight Shape"
    },
    {
      name: "A Straight Kitchen Finished With Pine Wood And Frosted Glass Shutters",
      image: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
      price: 62699,
      originalPrice: 65874,
      kitchenType: "Straight Shape"
    },
    {
      name: "A Straight Kitchen In Mango Yellow and Light Grey Coloured Laminate",
      image: "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
      price: 59399,
      originalPrice: 62499,
      kitchenType: "Straight Shape"
    }
  ];

  // Filter kitchen packages based on configuration
  const filteredKitchenPackages = allKitchenPackages.filter(pkg => {
    const kitchenMatch = !kitchenConfig.kitchenType || pkg.kitchenType === kitchenConfig.kitchenType;
    return kitchenMatch;
  });

  return (
    <>
      <Metadata 
        title="Modular Kitchen Collection - HomeLine"
        description="Explore our complete range of modular kitchen designs with modern layouts, premium finishes, and expert consultation. Get instant quotes and 3D visualizations."
        keywords="modular kitchen, kitchen design, kitchen calculator, kitchen layouts, kitchen materials, kitchen appliances"
      />
      
      <div className="min-h-screen bg-gray-50">
        {/* Hero Section */}
        {/* <div className="relative text-white overflow-hidden min-h-[600px] flex items-center">
         
          <div className="absolute inset-0">
            <Image 
              src="/interior-design-img.jpg" 
              alt="Kitchen Collection Hero Background" 
              fill
              className="object-cover"
              priority
            />
            
            <div className="absolute inset-0 bg-gradient-to-br from-orange-600/50 via-red-700/50 to-orange-800/80"></div>
          </div>
          
         
          <div className="absolute inset-0">
            <div className="absolute top-20 right-10 w-72 h-72 bg-white/10 rounded-full mix-blend-multiply filter blur-3xl"></div>
            <div className="absolute bottom-20 left-10 w-72 h-72 bg-white/10 rounded-full mix-blend-multiply filter blur-3xl"></div>
          </div>
          
          <div className="container-custom py-16 sm:py-20 lg:py-24 px-4 sm:px-6 lg:px-8 relative z-10">
            <div className="max-w-4xl mx-auto text-center">
              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-6 leading-tight">
                Transform Your Kitchen with 
                <span className="block text-yellow-300">Modular Design Excellence</span>
              </h1>
              <p className="text-lg sm:text-xl text-orange-100 mb-8 max-w-2xl mx-auto">
                Get instant quotes, explore modular kitchen designs, and work with our expert designers to create your dream kitchen.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link 
                  href="#quote-estimator"
                  className="bg-yellow-400 hover:bg-yellow-500 text-orange-900 font-bold px-8 py-4 text-lg rounded-lg transition-all duration-200 transform hover:scale-105 shadow-lg"
                >
                  Get Your Free Kitchen Quote
                </Link>
                <Link 
                  href="#kitchen-calculator"
                  className="btn-secondary border-white text-white hover:bg-white hover:text-orange-600 px-8 py-4 text-lg font-semibold"
                >
                  Kitchen Calculator
                </Link>
              </div>
            </div>
          </div>
        </div> */}

        {/* Product Configuration Tool with Fixed Sidebar */}
        <div className="py-16 bg-white">
          <div className="container-custom px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-8">
              <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">Modular Kitchen</h2>
              <p className="text-lg text-gray-600">Find your perfect kitchen solution</p>
            </div>

            <div className="flex flex-col lg:flex-row gap-8">
              {/* Fixed Sidebar Filter */}
              <div className="lg:w-80 lg:sticky lg:top-8 lg:h-fit">
                <div className="bg-gradient-to-b from-orange-50 to-red-50 rounded-2xl p-4 border border-orange-100 shadow-lg">
                  <div className="text-center mb-4">
                    <h3 className="text-lg font-bold text-gray-900 mb-1">Filters</h3>
                    <p className="text-xs text-gray-600">{filteredKitchenPackages.length} kitchens found</p>
                  </div>

                  <div className="space-y-4">
                    {/* Kitchen Type Configuration */}
                    <div className="bg-white rounded-lg p-3 shadow-sm border border-gray-100">
                      <h4 className="text-xs font-semibold text-gray-900 mb-2 flex items-center gap-1">
                        <ChefHat className="w-3 h-3 text-orange-600" />
                        Kitchen Type
                      </h4>
                      <div className="space-y-1">
                        {['L Shape', 'Parallel Shape', 'Straight Shape'].map((type) => (
                          <button
                            key={type}
                            className={`w-full p-2 rounded-md border text-left text-gray-700 transition-all duration-200 ${
                              kitchenConfig.kitchenType === type
                                ? 'border-orange-600 bg-orange-100 text-orange-900'
                                : 'border-gray-200 hover:border-orange-300 hover:bg-orange-50'
                            }`}
                            onClick={() => setKitchenConfig({...kitchenConfig, kitchenType: type})}
                          >
                            <div className="flex items-center justify-between">
                              <span className="text-xs font-medium">{type}</span>
                              {kitchenConfig.kitchenType === type && (
                                <CheckCircle className="w-3 h-3 text-orange-600" />
                              )}
                            </div>
                          </button>
                        ))}
                      </div>
                    </div>
                  </div>

                  <div className="flex flex-col gap-2 mt-4 pt-3 border-t border-orange-200">
                    <button 
                      onClick={() => setKitchenConfig({kitchenType: '', layout: '', material: ''})}
                      className="flex items-center justify-center gap-1 px-3 py-2 text-xs text-gray-500 hover:text-gray-700 hover:bg-gray-100 rounded-md transition-all duration-200"
                    >
                      <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                      </svg>
                      Clear all
                    </button>
                    <button 
                      onClick={() => setShowDesignSession(true)}
                      className="bg-gradient-to-r from-orange-600 to-red-600 hover:from-orange-700 hover:to-red-700 text-white px-3 py-2 rounded-md text-xs font-semibold shadow-lg transition-all duration-200"
                    >
                      Book Consultation
                    </button>
                  </div>
                </div>
              </div>

              {/* Product Listings */}
              <div className="flex-1">
                {filteredKitchenPackages.length > 0 ? (
                  <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                    {filteredKitchenPackages.map((kitchen, index) => (
                      <div key={index} className="bg-white rounded-xl shadow-lg overflow-hidden border border-gray-200 hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
                        <div className="h-48 bg-cover bg-center bg-no-repeat" style={{backgroundImage: `url("${kitchen.image}")`}}>
                          <div className="h-full bg-opacity-20 flex items-end">
                            <div className="p-3 text-white">
                              <p className="text-sm font-medium line-clamp-2">{kitchen.name}</p>
                            </div>
                          </div>
                        </div>
                        <div className="p-4">
                          <h3 className="font-semibold text-gray-900 mb-2 line-clamp-2 text-sm">{kitchen.name}</h3>
                          <div className="flex items-center gap-2 mb-3">
                            <span className="text-xs text-gray-500">*Excluding applicable taxes</span>
                          </div>
                          <div className="flex items-center gap-2 mb-3">
                            <span className="text-lg font-bold text-gray-900">₹ {kitchen.price.toLocaleString()}</span>
                            {kitchen.originalPrice && (
                              <span className="text-sm text-gray-500 line-through">₹ {kitchen.originalPrice.toLocaleString()}</span>
                            )}
                          </div>
                          <div className="text-xs text-gray-600 mb-3">Delivery in 15 days*</div>
                          <button 
                            onClick={() => setShowDesignSession(true)}
                            className="w-full bg-gradient-to-r from-orange-600 to-red-600 hover:from-orange-700 hover:to-red-700 text-white py-2 rounded-lg font-semibold transition-all duration-200 transform hover:scale-105 text-sm"
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
                      <ChefHat className="w-10 h-10 text-gray-400" />
                    </div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">No kitchens found</h3>
                    <p className="text-gray-600 mb-4">Try adjusting your filters to see more options</p>
                    <button 
                      onClick={() => setKitchenConfig({kitchenType: '', layout: '', material: ''})}
                      className="bg-orange-600 hover:bg-orange-700 text-white px-6 py-2 rounded-lg font-semibold transition-all duration-200"
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
                Why Choose HomeLine Kitchen Design?
              </h2>
              <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                We combine technology with expertise to deliver exceptional kitchen design solutions
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
                  description: "Work with certified kitchen designers with 10+ years experience"
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
                <div key={index} className="text-center p-6 rounded-2xl bg-white hover:bg-orange-50 transition-colors duration-300">
                  <div className="w-16 h-16 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <feature.icon className="w-8 h-8 text-orange-600" />
                  </div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">{feature.title}</h3>
                  <p className="text-gray-600 text-sm">{feature.description}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Quote Estimator Section */}
        <div id="quote-estimator" className="py-16 sm:py-20 bg-white">
          <div className="container-custom px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto">
              <div className="text-center mb-12">
                <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
                  Get Your Free Kitchen Design Quote
                </h2>
                <p className="text-lg text-gray-600">
                  Answer a few questions and get an instant estimate for your kitchen project
                </p>
              </div>

              <div className="bg-white rounded-2xl shadow-lg p-6 sm:p-8 border border-gray-200">
                <QuoteEstimator />
              </div>
            </div>
          </div>
        </div>

        {/* Kitchen Calculator Section */}
        <div id="kitchen-calculator" className="py-16 sm:py-20 bg-gray-50">
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
        <div className="py-16 sm:py-20 bg-orange-600 text-white">
          <div className="container-custom px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
              {[
                { number: "3000+", label: "Kitchen Projects" },
                { number: "10+", label: "Years Experience" },
                { number: "98%", label: "Customer Satisfaction" },
                { number: "24/7", label: "Support Available" }
              ].map((stat, index) => (
                <div key={index}>
                  <div className="text-3xl sm:text-4xl font-bold mb-2">{stat.number}</div>
                  <div className="text-orange-100">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* CTA Section */}
        <div className="py-16 sm:py-20 bg-gray-900 text-white">
          <div className="container-custom px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold mb-4">
              Ready to Transform Your Kitchen?
            </h2>
            <p className="text-lg text-gray-300 mb-8 max-w-2xl mx-auto">
              Get in touch with our kitchen design experts for a personalized consultation and detailed project planning.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link 
                href="/contact"
                className="btn-primary bg-orange-600 hover:bg-orange-700 px-8 py-4 text-lg font-semibold"
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
    { id: 1, title: 'Kitchen Type', description: 'Select your kitchen type' },
    { id: 2, title: 'Layout', description: 'Choose kitchen layout' },
    { id: 3, title: 'Style & Materials', description: 'Set your design preferences' },
    { id: 4, title: 'Contact Info', description: 'Share your details' }
  ];

  const kitchenTypes = [
    { id: 'small', name: 'Small Kitchen', description: 'Perfect for compact spaces' },
    { id: 'medium', name: 'Medium Kitchen', description: 'Ideal for average homes' },
    { id: 'large', name: 'Large Kitchen', description: 'Spacious family kitchens' },
    { id: 'luxury', name: 'Luxury Kitchen', description: 'Premium standalone kitchens' }
  ];

  const layouts = [
    { id: 'straight', name: 'Straight Line', icon: '📏' },
    { id: 'l-shape', name: 'L-Shape', icon: '📐' },
    { id: 'u-shape', name: 'U-Shape', icon: '🔄' },
    { id: 'island', name: 'Island', icon: '🏝️' }
  ];

  const handleNext = () => {
    if (currentStep < 4) setCurrentStep(currentStep + 1);
  };

  const handlePrev = () => {
    if (currentStep > 1) setCurrentStep(currentStep - 1);
  };

  const getProjectType = () => {
    const kitchenType = kitchenTypes.find(h => h.id === formData.homeType);
    return kitchenType ? `${kitchenType.name} Design` : 'Kitchen Design Project';
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
                  ? 'bg-orange-600 text-white' 
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
            className="bg-orange-600 h-2 rounded-full transition-all duration-300"
            style={{ width: `${(currentStep / 4) * 100}%` }}
          ></div>
        </div>
      </div>

      {/* Step Content */}
      <div className="mb-8">
        {currentStep === 1 && (
          <div>
            <h3 className="text-xl font-semibold text-gray-900 mb-6">What type of kitchen are you designing?</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {kitchenTypes.map((type) => (
                <button
                  key={type.id}
                  onClick={() => setFormData({...formData, homeType: type.id})}
                  className={`p-4 rounded-xl border-2 text-left transition-all duration-200 ${
                    formData.homeType === type.id
                      ? 'border-orange-600 bg-orange-50'
                      : 'border-gray-200 hover:border-orange-300'
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
            <h3 className="text-xl font-semibold text-gray-900 mb-6">Which layout would you prefer?</h3>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
              {layouts.map((layout) => (
                <button
                  key={layout.id}
                  onClick={() => setFormData({...formData, rooms: [layout.id]})}
                  className={`p-4 rounded-xl border-2 text-center transition-all duration-200 ${
                    formData.rooms.includes(layout.id)
                      ? 'border-orange-600 bg-orange-50'
                      : 'border-gray-200 hover:border-orange-300'
                  }`}
                >
                  <div className="text-2xl mb-2">{layout.icon}</div>
                  <div className="text-sm font-medium text-gray-900">{layout.name}</div>
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
                          ? 'border-orange-600 bg-orange-50'
                          : 'border-gray-200 hover:border-orange-300'
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
                          ? 'border-orange-600 bg-orange-50'
                          : 'border-gray-200 hover:border-orange-300'
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
                    className="w-full px-4 py-3 border border-gray-300 text-gray-700 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
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
                    className="w-full px-4 py-3 border border-gray-300 text-gray-700 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
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
                    className="w-full px-4 py-3 border border-gray-300 text-gray-700 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
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
                    className="w-full px-4 py-3 border border-gray-300 text-gray-700 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
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
            className="bg-orange-600 hover:bg-orange-700 text-white px-6 py-3 flex items-center gap-2 rounded-lg"
          >
            Next Step
            <ArrowRight className="w-4 h-4" />
          </button>
        ) : (
          <button
            onClick={() => {
              alert('Kitchen quote request submitted! Our team will contact you within 24 hours.');
            }}
            className="bg-orange-600 hover:bg-orange-700 text-white px-6 py-3 flex items-center justify-center gap-2 rounded-lg"
          >
            Get Free Quote
            <CheckCircle className="w-4 h-4" />
          </button>
        )}
      </div>

      {/* Project Summary */}
      {currentStep >= 2 && (
        <div className="mt-8 p-4 bg-orange-50 rounded-xl border border-orange-200">
          <div className="text-center">
            <div className="text-sm text-orange-600 font-medium mb-1">Project Summary</div>
            <div className="text-lg font-bold text-orange-700">{getProjectType()}</div>
            <div className="text-xs text-orange-600 mt-1">Our design team will provide a detailed quote after consultation</div>
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
                      ? 'border-orange-600 bg-orange-50'
                      : 'border-gray-200 hover:border-orange-300'
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
                      ? 'border-orange-600 bg-orange-50'
                      : 'border-gray-200 hover:border-orange-300'
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
                            ? 'border-orange-600 bg-orange-50'
                            : 'border-gray-200 hover:border-orange-300'
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
                      ? 'border-orange-600 bg-orange-50'
                      : 'border-gray-200 hover:border-orange-300'
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
                      ? 'border-orange-600 bg-orange-50'
                      : 'border-gray-200 hover:border-orange-300'
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
                className="w-full bg-orange-400 hover:bg-orange-500 text-orange-900 font-bold py-3 px-6 rounded-lg transition-all duration-200 transform hover:scale-105"
              >
                BOOK FREE DESIGN SESSION
              </button>
              <button className="w-full bg-orange-600 hover:bg-orange-700 text-white py-3 rounded-lg">
                Get Detailed Quote
              </button>
              <button className="w-full border border-orange-600 text-orange-600 hover:bg-orange-50 py-3 rounded-lg">
                Schedule Site Visit
              </button>
            </div>

            <div className="mt-6 p-4 bg-orange-50 rounded-lg">
              <div className="flex items-center gap-2 text-orange-700 font-medium mb-2">
                <Star className="w-4 h-4" />
                Free Design Consultation
              </div>
              <p className="text-sm text-orange-600">
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
                <h2 className="text-2xl font-bold text-gray-900">Book Free Kitchen Design Session</h2>
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
                        className="p-3 rounded-lg border-2 text-center transition-all duration-200 border-gray-200 hover:border-orange-300"
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
                      className="w-full px-4 py-3 border border-gray-300 text-gray-700 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                      placeholder="Enter your name"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Phone Number</label>
                    <input
                      type="tel"
                      className="w-full px-4 py-3 border border-gray-300 text-gray-700 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                      placeholder="Enter your phone"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">City</label>
                    <select className="w-full px-4 py-3 border border-gray-300 text-gray-700 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent">
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
                  onClick={() => {
                    alert('Kitchen design session booked! Our team will contact you within 24 hours to confirm your appointment.');
                    setShowDesignSession(false);
                  }}
                  className="w-full bg-orange-600 hover:bg-orange-700 text-white font-bold py-4 px-6 rounded-lg transition-all duration-200 transform hover:scale-105"
                >
                  Book Free Kitchen Design Session
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
