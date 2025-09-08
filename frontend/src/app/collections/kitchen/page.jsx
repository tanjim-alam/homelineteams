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
import api from '@/services/api';

export default function KitchenCollectionPage() {
  const [activeTab, setActiveTab] = useState('quote');
  const [showDesignSession, setShowDesignSession] = useState(false);
  const [kitchenConfig, setKitchenConfig] = useState({
    kitchenType: '',
    layout: '',
    material: ''
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
        sourcePage: 'Kitchen Page',
        message: 'Interested in kitchen design',
        meta: {
          kitchenConfig,
          page: 'kitchen'
        }
      });
      
      alert('Kitchen design session booked! Our team will contact you within 24 hours to confirm your appointment.');
      setShowDesignSession(false);
      setLeadForm({ name: '', phone: '', city: '', homeType: '' });
    } catch (error) {
      console.error('Error submitting lead:', error);
      alert('Failed to submit your request. Please try again or contact us directly.');
    } finally {
      setSubmitting(false);
    }
  };

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
                    <h3 className="text-xl font-bold text-gray-900 mb-1">Filters</h3>
                    <p className="text-sm text-gray-600">{filteredKitchenPackages.length} kitchens found</p>
                  </div>

                  <div className="space-y-4">
                    {/* Kitchen Type Configuration */}
                    <div className="bg-white rounded-lg p-3 shadow-sm border border-gray-100">
                      <h4 className="text-sm font-semibold text-gray-900 mb-2 flex items-center gap-1">
                        <ChefHat className="w-4 h-4 text-orange-600" />
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
                              <span className="text-sm font-medium">{type}</span>
                              {kitchenConfig.kitchenType === type && (
                                <CheckCircle className="w-4 h-4 text-orange-600" />
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
                      className="flex items-center justify-center gap-1 px-3 py-2 text-sm text-gray-500 hover:text-gray-700 hover:bg-gray-100 rounded-md transition-all duration-200"
                    >
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                      </svg>
                      Clear all
                    </button>
                    <button 
                      onClick={() => setShowDesignSession(true)}
                      className="bg-gradient-to-r from-orange-600 to-red-600 hover:from-orange-700 hover:to-red-700 text-white px-3 py-2 rounded-md text-sm font-semibold shadow-lg transition-all duration-200"
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

        {/* Stats Section */}
        <div className="py-16 sm:py-20 bg-gradient-to-r from-primary-600 to-primary-700 hover:from-primary-600 hover:to-primary-700 text-white">
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
                          onClick={() => setLeadForm({ ...leadForm, homeType: type.name })}
                          className={`p-3 rounded-lg border-2 text-center transition-all duration-200 ${leadForm.homeType === type.name ? 'border-orange-400 bg-orange-50' : 'border-gray-200 hover:border-orange-300'}`}
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
                        className="w-full px-4 py-3 border border-gray-300 text-gray-700 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                        placeholder="Enter your name"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Phone Number</label>
                      <input
                        type="tel"
                        value={leadForm.phone}
                        onChange={(e) => setLeadForm({ ...leadForm, phone: e.target.value })}
                        className="w-full px-4 py-3 border border-gray-300 text-gray-700 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                        placeholder="Enter your phone"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">City</label>
                      <select 
                        value={leadForm.city}
                        onChange={(e) => setLeadForm({ ...leadForm, city: e.target.value })}
                        className="w-full px-4 py-3 border border-gray-300 text-gray-700 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
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
                    className={`w-full bg-orange-600 hover:bg-orange-700 text-white font-bold py-4 px-6 rounded-lg transition-all duration-200 transform hover:scale-105 ${submitting ? 'opacity-70 cursor-not-allowed' : 'cursor-pointer'}`}
                  >
                    {submitting ? 'Submitting...' : 'Book Free Kitchen Design Session'}
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
}