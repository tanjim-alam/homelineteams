'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useCart } from '@/contexts/CartContext';
import { 
  ArrowLeft, CreditCard, Lock, Truck, Shield, 
  MapPin, Phone, Mail, User, Building, 
  CheckCircle, AlertCircle 
} from 'lucide-react';

export default function CheckoutPage() {
  const { cartItems, getCartTotal, clearCart } = useCart();
  const [activeStep, setActiveStep] = useState(1);
  const [formData, setFormData] = useState({
    // Shipping Information
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    address: '',
    city: '',
    state: '',
    pincode: '',
    country: 'India',
    
    // Payment Information
    cardNumber: '',
    cardName: '',
    expiry: '',
    cvv: '',
    
    // Additional Options
    saveInfo: true,
    newsletter: false
  });

  const subtotal = getCartTotal();
  const shipping = 0; // Free shipping
  const tax = subtotal * 0.18; // 18% GST
  const total = subtotal + shipping + tax;

  const handleInputChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle checkout submission
    console.log('Checkout submitted:', formData);
    clearCart(); // Clear cart after successful order
    setActiveStep(3);
  };

  // Redirect to cart if empty
  if (cartItems.length === 0) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">Your cart is empty</h1>
          <p className="text-gray-600 mb-6">Please add some products to your cart before checkout.</p>
          <Link href="/cart" className="btn-primary px-6 py-3">
            Go to Cart
          </Link>
        </div>
      </div>
    );
  }

  const renderShippingForm = () => (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            First Name *
          </label>
          <input
            type="text"
            value={formData.firstName}
            onChange={(e) => handleInputChange('firstName', e.target.value)}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
            required
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Last Name *
          </label>
          <input
            type="text"
            value={formData.lastName}
            onChange={(e) => handleInputChange('lastName', e.target.value)}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
            required
          />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Email Address *
          </label>
          <input
            type="email"
            value={formData.email}
            onChange={(e) => handleInputChange('email', e.target.value)}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
            required
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Phone Number *
          </label>
          <input
            type="tel"
            value={formData.phone}
            onChange={(e) => handleInputChange('phone', e.target.value)}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
            required
          />
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Street Address *
        </label>
        <input
          type="text"
          value={formData.address}
          onChange={(e) => handleInputChange('address', e.target.value)}
          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
          placeholder="House/Flat number, Street, Area"
          required
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            City *
          </label>
          <input
            type="text"
            value={formData.city}
            onChange={(e) => handleInputChange('city', e.target.value)}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
            required
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            State *
          </label>
          <input
            type="text"
            value={formData.state}
            onChange={(e) => handleInputChange('state', e.target.value)}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
            required
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            PIN Code *
          </label>
          <input
            type="text"
            value={formData.pincode}
            onChange={(e) => handleInputChange('pincode', e.target.value)}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
            required
          />
        </div>
      </div>

      <div className="flex items-center gap-3">
        <input
          type="checkbox"
          id="saveInfo"
          checked={formData.saveInfo}
          onChange={(e) => handleInputChange('saveInfo', e.target.checked)}
          className="w-4 h-4 text-primary-600 border-gray-300 rounded focus:ring-primary-500"
        />
        <label htmlFor="saveInfo" className="text-sm text-gray-700">
          Save this information for next time
        </label>
      </div>
    </div>
  );

  const renderPaymentForm = () => (
    <div className="space-y-6">
      <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
        <div className="flex items-center gap-3">
          <AlertCircle className="w-5 h-5 text-blue-600" />
          <div>
            <h4 className="font-medium text-blue-900">Secure Payment</h4>
            <p className="text-sm text-blue-700">
              Your payment information is encrypted and secure. We never store your card details.
            </p>
          </div>
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Card Number *
        </label>
        <input
          type="text"
          value={formData.cardNumber}
          onChange={(e) => handleInputChange('cardNumber', e.target.value)}
          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
          placeholder="1234 5678 9012 3456"
          required
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Name on Card *
        </label>
        <input
          type="text"
          value={formData.cardName}
          onChange={(e) => handleInputChange('cardName', e.target.value)}
          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
          required
        />
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Expiry Date *
          </label>
          <input
            type="text"
            value={formData.expiry}
            onChange={(e) => handleInputChange('expiry', e.target.value)}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
            placeholder="MM/YY"
            required
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            CVV *
          </label>
          <input
            type="text"
            value={formData.cvv}
            onChange={(e) => handleInputChange('cvv', e.target.value)}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
            placeholder="123"
            required
          />
        </div>
      </div>

      <div className="flex items-center gap-3">
        <input
          type="checkbox"
          id="newsletter"
          checked={formData.newsletter}
          onChange={(e) => handleInputChange('newsletter', e.target.checked)}
          className="w-4 h-4 text-primary-600 border-gray-300 rounded focus:ring-primary-500"
        />
        <label htmlFor="newsletter" className="text-sm text-gray-700">
          Subscribe to our newsletter for updates and offers
        </label>
      </div>
    </div>
  );

  const renderOrderConfirmation = () => (
    <div className="text-center py-12">
      <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
        <CheckCircle className="w-10 h-10 text-green-600" />
      </div>
      <h2 className="text-3xl font-bold text-gray-900 mb-4">Order Confirmed!</h2>
      <p className="text-gray-600 mb-8 max-w-md mx-auto">
        Thank you for your purchase! We've sent a confirmation email with your order details. 
        You'll receive tracking information once your order ships.
      </p>
      <div className="flex gap-4 justify-center">
        <Link href="/" className="btn-primary px-8 py-3">
          Continue Shopping
        </Link>
        <Link href="/orders" className="btn-secondary px-8 py-3">
          View Orders
        </Link>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b">
        <div className="container-custom py-4">
          <nav className="flex items-center space-x-2 text-sm text-gray-500">
            <Link href="/" className="hover:text-primary-600">Home</Link>
            <ArrowLeft className="w-4 h-4" />
            <Link href="/cart" className="hover:text-primary-600">Cart</Link>
            <ArrowLeft className="w-4 h-4" />
            <span className="text-gray-900 font-medium">Checkout</span>
          </nav>
        </div>
      </div>

      <div className="container-custom py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          {/* Checkout Form */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100">
              {/* Progress Steps */}
              <div className="p-6 border-b border-gray-100">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium ${
                      activeStep >= 1 ? 'bg-primary-600 text-white' : 'bg-gray-200 text-gray-600'
                    }`}>
                      1
                    </div>
                    <span className={`font-medium ${activeStep >= 1 ? 'text-primary-600' : 'text-gray-500'}`}>
                      Shipping
                    </span>
                  </div>
                  
                  <div className="w-16 h-0.5 bg-gray-200"></div>
                  
                  <div className="flex items-center gap-3">
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium ${
                      activeStep >= 2 ? 'bg-primary-600 text-white' : 'bg-gray-200 text-gray-600'
                    }`}>
                      2
                    </div>
                    <span className={`font-medium ${activeStep >= 2 ? 'text-primary-600' : 'text-gray-500'}`}>
                      Payment
                    </span>
                  </div>
                  
                  <div className="w-16 h-0.5 bg-gray-200"></div>
                  
                  <div className="flex items-center gap-3">
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium ${
                      activeStep >= 3 ? 'bg-primary-600 text-white' : 'bg-gray-200 text-gray-600'
                    }`}>
                      3
                    </div>
                    <span className={`font-medium ${activeStep >= 3 ? 'text-primary-600' : 'text-gray-500'}`}>
                      Confirmation
                    </span>
                  </div>
                </div>
              </div>

              {/* Form Content */}
              <div className="p-6">
                {activeStep === 1 && (
                  <div>
                    <h2 className="text-2xl font-bold text-gray-900 mb-6">Shipping Information</h2>
                    {renderShippingForm()}
                    <div className="mt-8">
                      <button
                        onClick={() => setActiveStep(2)}
                        className="w-full btn-primary py-4 text-lg font-semibold"
                      >
                        Continue to Payment
                      </button>
                    </div>
                  </div>
                )}

                {activeStep === 2 && (
                  <div>
                    <h2 className="text-2xl font-bold text-gray-900 mb-6">Payment Information</h2>
                    {renderPaymentForm()}
                    <div className="mt-8 flex gap-4">
                      <button
                        onClick={() => setActiveStep(1)}
                        className="flex-1 btn-secondary py-4 text-lg font-semibold"
                      >
                        Back to Shipping
                      </button>
                      <button
                        onClick={handleSubmit}
                        className="flex-1 btn-primary py-4 text-lg font-semibold flex items-center justify-center gap-2"
                      >
                        <Lock className="w-5 h-5" />
                        Place Order
                      </button>
                    </div>
                  </div>
                )}

                {activeStep === 3 && (
                  <div>
                    {renderOrderConfirmation()}
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 sticky top-8">
              <h2 className="text-xl font-bold text-gray-900 mb-6">Order Summary</h2>
              
              {/* Cart Items */}
              <div className="space-y-4 mb-6">
                {cartItems.map((item) => (
                  <div key={item.id} className="flex gap-3">
                    <div className="relative w-16 h-16 rounded-lg overflow-hidden bg-gray-100 flex-shrink-0">
                      <Image
                        src={item.image}
                        alt={item.name}
                        fill
                        className="object-cover"
                      />
                    </div>
                    <div className="flex-1 min-w-0">
                      <h4 className="font-medium text-gray-900 text-sm line-clamp-2">{item.name}</h4>
                      <p className="text-xs text-gray-500 mt-1">
                        {Object.entries(item.variant).map(([key, value]) => `${key}: ${value}`).join(', ')}
                      </p>
                      <div className="flex items-center justify-between mt-2">
                        <span className="text-sm text-gray-600">Qty: {item.quantity}</span>
                        <span className="font-medium text-gray-900">₹{(item.price * item.quantity).toFixed(2)}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Price Breakdown */}
              <div className="space-y-3 border-t border-gray-200 pt-4">
                <div className="flex justify-between text-gray-600">
                  <span>Subtotal</span>
                  <span>₹{subtotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-gray-600">
                  <span>Shipping</span>
                  <span className="text-green-600">Free</span>
                </div>
                <div className="flex justify-between text-gray-600">
                  <span>Tax (GST 18%)</span>
                  <span>₹{tax.toFixed(2)}</span>
                </div>
                <div className="border-t border-gray-200 pt-3">
                  <div className="flex justify-between text-xl font-bold text-gray-900">
                    <span>Total</span>
                    <span>₹{total.toFixed(2)}</span>
                  </div>
                  <p className="text-sm text-gray-500 mt-1">Including all taxes</p>
                </div>
              </div>

              {/* Trust Indicators */}
              <div className="mt-6 space-y-3 pt-6 border-t border-gray-200">
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
