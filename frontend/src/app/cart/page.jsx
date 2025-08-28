'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useCart } from '@/contexts/CartContext';
import { 
  Trash2, Minus, Plus, ShoppingBag, ArrowLeft, 
  Truck, Shield, CreditCard, Lock 
} from 'lucide-react';

export default function CartPage() {
  const { 
    cartItems, 
    removeFromCart, 
    updateCartItemQuantity, 
    getCartTotal 
  } = useCart();

  const getTotalDiscount = () => {
    return cartItems.reduce((sum, item) => sum + ((item.mrp - item.price) * item.quantity), 0);
  };

  const getTotal = () => {
    return getCartTotal();
  };

  if (cartItems.length === 0) {
    return (
      <div className="min-h-screen bg-gray-50">
        {/* Header */}
        <div className="bg-white border-b">
          <div className="container-custom py-4">
            <nav className="flex items-center space-x-2 text-sm text-gray-500">
              <Link href="/" className="hover:text-primary-600">Home</Link>
              <ArrowLeft className="w-4 h-4" />
              <span className="text-gray-900 font-medium">Cart</span>
            </nav>
          </div>
        </div>

        {/* Empty Cart */}
        <div className="container-custom py-20">
          <div className="text-center">
            <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <ShoppingBag className="w-12 h-12 text-gray-400" />
            </div>
            <h1 className="text-3xl font-bold text-gray-900 mb-4">Your cart is empty</h1>
            <p className="text-gray-600 mb-8 max-w-md mx-auto">
              Looks like you haven't added any products to your cart yet. Start shopping to fill it up!
            </p>
            <div className="flex gap-4 justify-center">
              <Link 
                href="/collections" 
                className="btn-primary px-8 py-3 text-lg"
              >
                Browse Collections
              </Link>
              <Link 
                href="/" 
                className="btn-secondary px-8 py-3 text-lg"
              >
                Continue Shopping
              </Link>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b">
        <div className="container-custom py-4">
          <nav className="flex items-center space-x-2 text-sm text-gray-500">
            <Link href="/" className="hover:text-primary-600">Home</Link>
            <ArrowLeft className="w-4 h-4" />
            <span className="text-gray-900 font-medium">Cart</span>
          </nav>
        </div>
      </div>

      <div className="container-custom py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          {/* Cart Items */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100">
              <div className="p-6 border-b border-gray-100">
                <h1 className="text-2xl font-bold text-gray-900">Shopping Cart</h1>
                <p className="text-gray-600 mt-1">{cartItems.length} item{cartItems.length !== 1 ? 's' : ''}</p>
              </div>

              <div className="divide-y divide-gray-100">
                {cartItems.map((item) => (
                  <div key={item.id} className="p-6">
                    <div className="flex gap-4">
                      {/* Product Image */}
                      <div className="relative w-24 h-24 rounded-xl overflow-hidden bg-gray-100 flex-shrink-0">
                        <Image
                          src={item.image}
                          alt={item.name}
                          fill
                          className="object-cover"
                        />
                      </div>

                      {/* Product Details */}
                      <div className="flex-1 min-w-0">
                        <div className="flex justify-between items-start">
                          <div className="flex-1">
                            <h3 className="font-semibold text-gray-900 mb-2 line-clamp-2">
                              {item.name}
                            </h3>
                            
                            {/* Variant Details */}
                            <div className="space-y-1 mb-3">
                              {Object.entries(item.variant).map(([key, value]) => (
                                <div key={key} className="flex items-center gap-2 text-sm">
                                  <span className="text-gray-500 capitalize">{key}:</span>
                                  <span className="text-gray-700 font-medium">{value}</span>
                                </div>
                              ))}
                            </div>

                            {/* Price */}
                            <div className="flex items-center gap-3">
                              <span className="text-xl font-bold text-gray-900">₹{item.price.toFixed(2)}</span>
                              {item.mrp > item.price && (
                                <span className="text-lg text-gray-500 line-through">₹{item.mrp.toFixed(2)}</span>
                              )}
                              {item.mrp > item.price && (
                                <span className="bg-green-100 text-green-600 px-2 py-1 rounded-full text-sm font-bold">
                                  -{Math.round(((item.mrp - item.price) / item.mrp) * 100)}%
                                </span>
                              )}
                            </div>
                          </div>

                          {/* Remove Button */}
                          <button
                            onClick={() => removeFromCart(item.id)}
                            className="text-gray-400 hover:text-red-500 transition-colors p-2"
                            title="Remove item"
                          >
                            <Trash2 className="w-5 h-5" />
                          </button>
                        </div>

                        {/* Quantity Controls */}
                        <div className="flex items-center justify-between mt-4">
                          <div className="flex items-center border border-gray-200 rounded-lg overflow-hidden">
                            <button
                              onClick={() => updateCartItemQuantity(item.id, item.quantity - 1)}
                              className="w-10 h-10 flex items-center justify-center hover:bg-gray-50 transition-colors"
                            >
                              <Minus className="w-4 h-4 text-gray-600" />
                            </button>
                            <span className="w-12 text-center font-medium text-gray-900">
                              {item.quantity}
                            </span>
                            <button
                              onClick={() => updateCartItemQuantity(item.id, item.quantity + 1)}
                              className="w-10 h-10 flex items-center justify-center hover:bg-gray-50 transition-colors"
                            >
                              <Plus className="w-4 h-4 text-gray-600" />
                            </button>
                          </div>
                          
                          <div className="text-right">
                            <div className="text-lg font-bold text-gray-900">
                              ₹{(item.price * item.quantity).toFixed(2)}
                            </div>
                            {item.mrp > item.price && (
                              <div className="text-sm text-gray-500">
                                You save ₹{((item.mrp - item.price) * item.quantity).toFixed(2)}
                              </div>
                            )}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 sticky top-8">
              <h2 className="text-xl font-bold text-gray-900 mb-6">Order Summary</h2>
              
              {/* Price Breakdown */}
              <div className="space-y-3 mb-6">
                <div className="flex justify-between text-gray-600">
                  <span>Subtotal ({cartItems.length} item{cartItems.length !== 1 ? 's' : ''})</span>
                  <span>₹{getCartTotal().toFixed(2)}</span>
                </div>
                
                {getTotalDiscount() > 0 && (
                  <div className="flex justify-between text-green-600">
                    <span>Total Discount</span>
                    <span>-₹{getTotalDiscount().toFixed(2)}</span>
                  </div>
                )}
                
                <div className="flex justify-between text-gray-600">
                  <span>Shipping</span>
                  <span className="text-green-600">Free</span>
                </div>
                
                <div className="border-t border-gray-200 pt-3">
                  <div className="flex justify-between text-xl font-bold text-gray-900">
                    <span>Total</span>
                    <span>₹{getTotal().toFixed(2)}</span>
                  </div>
                  <p className="text-sm text-gray-500 mt-1">Including all taxes</p>
                </div>
              </div>

              {/* Checkout Button */}
              <Link
                href="/checkout"
                className="w-full btn-primary py-4 text-lg font-semibold flex items-center justify-center gap-2"
              >
                <CreditCard className="w-5 h-5" />
                Proceed to Checkout
              </Link>

              {/* Trust Indicators */}
              <div className="mt-6 space-y-3">
                <div className="flex items-center gap-3 text-sm text-gray-600">
                  <Truck className="w-4 h-4 text-green-500" />
                  <span>Free shipping on orders above ₹500</span>
                </div>
                <div className="flex items-center gap-3 text-sm text-gray-600">
                  <Shield className="w-4 h-4 text-blue-500" />
                  <span>30-day return policy</span>
                </div>
                <div className="flex items-center gap-3 text-sm text-gray-600">
                  <Lock className="w-4 h-4 text-green-500" />
                  <span>Secure checkout</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
