'use client';

import { Shield, Truck, Clock, Star, Award, Users, Heart, Zap } from 'lucide-react';

const WhyChooseUs = () => {
  const features = [
    {
      icon: Shield,
      title: "Premium Quality",
      description: "Every product is crafted with the finest materials and attention to detail",
      color: "from-blue-500 to-blue-600"
    },
    {
      icon: Truck,
      title: "Free Shipping",
      description: "Free delivery on all orders above ₹999 across India",
      color: "from-green-500 to-green-600"
    },
    {
      icon: Clock,
      title: "Fast Delivery",
      description: "Get your products delivered within 3-5 business days",
      color: "from-purple-500 to-purple-600"
    },
    {
      icon: Star,
      title: "Customer First",
      description: "24/7 support and easy returns for complete peace of mind",
      color: "from-yellow-500 to-yellow-600"
    }
  ];

  const stats = [
    { number: "50,000+", label: "Happy Customers", icon: Users, color: "text-blue-600" },
    { number: "10,000+", label: "Products Sold", icon: Heart, color: "text-primary-600" },
    { number: "4.8/5", label: "Customer Rating", icon: Star, color: "text-yellow-600" },
    { number: "24/7", label: "Support Available", icon: Zap, color: "text-green-600" }
  ];

  return (
    <section className="py-20 bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0">
        <div className="absolute top-20 left-10 w-72 h-72 bg-gradient-to-r from-primary-500/20 to-pink-500/20 rounded-full mix-blend-multiply filter blur-3xl"></div>
        <div className="absolute bottom-20 right-10 w-72 h-72 bg-gradient-to-r from-blue-500/20 to-purple-500/20 rounded-full mix-blend-multiply filter blur-3xl"></div>
        
        {/* Grid Pattern */}
        <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.05)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.05)_1px,transparent_1px)] bg-[size:50px_50px]"></div>
      </div>

      <div className="relative z-10 container-custom">
        {/* Section Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 bg-glass-dark px-6 py-3 rounded-full shadow-lg border border-white/20 mb-6">
            <Award className="w-5 h-5 text-yellow-400" />
            <span className="text-sm font-semibold text-white">Why Choose HomeLine</span>
          </div>
          
          <h2 className="text-4xl lg:text-5xl font-bold text-white mb-6">
            The{' '}
            <span className="bg-gradient-to-r from-primary-400 via-pink-400 to-primary-500 bg-clip-text text-transparent">
              HomeLine
            </span>
            {' '}Difference
          </h2>
          
          <p className="text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
            We're not just selling home furnishings – we're helping you create the home of your dreams. 
            Our commitment to quality, service, and innovation sets us apart.
          </p>
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
          {features.map((feature, index) => (
            <div key={index} className="group">
              <div className="bg-glass-dark rounded-2xl p-6 border border-white/10 hover:border-white/20 transition-all duration-500 hover:bg-white/10 transform hover:scale-105">
                <div className={`w-16 h-16 bg-gradient-to-r ${feature.color} rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300`}>
                  <feature.icon className="w-8 h-8 text-white" />
                </div>
                
                <h3 className="text-xl font-bold text-white text-center mb-3">
                  {feature.title}
                </h3>
                
                <p className="text-gray-300 text-center leading-relaxed">
                  {feature.description}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Stats Section */}
        <div className="bg-glass-dark rounded-3xl p-8 border border-white/10 mb-16">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <div key={index} className="text-center group">
                <div className="w-20 h-20 bg-white/10 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300">
                  <stat.icon className={`w-10 h-10 ${stat.color}`} />
                </div>
                
                <div className="text-3xl lg:text-4xl font-bold text-white mb-2">
                  {stat.number}
                </div>
                
                <div className="text-gray-300 font-medium">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Trust Indicators */}
        <div className="text-center">
          <div className="bg-glass-dark rounded-3xl p-8 border border-white/10">
            <h3 className="text-2xl font-bold text-white mb-6">
              Trusted by Thousands of Indian Homes
            </h3>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="text-center">
                <div className="w-16 h-16 bg-gradient-to-r from-green-500 to-green-600 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Shield className="w-8 h-8 text-white" />
                </div>
                <h4 className="text-lg font-semibold text-white mb-2">Quality Assured</h4>
                <p className="text-gray-300 text-sm">
                  Every product undergoes rigorous quality checks before reaching your home
                </p>
              </div>
              
              <div className="text-center">
                <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-blue-600 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Users className="w-8 h-8 text-white" />
                </div>
                <h4 className="text-lg font-semibold text-white mb-2">Expert Support</h4>
                <p className="text-gray-300 text-sm">
                  Our interior design experts are here to help you make the right choices
                </p>
              </div>
              
              <div className="text-center">
                <div className="w-16 h-16 bg-gradient-to-r from-purple-500 to-purple-600 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Heart className="w-8 h-8 text-white" />
                </div>
                <h4 className="text-lg font-semibold text-white mb-2">Made with Love</h4>
                <p className="text-gray-300 text-sm">
                  Crafted with care and attention to detail for your perfect home
                </p>
              </div>
            </div>
            
            <div className="mt-8 pt-8 border-t border-white/10">
              <p className="text-gray-400 text-sm">
                Join our community of satisfied customers who have transformed their homes with HomeLine
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default WhyChooseUs;
