import Link from 'next/link';
import { ArrowRight, Sparkles, Star, ShoppingBag } from 'lucide-react';

export default function CollectionsPage() {
  const collections = [
    {
      id: 1,
      name: "Curtains",
      description: "Transform your windows with our elegant curtain collection. From sheer to blackout, modern to traditional designs.",
      image: "/curtains.jpg",
      slug: "curtains",
      productCount: "500+",
      features: ["Light Control", "Privacy", "Style", "Durability"]
    },
    {
      id: 2,
      name: "Roman Blinds",
      description: "Modern and stylish window treatments that offer perfect light control and elegant aesthetics.",
      image: "/blinds.jpg",
      slug: "blinds",
      productCount: "300+",
      features: ["Modern Design", "Easy Operation", "Space Saving", "Versatile"]
    },
    {
      id: 3,
      name: "Upholstery",
      description: "Premium fabrics for furniture that combine comfort, style, and durability for your living spaces.",
      image: "/upholstery.jpg",
      slug: "upholstery",
      productCount: "200+",
      features: ["Premium Quality", "Comfort", "Style", "Long-lasting"]
    },
    {
      id: 4,
      name: "Wallpapers",
      description: "Transform your walls with our stunning wallpaper collection. From geometric patterns to nature-inspired designs.",
      image: "/wallpapers.jpg",
      slug: "wallpapers",
      productCount: "400+",
      features: ["Easy Installation", "Removable", "Pattern Variety", "Quality"]
    },
    {
      id: 5,
      name: "Cushions",
      description: "Comfortable and decorative cushions that add personality and comfort to your home.",
      image: "/cushions.jpg",
      slug: "cushions",
      productCount: "250+",
      features: ["Comfort", "Decorative", "Washable", "Versatile"]
    },
    {
      id: 6,
      name: "Carpets & Rugs",
      description: "Soft and stylish floor coverings that add warmth and texture to your living spaces.",
      image: "/carpets.jpg",
      slug: "carpets",
      productCount: "150+",
      features: ["Soft Texture", "Warmth", "Style", "Easy Care"]
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-white">
      {/* Hero Section */}
      <section className="pt-32 pb-20 bg-gradient-to-br from-primary-50 to-pink-50 relative overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute top-20 left-10 w-72 h-72 bg-gradient-to-r from-primary-100 to-pink-100 rounded-full mix-blend-multiply filter blur-3xl opacity-70"></div>
          <div className="absolute bottom-20 right-10 w-72 h-72 bg-gradient-to-r from-blue-100 to-purple-100 rounded-full mix-blend-multiply filter blur-3xl opacity-70"></div>
        </div>
        
        <div className="relative z-10 container-custom text-center">
          <div className="inline-flex items-center gap-2 bg-glass px-6 py-3 rounded-full shadow-lg mb-6">
            <Sparkles className="w-5 h-5 text-primary-500" />
            <span className="text-sm font-semibold text-gray-700">Premium Collections</span>
          </div>
          
          <h1 className="text-5xl lg:text-6xl font-bold text-gray-900 mb-6">
            Explore Our{' '}
            <span className="text-gradient">
              Beautiful Collections
            </span>
          </h1>
          
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            Discover thoughtfully curated home furnishings that blend style, comfort, and functionality. 
            Each collection tells a unique story for your home.
          </p>
        </div>
      </section>

      {/* Collections Grid */}
      <section className="py-20">
        <div className="container-custom">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {collections.map((collection) => (
              <Link 
                key={collection.id} 
                href={`/collections/${collection.slug}`}
                className="group block"
              >
                <div className="card transform group-hover:scale-105">
                  {/* Collection Image */}
                  <div className="relative overflow-hidden aspect-[4/3]">
                    <div className="w-full h-full bg-gradient-to-br from-primary-100 via-pink-100 to-purple-100 flex items-center justify-center">
                      <div className="text-center">
                        <div className="w-20 h-20 bg-white/50 rounded-full flex items-center justify-center mx-auto mb-3 backdrop-blur-sm">
                          <ShoppingBag className="w-10 h-10 text-primary-600" />
                        </div>
                        <span className="text-gray-600 font-medium">{collection.name}</span>
                      </div>
                    </div>
                    
                    {/* Hover Overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      <div className="absolute bottom-4 left-4 right-4">
                        <div className="bg-glass rounded-xl p-3 text-center">
                          <span className="text-sm font-semibold text-gray-900">View Collection</span>
                        </div>
                      </div>
                    </div>
                    
                    {/* Collection Badge */}
                    <div className="absolute top-4 left-4">
                      <span className="bg-glass text-gray-700 text-xs font-semibold px-3 py-1 rounded-full shadow-sm">
                        {collection.productCount} Products
                      </span>
                    </div>
                  </div>
                  
                  {/* Collection Info */}
                  <div className="p-6">
                    <h3 className="text-xl font-bold text-gray-900 mb-2 group-hover:text-primary-600 transition-colors duration-300">
                      {collection.name}
                    </h3>
                    
                    <p className="text-gray-600 mb-4 line-clamp-2">
                      {collection.description}
                    </p>
                    
                    {/* Features */}
                    <div className="flex flex-wrap gap-2 mb-4">
                      {collection.features.map((feature, index) => (
                        <span 
                          key={index} 
                          className="text-xs bg-primary-50 text-primary-600 px-2 py-1 rounded-full"
                        >
                          {feature}
                        </span>
                      ))}
                    </div>
                    
                    {/* Collection Stats */}
                    <div className="flex items-center justify-between text-sm text-gray-500">
                      <span className="flex items-center gap-1">
                        <Star className="w-4 h-4 text-yellow-500 fill-current" />
                        <span>4.8</span>
                      </span>
                      <span>•</span>
                      <span>Premium Quality</span>
                      <span>•</span>
                      <span>Free Shipping</span>
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-gray-50 to-primary-50">
        <div className="container-custom text-center">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-6">
              Ready to Transform Your Home?
            </h2>
            
            <p className="text-lg text-gray-600 mb-8 leading-relaxed">
              Our expert team is here to help you choose the perfect pieces for your space. 
              Get personalized recommendations and expert advice.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/contact">
                <button className="btn-primary group">
                  <span>Get Expert Advice</span>
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-300" />
                </button>
              </Link>
              
              <Link href="/interior-design">
                <button className="btn-secondary group">
                  <span>Interior Design Services</span>
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-300" />
                </button>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
