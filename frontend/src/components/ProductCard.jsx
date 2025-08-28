'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Heart, ShoppingCart, Eye } from 'lucide-react';
import { useCart } from '@/contexts/CartContext';

export default function ProductCard({ product }) {
  const { addToCart, isInWishlist, addToWishlist, removeFromWishlist } = useCart();
  const [isAddingToCart, setIsAddingToCart] = useState(false);

  const getProductPrice = () => {
    if (product.hasVariants && product.variants && product.variants.length > 0) {
      const lowestPriceVariant = product.variants.reduce((lowest, variant) => {
        if (!variant.price || isNaN(variant.price)) return lowest;
        if (!lowest.price || isNaN(lowest.price)) return variant;
        return variant.price < lowest.price ? variant : lowest;
      });
      return lowestPriceVariant?.price || 0;
    }
    return product?.basePrice || 0;
  };

  const getProductMRP = () => {
    if (product.hasVariants && product.variants && product.variants.length > 0) {
      const highestMRPVariant = product.variants.reduce((highest, variant) => {
        if (!variant.mrp || isNaN(variant.mrp)) return highest;
        if (!highest.mrp || isNaN(highest.mrp)) return variant;
        return variant.mrp > highest.mrp ? variant : highest;
      });
      return highestMRPVariant?.mrp || 0;
    }
    return product?.basePrice || 0;
  };

  const getDiscountPercentage = () => {
    const price = getProductPrice();
    const mrp = getProductMRP();
    if (mrp > price && price > 0 && mrp > 0) {
      return Math.round(((mrp - price) / mrp) * 100);
    }
    return 0;
  };

  const getStockStatus = () => {
    if (product.hasVariants && product.variants && product.variants.length > 0) {
      const totalStock = product.variants.reduce((sum, variant) => {
        const stock = variant.stock || 0;
        return sum + (isNaN(stock) ? 0 : stock);
      }, 0);
      return totalStock > 0 ? 'In Stock' : 'Out of Stock';
    }
    return 'In Stock'; // Default for products without variants or if stock is not specified
  };

  const handleAddToCart = () => {
    setIsAddingToCart(true);
    
    // Get the first available variant or use base product
    let selectedVariant = null;
    if (product.hasVariants && product.variants && product.variants.length > 0) {
      selectedVariant = product.variants[0];
    }
    
    addToCart(product, selectedVariant, 1);
    
    // Reset loading state after a short delay
    setTimeout(() => {
      setIsAddingToCart(false);
    }, 1000);
  };

  const handleWishlistToggle = () => {
    if (isInWishlist(product._id)) {
      removeFromWishlist(product._id);
    } else {
      addToWishlist(product);
    }
  };

  const price = getProductPrice();
  const mrp = getProductMRP();
  const stockStatus = getStockStatus();
  const isOutOfStock = stockStatus === 'Out of Stock';

  // Ensure we have valid numbers for display
  const displayPrice = typeof price === 'number' && !isNaN(price) ? price : 0;
  const displayMRP = typeof mrp === 'number' && !isNaN(mrp) ? mrp : 0;

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden hover:shadow-lg transition-all duration-300 group">
      {/* Product Image */}
      <div className="relative aspect-square overflow-hidden bg-gray-100">
        <Image
          src={product.images?.[0] || product.image || 'https://via.placeholder.com/400x400?text=Product+Image'}
          alt={product.name}
          fill
          className="object-cover group-hover:scale-105 transition-transform duration-300"
        />
        
        {/* Discount Badge */}
        {getDiscountPercentage() > 0 && (
          <div className="absolute top-3 left-3 bg-red-500 text-white text-sm font-bold px-2 py-1 rounded-full">
            -{getDiscountPercentage()}%
          </div>
        )}
        
        {/* Stock Status */}
        <div className="absolute top-3 right-3">
          <span className={`px-2 py-1 rounded-full text-xs font-medium ${
            isOutOfStock 
              ? 'bg-red-100 text-red-600' 
              : 'bg-green-100 text-green-600'
          }`}>
            {stockStatus}
          </span>
        </div>

        {/* Quick Actions Overlay */}
        <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-20 transition-all duration-300 flex items-center justify-center">
          <div className="flex gap-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            <button
              onClick={handleWishlistToggle}
              className={`w-10 h-10 rounded-full flex items-center justify-center transition-colors ${
                isInWishlist(product._id)
                  ? 'bg-red-500 text-white hover:bg-red-600'
                  : 'bg-white text-gray-700 hover:bg-gray-100'
              }`}
              title={isInWishlist(product._id) ? 'Remove from wishlist' : 'Add to wishlist'}
            >
              <Heart className={`w-5 h-5 ${isInWishlist(product._id) ? 'fill-current' : ''}`} />
            </button>
            
            <Link
              href={`/products/${product.slug}`}
              className="w-10 h-10 rounded-full bg-white text-gray-700 hover:bg-gray-100 flex items-center justify-center transition-colors"
              title="Quick view"
            >
              <Eye className="w-5 h-5" />
            </Link>
          </div>
        </div>
      </div>

      {/* Product Info */}
      <div className="p-4">
        {/* Category */}
        {product.category && (
          <p className="text-sm text-gray-500 mb-2">{product.category.name}</p>
        )}
        
        {/* Product Name */}
        <Link href={`/products/${product.slug}`}>
          <h3 className="font-semibold text-gray-900 mb-2 line-clamp-2 hover:text-primary-600 transition-colors">
            {product.name}
          </h3>
        </Link>
        
        {/* Rating */}
        <div className="flex items-center gap-2 mb-4">
          <div className="flex items-center">
            {[...Array(5)].map((_, i) => (
              <svg
                key={i}
                className={`w-4 h-4 ${
                  i < (product.rating || 4) ? 'text-yellow-400 fill-current' : 'text-gray-300'
                }`}
                viewBox="0 0 20 20"
              >
                <path d="M10 15l-5.898 3.09 1.127-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.74 4.635 1.127 6.545z" />
              </svg>
            ))}
          </div>
          <span className="text-sm text-gray-600">({product.reviewCount || 12})</span>
        </div>
        
        {/* Price */}
        <div className="flex items-center gap-2 mb-4">
          <span className="text-xl font-bold text-gray-900">
            ₹{displayPrice.toFixed(2)}
          </span>
          {displayMRP > displayPrice && displayPrice > 0 && displayMRP > 0 && (
            <span className="text-lg text-gray-500 line-through">
              ₹{displayMRP.toFixed(2)}
            </span>
          )}
        </div>

        {/* Add to Cart Button */}
        <button
          onClick={handleAddToCart}
          disabled={isOutOfStock || isAddingToCart}
          className={`w-full py-3 px-4 rounded-lg font-medium transition-colors flex items-center justify-center gap-2 ${
            isOutOfStock
              ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
              : isAddingToCart
              ? 'bg-primary-400 text-white cursor-wait'
              : 'bg-primary-600 text-white hover:bg-primary-700'
          }`}
        >
          {isAddingToCart ? (
            <>
              <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
              Adding...
            </>
          ) : (
            <>
              <ShoppingCart className="w-4 h-4" />
              {isOutOfStock ? 'Out of Stock' : 'Add to Cart'}
            </>
          )}
        </button>
      </div>
    </div>
  );
}
