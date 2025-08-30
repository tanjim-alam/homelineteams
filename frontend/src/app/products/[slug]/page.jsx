'use client';

import { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import { 
  ChevronLeft, Star, Heart, ShoppingCart, Truck, Shield, 
  RotateCcw, Package, Minus, Plus 
} from 'lucide-react';
import api from '@/services/api';

export default function ProductDetailPage() {
  const { slug } = useParams();
  
  const [product, setProduct] = useState(null);
  const [selectedVariant, setSelectedVariant] = useState(null);
  const [selectedImage, setSelectedImage] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isWishlisted, setIsWishlisted] = useState(false);
  const [category, setCategory] = useState(null);
  const [variantOptions, setVariantOptions] = useState({});
  const [selectedOptions, setSelectedOptions] = useState({});
  const [activeTab, setActiveTab] = useState('description');

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        setLoading(true);
        const productData = await api.getProductBySlug(slug);
        setProduct(productData);
        
        // Fetch category to get variant field definitions
        if (productData.categoryId) {
          try {
            const categoryData = await api.getCategoryById(productData.categoryId);
            setCategory(categoryData);
            
            // Initialize variant options from product data
            if (productData.variantOptions) {
              setVariantOptions(productData.variantOptions);
            }
            
            // Initialize selected options with first variant if available
            if (productData.hasVariants && productData.variants?.length > 0) {
              const firstVariant = productData.variants[0];
              setSelectedVariant(firstVariant);
              
              // Initialize selected options from first variant
              if (firstVariant.fields) {
                const initialOptions = {};
                Object.keys(firstVariant.fields).forEach(key => {
                  initialOptions[key] = firstVariant.fields[key];
                });
                setSelectedOptions(initialOptions);
              }
            }
          } catch (categoryErr) {
            console.warn('Could not fetch category:', categoryErr);
          }
        }
      } catch (err) {
        console.error('Error fetching product:', err);
        setError(err.message || 'Something went wrong');
      } finally {
        setLoading(false);
      }
    };

    if (slug) fetchProduct();
  }, [slug]);

  // Handle option selection for any variant field
  const handleOptionSelect = (fieldSlug, value) => {
    const newSelectedOptions = { ...selectedOptions, [fieldSlug]: value };
    setSelectedOptions(newSelectedOptions);

    // Find matching variant based on selected options
    if (product?.hasVariants && product.variants) {
      const matchingVariant = product.variants.find(variant => {
        // Check if all selected options match the variant
        return Object.keys(newSelectedOptions).every(key => {
          const selectedValue = newSelectedOptions[key];
          const variantValue = variant.fields?.[key];
          return !selectedValue || variantValue === selectedValue;
        });
      });

      if (matchingVariant) {
        setSelectedVariant(matchingVariant);
        setQuantity(1);
      }
    }
  };

  const handleQuantityChange = (newQuantity) => {
    if (newQuantity >= 1 && newQuantity <= (selectedVariant?.stock || 999)) {
      setQuantity(newQuantity);
    }
  };

  const getCurrentPrice = () => selectedVariant?.price || product?.basePrice || 0;
  const getCurrentMRP = () => selectedVariant?.mrp || product?.basePrice || 0;

  const getDiscountPercentage = () => {
    const price = getCurrentPrice();
    const mrp = getCurrentMRP();
    if (mrp > price && price > 0) {
      return Math.round(((mrp - price) / mrp) * 100);
    }
    return 0;
  };

  const isOutOfStock = () => selectedVariant?.stock <= 0;

  // Get available options for each variant field
  const getAvailableOptions = () => {
    if (!product?.hasVariants || !product.variants) return {};
    
    const options = {};
    
    // Get unique values for each field from variants
    product.variants.forEach(variant => {
      if (variant.fields) {
        Object.keys(variant.fields).forEach(fieldSlug => {
          if (!options[fieldSlug]) {
            options[fieldSlug] = new Set();
          }
          options[fieldSlug].add(variant.fields[fieldSlug]);
        });
      }
    });

    // Convert Sets to Arrays and sort
    Object.keys(options).forEach(fieldSlug => {
      options[fieldSlug] = Array.from(options[fieldSlug]).sort();
    });

    return options;
  };

  // Get field display name and unit from category
  const getFieldDisplayInfo = (fieldSlug) => {
    if (!category?.variantFields) return { name: fieldSlug, unit: '' };
    
    const fieldDef = category.variantFields.find(f => f.slug === fieldSlug);
    return {
      name: fieldDef?.name || fieldSlug,
      unit: fieldDef?.unit || ''
    };
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <p className="text-gray-500">Loading product...</p>
      </div>
    );
  }

  if (error || !product) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Product not found</h2>
          <p className="text-gray-600 mb-4">{error || 'The product you are looking for does not exist.'}</p>
          <Link href="/collections" className="btn-primary">Browse Products</Link>
        </div>
      </div>
    );
  }

  const currentPrice = getCurrentPrice();
  const currentMRP = getCurrentMRP();
  const discount = getDiscountPercentage();

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Breadcrumb */}
      <div className="bg-white border-b">
        <div className="container-custom py-4">
          <nav className="flex items-center space-x-2 text-sm text-gray-500">
            <Link href="/" className="hover:text-primary-600">Home</Link>
            <ChevronLeft className="w-4 h-4" />
            <Link href="/collections" className="hover:text-primary-600">Collections</Link>
            <ChevronLeft className="w-4 h-4" />
            <span className="text-gray-900 font-medium">{product.name}</span>
          </nav>
        </div>
      </div>

      {/* Main Product Section */}
      <div className="bg-white">
        <div className="container-custom py-12">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
            
            {/* Product Images */}
            <div className="space-y-6">
              <div className="relative aspect-square rounded-3xl overflow-hidden shadow-lg bg-gray-100">
                {product.mainImages?.length > 0 ? (
                  <Image
                    src={product.mainImages[selectedImage]}
                    alt={product.name}
                    fill
                    className="object-cover hover:scale-105 transition-transform duration-500"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center">
                    <Package className="w-20 h-20 text-gray-400" />
                  </div>
                )}
              </div>

              {product.mainImages?.length > 1 && (
                <div className="flex gap-3 justify-center">
                  {product.mainImages.map((img, idx) => (
                    <button
                      key={idx}
                      onClick={() => setSelectedImage(idx)}
                      className={`relative w-20 h-20 rounded-xl overflow-hidden border-2 ${
                        selectedImage === idx
                          ? 'border-primary-600 ring-2 ring-primary-200'
                          : 'border-gray-200 hover:border-primary-300'
                      }`}
                    >
                      <Image src={img} alt={`${product.name} ${idx + 1}`} fill className="object-cover" />
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Product Info */}
            <div className="space-y-8">
              <div>
                <h1 className="text-4xl font-bold text-gray-900 mb-4">{product.name}</h1>
                
                {/* Rating */}
                <div className="flex items-center gap-2 mb-6">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className={`w-5 h-5 ${i < 4 ? 'text-yellow-400 fill-current' : 'text-gray-300'}`} />
                  ))}
                  <span className="text-gray-600 text-sm">(128 reviews)</span>
                </div>

                {/* Price */}
                <div className="flex items-center gap-3 mb-6">
                  <span className="text-3xl font-bold text-gray-900">₹{currentPrice.toFixed(2)}</span>
                  {discount > 0 && (
                    <>
                      <span className="text-xl text-gray-500 line-through">₹{currentMRP.toFixed(2)}</span>
                      <span className="bg-red-100 text-red-600 px-2 py-1 rounded-full text-sm font-bold">
                        -{discount}%
                      </span>
                    </>
                  )}
                </div>
              </div>

              {/* <p className="text-gray-600">{product.description || 'Premium quality product for your home.'}</p> */}

              {/* Dynamic Variant Selection */}
              {product.hasVariants && Object.keys(getAvailableOptions()).length > 0 && (
                <div className="space-y-6">
                  <h3 className="text-lg font-semibold text-gray-900">Select Options</h3>
                  
                  {Object.keys(getAvailableOptions()).map(fieldSlug => {
                                         const fieldInfo = getFieldDisplayInfo(fieldSlug);
                     const options = getAvailableOptions()[fieldSlug];
                     const selectedValue = selectedOptions[fieldSlug];
                     
                     // Check if this is a color field (by name or slug)
                     const isColorField = fieldSlug.toLowerCase().includes('color') || 
                                        fieldInfo.name.toLowerCase().includes('color') ||
                                        fieldSlug.toLowerCase().includes('colour') ||
                                        fieldInfo.name.toLowerCase().includes('colour');
                     
                     return (
                      <div key={fieldSlug}>
                        <h4 className="font-medium text-gray-900 mb-3">
                          Select {fieldInfo.name}
                          {fieldInfo.unit && <span className="text-gray-500 ml-1">({fieldInfo.unit})</span>}
                        </h4>
                                                 {isColorField ? (
                           // Color variant selector with swatches
                           <div className="flex flex-wrap gap-3">
                             {options.map(option => {
                               // Try to extract hex code from option (format: "Color Name (#HEXCODE)")
                               const colorMatch = option.match(/^(.+?)\s*\(#([A-Fa-f0-9]{6})\)$/);
                               const colorName = colorMatch ? colorMatch[1] : option;
                               const hexCode = colorMatch ? colorMatch[2] : null;
                               
                               const isSelected = selectedValue === option;
                               
                               return (
                                 <button
                                   key={option}
                                   onClick={() => handleOptionSelect(fieldSlug, option)}
                                   className={`relative group transition-all duration-200 ${
                                     isSelected
                                       ? ' ring-primary-600 ring-offset-2'
                                       : 'hover:scale-105'
                                   }`}
                                   title={`${colorName}${hexCode ? ` - #${hexCode}` : ''}`}
                                 >
                                   {/* Color Swatch */}
                                   <div className="w-10 h-10 rounded-full border-gray-200 overflow-hidden shadow-md hover:shadow-lg transition-shadow duration-200">
                                     {hexCode ? (
                                       <div 
                                         className="w-full h-full"
                                         style={{ backgroundColor: `#${hexCode}` }}
                                       />
                                     ) : (
                                       <div className="w-full h-full bg-gradient-to-br from-gray-300 to-gray-400 flex items-center justify-center">
                                         <span className="text-xs text-gray-600 text-center px-1">
                                           {colorName.length > 8 ? colorName.substring(0, 8) + '...' : colorName}
                                         </span>
                                       </div>
                                     )}
                                   </div>
                                   
                                   {/* Color Name */}
                                   <div className={`mt-3 text-center text-sm font-medium ${
                                     isSelected ? 'text-primary-700' : 'text-gray-700'
                                   }`}>
                                     {colorName.length > 12 ? colorName.substring(0, 12) + '...' : colorName}
                                   </div>
                                   
                                   {/* Selection Indicator */}
                                   {isSelected && (
                                     <div className="absolute -top-2 -right-2 w-6 h-6 bg-primary-600 rounded-full flex items-center justify-center shadow-lg">
                                       <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 20 20">
                                         <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                                       </svg>
                                     </div>
                                   )}
                                 </button>
                               );
                             })}
                           </div>
                         ) : (
                           // Regular variant selector for non-color fields
                           <div className="flex flex-wrap gap-3">
                             {options.map(option => (
                               <button
                                 key={option}
                                 onClick={() => handleOptionSelect(fieldSlug, option)}
                                 className={`px-4 py-2 border-2 rounded-lg text-gray-600 transition-all duration-200 ${
                                   selectedValue === option
                                     ? 'border-primary-600 bg-primary-50 text-primary-700'
                                     : 'border-gray-200 hover:border-primary-300'
                                 }`}
                               >
                                 {option}
                               </button>
                             ))}
                           </div>
                         )}
                      </div>
                    );
                  })}

                  {/* Selected Variant Info */}
                  {selectedVariant && (
                    <div className="bg-gray-50 p-4 rounded-xl">
                      <div className="flex items-center justify-between mb-3">
                        <span className="font-medium text-gray-900">Selected Configuration:</span>
                        <span className="text-sm text-gray-600">
                          Stock: {selectedVariant.stock || 0}
                        </span>
                      </div>
                                             <div className="text-sm text-gray-600 space-y-3">
                         {selectedVariant.fields && Object.entries(selectedVariant.fields).map(([key, value]) => {
                           const fieldInfo = getFieldDisplayInfo(key);
                           const isColorField = key.toLowerCase().includes('color') || 
                                              fieldInfo.name.toLowerCase().includes('color') ||
                                              key.toLowerCase().includes('colour') ||
                                              fieldInfo.name.toLowerCase().includes('colour');
                           
                           // Try to extract hex code from value (format: "Color Name (#HEXCODE)")
                           const colorMatch = value.match(/^(.+?)\s*\(#([A-Fa-f0-9]{6})\)$/);
                           const colorName = colorMatch ? colorMatch[1] : value;
                           const hexCode = colorMatch ? colorMatch[2] : null;
                           
                           return (
                             <div key={key} className="flex items-center justify-between">
                               <span className="font-medium">{fieldInfo.name}:</span>
                               <div className="flex items-center gap-2">
                                 {isColorField && hexCode && (
                                   <div 
                                     className="w-6 h-6 rounded-full border-2 border-gray-300 shadow-sm"
                                     style={{ backgroundColor: `#${hexCode}` }}
                                     title={`${colorName} (#${hexCode})`}
                                   />
                                 )}
                                 <span>
                                   {colorName} {fieldInfo.unit}
                                   {hexCode && <span className="text-gray-500 ml-1">#{hexCode}</span>}
                                 </span>
                               </div>
                             </div>
                           );
                         })}
                       </div>
                    </div>
                  )}
                </div>
              )}

              {/* Quantity */}
              <div>
                <h3 className="font-semibold text-gray-900 mb-3">Quantity</h3>
                <div className="flex items-center gap-4">
                  <div className="flex items-center border-2 border-gray-200 rounded-xl overflow-hidden">
                    <button
                      onClick={() => handleQuantityChange(quantity - 1)}
                      className="w-12 h-12 flex items-center justify-center hover:bg-gray-50 transition-colors"
                    >
                      <Minus className="w-5 h-5 text-gray-600" />
                    </button>
                    <span className="w-16 text-center font-bold text-lg text-gray-600">{quantity}</span>
                    <button
                      onClick={() => handleQuantityChange(quantity + 1)}
                      className="w-12 h-12 flex items-center justify-center hover:bg-gray-50 transition-colors"
                    >
                      <Plus className="w-5 h-5 text-gray-600" />
                    </button>
                  </div>
                  <span className="text-sm text-gray-500">
                    {selectedVariant?.stock || 999} available
                  </span>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex gap-3">
                <button 
                  disabled={isOutOfStock()}
                  className={`flex-1 py-4 px-8 rounded-2xl font-bold text-lg transition-all duration-300 flex items-center justify-center gap-3 ${
                    isOutOfStock() 
                      ? 'bg-gray-300 text-gray-600 cursor-not-allowed' 
                      : 'bg-primary-600 text-white hover:bg-primary-700 hover:shadow-xl transform hover:scale-105'
                  }`}
                >
                  <ShoppingCart className="w-6 h-6" />
                  {isOutOfStock() ? 'Out of Stock' : 'Add to Cart'}
                </button>

                <button
                  onClick={() => setIsWishlisted(!isWishlisted)}
                  className={`p-4 rounded-2xl border-2 transition-all duration-300 text-red-600 hover:shadow-lg ${
                    isWishlisted ? 'border-red-500 bg-red-50 text-red-600' : 'border-gray-300 hover:border-primary-300 hover:text-primary-600'
                  }`}
                >
                  <Heart className={`w-6 h-6 ${isWishlisted ? 'fill-current ' : ''}`} />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Product Details Tabs */}
      <div className="bg-white border-t border-gray-100">
        <div className="container-custom py-12">
          {/* Tab Navigation */}
          <div className="flex border-b border-gray-200 mb-8">
            {[
              { id: 'description', label: 'Description' },
              // { id: 'specifications', label: 'Specifications' },
              { id: 'custom-fields', label: 'Product Details' },
              { id: 'reviews', label: 'Reviews' },
              { id: 'shipping', label: 'Shipping & Returns' }
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`px-6 py-3 font-semibold transition-all duration-200 border-b-2 ${
                  activeTab === tab.id
                    ? 'border-primary-600 text-primary-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>

          {/* Tab Content */}
          <div className="min-h-[400px]">
            {activeTab === 'description' && (
              <div className="prose max-w-none">
                <h3 className="text-2xl font-bold text-gray-900 mb-4">Product Description</h3>
                <div className="text-gray-600 leading-relaxed text-lg mb-6">
                  {product.description ? (
                    <div dangerouslySetInnerHTML={{ __html: product.description }} />
                  ) : (
                    <p>This premium product is designed to enhance your living space with its exceptional quality and beautiful design. Made from the finest materials, it combines functionality with aesthetic appeal to create the perfect addition to your home.</p>
                  )}
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8">
                  <div className="bg-gray-50 p-6 rounded-2xl">
                    <h4 className="font-semibold text-gray-900 mb-3">Key Features</h4>
                    <ul className="space-y-2">
                      <li className="flex items-center gap-2">
                        <div className="w-5 h-5 bg-green-500 rounded-full flex items-center justify-center">
                          <span className="text-white text-xs">✓</span>
                        </div>
                        <span className="text-gray-600">Premium quality materials</span>
                      </li>
                      <li className="flex items-center gap-2">
                        <div className="w-5 h-5 bg-green-500 rounded-full flex items-center justify-center">
                          <span className="text-white text-xs">✓</span>
                        </div>
                        <span className="text-gray-600">Easy to maintain</span>
                      </li>
                      <li className="flex items-center gap-2">
                        <div className="w-5 h-5 bg-green-500 rounded-full flex items-center justify-center">
                          <span className="text-white text-xs">✓</span>
                        </div>
                        <span className="text-gray-600">Long-lasting durability</span>
                      </li>
                      <li className="flex items-center gap-2">
                        <div className="w-5 h-5 bg-green-500 rounded-full flex items-center justify-center">
                          <span className="text-white text-xs">✓</span>
                        </div>
                        <span className="text-gray-600">Modern design aesthetic</span>
                      </li>
                    </ul>
                  </div>
                  
                  <div className="bg-gray-50 p-6 rounded-2xl">
                    <h4 className="font-semibold text-gray-900 mb-3">Care Instructions</h4>
                    <ul className="space-y-2">
                      <li className="flex items-center gap-2">
                        <div className="w-5 h-5 bg-blue-500 rounded-full flex items-center justify-center">
                          <span className="text-white text-xs">✓</span>
                        </div>
                        <span className="text-gray-600">Regular cleaning recommended</span>
                      </li>
                      <li className="flex items-center gap-2">
                        <div className="w-5 h-5 bg-blue-500 rounded-full flex items-center justify-center">
                          <span className="text-white text-xs">✓</span>
                        </div>
                        <span className="text-gray-600">Avoid harsh chemicals</span>
                      </li>
                      <li className="flex items-center gap-2">
                        <div className="w-5 h-5 bg-blue-500 rounded-full flex items-center justify-center">
                          <span className="text-white text-xs">✓</span>
                        </div>
                        <span className="text-gray-600">Store in dry place</span>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'specifications' && (
              <div>
                <h3 className="text-2xl font-bold text-gray-900 mb-6">Product Specifications</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <div className="flex justify-between py-3 border-b border-gray-200">
                      <span className="font-medium text-gray-700">Material</span>
                      <span className="text-gray-900">Premium Fabric</span>
                    </div>
                    <div className="flex justify-between py-3 border-b border-gray-200">
                      <span className="font-medium text-gray-700">Weight</span>
                      <span className="text-gray-900">2.5 kg</span>
                    </div>
                    <div className="flex justify-between py-3 border-b border-gray-200">
                      <span className="font-medium text-gray-700">Dimensions</span>
                      <span className="text-gray-900">120 x 60 cm</span>
                    </div>
                  </div>
                  
                  <div className="space-y-4">
                    <div className="flex justify-between py-3 border-b border-gray-200">
                      <span className="font-medium text-gray-700">Color</span>
                      <span className="text-gray-900">Multiple Options</span>
                    </div>
                    <div className="flex justify-between py-3 border-b border-gray-200">
                      <span className="font-medium text-gray-700">Warranty</span>
                      <span className="text-gray-900">1 Year</span>
                    </div>
                    <div className="flex justify-between py-3 border-b border-gray-200">
                      <span className="font-medium text-gray-700">Country of Origin</span>
                      <span className="text-gray-900">India</span>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'custom-fields' && (
              <div>
                <h3 className="text-2xl font-bold text-gray-900 mb-6">Product Details</h3>
                
                {/* Custom Fields from Product */}
                {product.dynamicFields && Object.keys(product.dynamicFields).length > 0 && (
                  <div className="mb-8">
                    <h4 className="text-lg font-semibold text-gray-900 mb-4">Product Information</h4>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {Object.entries(product.dynamicFields).map(([key, value]) => (
                        <div key={key} className="bg-gray-50 p-4 rounded-xl">
                          <div className="font-medium text-gray-900 capitalize mb-1">
                            {key.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase())}
                          </div>
                          <div className="text-gray-600">
                            {typeof value === 'string' ? value : JSON.stringify(value)}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Variant Options Available */}
                {Object.keys(getAvailableOptions()).length > 0 && (
                  <div className="mb-8">
                    <h4 className="text-lg font-semibold text-gray-900 mb-4">Available Options</h4>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {Object.entries(getAvailableOptions()).map(([fieldSlug, options]) => {
                        const fieldInfo = getFieldDisplayInfo(fieldSlug);
                        return (
                          <div key={fieldSlug} className="bg-gray-50 p-4 rounded-xl">
                            <div className="font-medium text-gray-900 mb-2">
                              {fieldInfo.name}
                              {fieldInfo.unit && <span className="text-gray-500 ml-1">({fieldInfo.unit})</span>}
                            </div>
                            <div className="flex flex-wrap gap-2">
                              {Array.isArray(options) ? options.map((option, index) => (
                                <span key={index} className="px-3 py-1 bg-white border border-gray-200 rounded-lg text-sm text-gray-700">
                                  {option}
                                </span>
                              )) : (
                                <span className="text-gray-600">{options}</span>
                              )}
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                )}

                {/* Selected Variant Details */}
                {selectedVariant && (
                  <div>
                    <h4 className="text-lg font-semibold text-gray-900 mb-4">Selected Configuration Details</h4>
                    <div className="bg-white border border-gray-200 rounded-xl p-6">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                          <h5 className="font-medium text-gray-900 mb-3">Variant Information</h5>
                          <div className="space-y-2">
                            <div className="flex justify-between">
                              <span className="text-gray-600">SKU:</span>
                              <span className="font-medium">{selectedVariant.sku || 'N/A'}</span>
                            </div>
                            <div className="flex justify-between">
                              <span className="text-gray-600">Stock:</span>
                              <span className="font-medium">{selectedVariant.stock || 0}</span>
                            </div>
                            <div className="flex justify-between">
                              <span className="text-gray-600">Price:</span>
                              <span className="font-medium">₹{selectedVariant.price?.toFixed(2) || 'N/A'}</span>
                            </div>
                            {selectedVariant.mrp && (
                              <div className="flex justify-between">
                                <span className="text-gray-600">MRP:</span>
                                <span className="font-medium">₹{selectedVariant.mrp.toFixed(2)}</span>
                              </div>
                            )}
                          </div>
                        </div>
                        
                        <div>
                          <h5 className="font-medium text-gray-900 mb-3">Field Values</h5>
                          <div className="space-y-2">
                            {selectedVariant.fields && Object.entries(selectedVariant.fields).map(([key, value]) => {
                              const fieldInfo = getFieldDisplayInfo(key);
                              return (
                                <div key={key} className="flex justify-between">
                                  <span className="text-gray-600">{fieldInfo.name}:</span>
                                  <span className="font-medium">{value} {fieldInfo.unit}</span>
                                </div>
                              );
                            })}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            )}

            {activeTab === 'reviews' && (
              <div>
                <h3 className="text-2xl font-bold text-gray-900 mb-6">Customer Reviews</h3>
                <div className="space-y-6">
                  {[
                    { name: 'Sarah M.', rating: 5, date: '2 days ago', comment: 'Excellent quality! The product exceeded my expectations. Highly recommended.' },
                    { name: 'John D.', rating: 5, date: '1 week ago', comment: 'Beautiful design and great value for money. Very satisfied with the purchase.' },
                    { name: 'Emily R.', rating: 4, date: '2 weeks ago', comment: 'Good product, fast delivery. Would buy again from this brand.' }
                  ].map((review, index) => (
                    <div key={index} className="bg-gray-50 p-6 rounded-2xl">
                      <div className="flex items-center justify-between mb-3">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 bg-primary-100 rounded-full flex items-center justify-center">
                            <span className="text-primary-600 font-semibold">{review.name.charAt(0)}</span>
                          </div>
                          <div>
                            <div className="font-semibold text-gray-900">{review.name}</div>
                            <div className="text-sm text-gray-500">{review.date}</div>
                          </div>
                        </div>
                        <div className="flex items-center gap-1">
                          {[...Array(5)].map((_, i) => (
                            <Star 
                              key={i} 
                              className={`w-4 h-4 ${
                                i < review.rating ? 'text-yellow-400 fill-current' : 'text-gray-300'
                              }`} 
                            />
                          ))}
                        </div>
                      </div>
                      <p className="text-gray-600">{review.comment}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {activeTab === 'shipping' && (
              <div>
                <h3 className="text-2xl font-bold text-gray-900 mb-6">Shipping & Returns</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div>
                    <h4 className="text-lg font-semibold text-gray-900 mb-4">Shipping Information</h4>
                    <div className="space-y-3">
                      <div className="flex items-center gap-3">
                        <Truck className="w-5 h-5 text-primary-600" />
                        <span className="text-gray-600">Free shipping on orders above ₹500</span>
                      </div>
                      <div className="flex items-center gap-3">
                        <Package className="w-5 h-5 text-primary-600" />
                        <span className="text-gray-600">Standard delivery: 2-3 business days</span>
                      </div>
                      <div className="flex items-center gap-3">
                        <div className="w-5 h-5 bg-primary-600 rounded-full flex items-center justify-center">
                          <span className="text-white text-xs">✓</span>
                        </div>
                        <span className="text-gray-600">Track your order in real-time</span>
                      </div>
                    </div>
                  </div>
                  
                  <div>
                    <h4 className="text-lg font-semibold text-gray-900 mb-4">Return Policy</h4>
                    <div className="space-y-3">
                      <div className="flex items-center gap-3">
                        <RotateCcw className="w-5 h-5 text-primary-600" />
                        <span className="text-gray-600">30-day return window</span>
                      </div>
                      <div className="flex items-center gap-3">
                        <Shield className="w-5 h-5 text-primary-600" />
                        <span className="text-gray-600">Money-back guarantee</span>
                      </div>
                      <div className="flex items-center gap-3">
                        <div className="w-5 h-5 bg-primary-600 rounded-full flex items-center justify-center">
                          <span className="text-white text-xs">✓</span>
                        </div>
                        <span className="text-gray-600">Easy return process</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}