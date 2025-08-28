'use client';

import { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import { ChevronLeft, Filter, Grid, List, Star, ShoppingCart, Heart, X, ChevronDown, ChevronRight, ChevronUp } from 'lucide-react';
import ProductCard from '@/components/ProductCard';
import api from '@/services/api';

export default function CategoryPage() {
  const params = useParams();
  const { slug } = params;
  
  const [category, setCategory] = useState(null);
  const [products, setProducts] = useState([]);
  const [filterOptions, setFilterOptions] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [viewMode, setViewMode] = useState('grid');
  const [sortBy, setSortBy] = useState('newest');
  const [filters, setFilters] = useState({});
  const [showFilters, setShowFilters] = useState(false);
  const [expandedFilters, setExpandedFilters] = useState({});

  useEffect(() => {
    const fetchCategoryData = async () => {
      try {
        setLoading(true);
        
        // Fetch category details
        const categoryData = await api.getCategoryBySlug(slug);
        setCategory(categoryData);
        
        // Fetch filter options for this category
        const filterData = await api.getCategoryFilterOptions(slug);
        setFilterOptions(filterData);
        
        // Initialize expanded filters based on available filter options
        const initialExpandedState = {};
        if (filterData.brands?.length > 0) initialExpandedState.brands = true;
        if (filterData.ratings?.length > 0) initialExpandedState.ratings = true;
        if (filterData.availability?.length > 0) initialExpandedState.availability = true;
        if (filterData.importantFilters && Object.keys(filterData.importantFilters).length > 0) {
          initialExpandedState.importantFilters = true;
        }
        initialExpandedState.price = true; // Always show price filter
        
        setExpandedFilters(initialExpandedState);
        
        // Fetch products for this category
        const productsData = await api.getCategoryProducts(slug, {
          sort: sortBy,
          ...filters
        });
        setProducts(productsData);
        
      } catch (err) {
        console.error('Error fetching category data:', err);
        setError(err.message);
        
        // Fallback data
        setCategory({
          name: 'Category',
          description: 'Explore our amazing collection',
          image: '/images/category-placeholder.jpg'
        });
        setProducts([]);
        setFilterOptions({
          priceRange: { min: 0, max: 10000 },
          brands: [],
          ratings: [5, 4, 3, 2, 1],
          availability: ['In Stock', 'Out of Stock', 'Pre-order'],
          importantFilters: []
        });
      } finally {
        setLoading(false);
      }
    };

    if (slug) {
      fetchCategoryData();
    }
  }, [slug]);

  useEffect(() => {
    // Refetch products when filters or sort changes
    if (category && !loading) {
      const fetchProducts = async () => {
        try {
          const productsData = await api.getCategoryProducts(slug, {
            sort: sortBy,
            ...filters
          });
          setProducts(productsData);
        } catch (err) {
          console.error('Error fetching products with filters:', err);
        }
      };
      
      fetchProducts();
    }
  }, [sortBy, filters, category, loading, slug]);

  const handleSortChange = (newSort) => {
    setSortBy(newSort);
  };

  const handleFilterChange = (filterType, value) => {
    setFilters(prev => ({
      ...prev,
      [filterType]: value
    }));
  };

  const handlePriceRangeChange = (min, max) => {
    setFilters(prev => ({
      ...prev,
      priceRange: { min, max }
    }));
  };

  const handleBrandToggle = (brand) => {
    setFilters(prev => {
      const currentBrands = prev.brands || [];
      const newBrands = currentBrands.includes(brand)
        ? currentBrands.filter(b => b !== brand)
        : [...currentBrands, brand];
      return { ...prev, brands: newBrands };
    });
  };

  const handleRatingToggle = (rating) => {
    setFilters(prev => {
      const currentRatings = prev.ratings || [];
      const newRatings = currentRatings.includes(rating)
        ? currentRatings.filter(r => r !== rating)
        : [...currentRatings, rating];
      return { ...prev, ratings: newRatings };
    });
  };

  const handleAvailabilityToggle = (availability) => {
    setFilters(prev => {
      const currentAvailability = prev.availability || [];
      const newAvailability = currentAvailability.includes(availability)
        ? currentAvailability.filter(a => a !== availability)
        : [...currentAvailability, availability];
      return { ...prev, availability: newAvailability };
    });
  };

  const handleImportantFilterToggle = (filterKey, value) => {
    setFilters(prev => {
      const currentValues = prev[filterKey] || [];
      const newValues = currentValues.includes(value)
        ? currentValues.filter(v => v !== value)
        : [...currentValues, value];
      return { ...prev, [filterKey]: newValues };
    });
  };

  const clearAllFilters = () => {
    setFilters({});
  };

  const toggleFilterSection = (section) => {
    setExpandedFilters(prev => ({
      ...prev,
      [section]: !prev[section]
    }));
  };

  const getActiveFiltersCount = () => {
    let count = 0;
    Object.values(filters).forEach(value => {
      if (Array.isArray(value)) {
        count += value.length;
      } else if (value && typeof value === 'object') {
        count += Object.values(value).filter(v => v !== null && v !== undefined).length;
      } else if (value) {
        count += 1;
      }
    });
    return count;
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50">
        <div className="container-custom py-8">
          <div className="animate-pulse">
            <div className="bg-gray-200 h-8 w-1/3 rounded mb-4"></div>
            <div className="bg-gray-200 h-4 w-2/3 rounded mb-8"></div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {[...Array(8)].map((_, i) => (
                <div key={i} className="bg-gray-200 h-64 rounded-2xl"></div>
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Something went wrong</h2>
          <p className="text-gray-600 mb-6">{error}</p>
          <Link href="/collections" className="btn-primary">
            Back to Collections
          </Link>
        </div>
      </div>
    );
  }

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
            <span className="text-gray-900 font-medium">{category?.name}</span>
          </nav>
        </div>
      </div>

      {/* Category Header */}
      <div className="bg-white">
        <div className="container-custom py-12">
          <div className="text-center">
            {category?.image && (
              <div className="w-24 h-24 mx-auto mb-6 rounded-full overflow-hidden">
                <Image
                  src={category.image}
                  alt={category.name}
                  width={96}
                  height={96}
                  className="object-cover"
                />
              </div>
            )}
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
              {category?.name}
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              {category?.description || 'Explore our amazing collection of products'}
            </p>
            <p className="text-gray-500 mt-4">
              {products.length} product{products.length !== 1 ? 's' : ''} available
            </p>
          </div>
        </div>
      </div>

      {/* Mobile Filter Toggle */}
      <div className="lg:hidden bg-white border-b">
        <div className="container-custom py-4">
          <button
            onClick={() => setShowFilters(!showFilters)}
            className="flex items-center gap-2 text-gray-600 hover:text-primary-600 w-full justify-center"
          >
            <Filter className="w-4 h-4" />
            Filters {getActiveFiltersCount() > 0 && `(${getActiveFiltersCount()})`}
            {showFilters ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
          </button>
        </div>
      </div>

      {/* Main Content */}
      <div className="container-custom py-8">
        <div className="flex gap-8">
          {/* Left Sidebar Filters */}
          <div className={`lg:block ${showFilters ? 'block' : 'hidden'} lg:w-80 w-full`}>
            <div className="bg-white rounded-xl shadow-sm border p-6 sticky top-4">
              {/* Filter Header */}
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-lg font-semibold text-gray-900">Filters</h3>
                {getActiveFiltersCount() > 0 && (
                  <button
                    onClick={clearAllFilters}
                    className="text-sm text-primary-600 hover:text-primary-700"
                  >
                    Clear All
                  </button>
                )}
              </div>

              {/* Price Range Filter */}
              {filterOptions?.priceRange && (
                <div className="border-b border-gray-200 pb-6 mb-6">
                  <button
                    onClick={() => toggleFilterSection('price')}
                    className="flex items-center justify-between w-full text-left mb-4"
                  >
                    <span className="font-medium text-gray-900">Price Range</span>
                    {expandedFilters.price ? <ChevronDown className="w-4 h-4" /> : <ChevronRight className="w-4 h-4" />}
                  </button>
                  
                  {expandedFilters.price && (
                    <div className="space-y-3">
                      <div className="flex gap-2">
                        <input
                          type="number"
                          placeholder="Min"
                          min={filterOptions.priceRange.min}
                          max={filterOptions.priceRange.max}
                          className="flex-1 border border-gray-300 rounded-lg px-3 py-2 text-sm"
                          onChange={(e) => handlePriceRangeChange(e.target.value, filters.priceRange?.max)}
                        />
                        <input
                          type="number"
                          placeholder="Max"
                          min={filterOptions.priceRange.min}
                          max={filterOptions.priceRange.max}
                          className="flex-1 border border-gray-300 rounded-lg px-3 py-2 text-sm"
                          onChange={(e) => handlePriceRangeChange(filters.priceRange?.min, e.target.value)}
                        />
                      </div>
                      <div className="text-xs text-gray-500 text-center">
                        Range: ₹{filterOptions.priceRange.min} - ₹{filterOptions.priceRange.max}
                      </div>
                    </div>
                  )}
                </div>
              )}

              {/* Brand Filter */}
              {filterOptions?.brands && filterOptions.brands.length > 0 && (
                <div className="border-b border-gray-200 pb-6 mb-6">
                  <button
                    onClick={() => toggleFilterSection('brands')}
                    className="flex items-center justify-between w-full text-left mb-4"
                  >
                    <span className="font-medium text-gray-900">Brand</span>
                    {expandedFilters.brands ? <ChevronDown className="w-4 h-4" /> : <ChevronRight className="w-4 h-4" />}
                  </button>
                  
                  {expandedFilters.brands && (
                    <div className="space-y-2">
                      {filterOptions.brands.map((brand) => (
                        <label key={brand} className="flex items-center">
                          <input
                            type="checkbox"
                            checked={filters.brands?.includes(brand) || false}
                            onChange={() => handleBrandToggle(brand)}
                            className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300 rounded"
                          />
                          <span className="ml-2 text-sm text-gray-700">{brand}</span>
                        </label>
                      ))}
                    </div>
                  )}
                </div>
              )}

              {/* Rating Filter */}
              {filterOptions?.ratings && filterOptions.ratings.length > 0 && (
                <div className="border-b border-gray-200 pb-6 mb-6">
                  <button
                    onClick={() => toggleFilterSection('ratings')}
                    className="flex items-center justify-between w-full text-left mb-4"
                  >
                    <span className="font-medium text-gray-900">Rating</span>
                    {expandedFilters.ratings ? <ChevronDown className="w-4 h-4" /> : <ChevronRight className="w-4 h-4" />}
                  </button>
                  
                  {expandedFilters.ratings && (
                    <div className="space-y-2">
                      {filterOptions.ratings.map((rating) => (
                        <label key={rating} className="flex items-center">
                          <input
                            type="checkbox"
                            checked={filters.ratings?.includes(rating) || false}
                            onChange={() => handleRatingToggle(rating)}
                            className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300 rounded"
                          />
                          <span className="ml-2 text-sm text-gray-700">
                            {rating}★ & above
                          </span>
                        </label>
                      ))}
                    </div>
                  )}
                </div>
              )}

              {/* Availability Filter */}
              {filterOptions?.availability && filterOptions.availability.length > 0 && (
                <div className="border-b border-gray-200 pb-6 mb-6">
                  <button
                    onClick={() => toggleFilterSection('availability')}
                    className="flex items-center justify-between w-full text-left mb-4"
                  >
                    <span className="font-medium text-gray-900">Availability</span>
                    {expandedFilters.availability ? <ChevronDown className="w-4 h-4" /> : <ChevronRight className="w-4 h-4" />}
                  </button>
                  
                  {expandedFilters.availability && (
                    <div className="space-y-2">
                      {filterOptions.availability.map((availability) => (
                        <label key={availability} className="flex items-center">
                          <input
                            type="checkbox"
                            checked={filters.availability?.includes(availability) || false}
                            onChange={() => handleAvailabilityToggle(availability)}
                            className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300 rounded"
                          />
                          <span className="ml-2 text-sm text-gray-700">{availability}</span>
                        </label>
                      ))}
                    </div>
                  )}
                </div>
              )}

              {/* Important Filters (Material, Style, Color, etc.) */}
              {filterOptions?.importantFilters && filterOptions.importantFilters.length > 0 && (
                <div className="pb-6">
                  <button
                    onClick={() => toggleFilterSection('importantFilters')}
                    className="flex items-center justify-between w-full text-left mb-4"
                  >
                    <span className="font-medium text-gray-900">Product Features</span>
                    {expandedFilters.importantFilters ? <ChevronDown className="w-4 h-4" /> : <ChevronRight className="w-4 h-4" />}
                  </button>
                  
                  {expandedFilters.importantFilters && (
                    <div className="space-y-4">
                      {filterOptions.importantFilters.map((filter) => (
                        <div key={filter.key} className="border-l-2 border-gray-200 pl-3">
                          <h4 className="text-sm font-medium text-gray-800 mb-2">
                            {filter.name}
                            {filter.unit && <span className="text-gray-500 ml-1">({filter.unit})</span>}
                          </h4>
                          <div className="space-y-2">
                            {filter.options.map((option) => (
                              <label key={option} className="flex items-center">
                                <input
                                  type="checkbox"
                                  checked={filters[filter.key]?.includes(option) || false}
                                  onChange={() => handleImportantFilterToggle(filter.key, option)}
                                  className="h-3 w-3 text-primary-600 focus:ring-primary-500 border-gray-300 rounded"
                                />
                                <span className="ml-2 text-xs text-gray-600">{option}</span>
                              </label>
                            ))}
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>

          {/* Right Content */}
          <div className="flex-1">
            {/* Sort and View Controls */}
            <div className="bg-white rounded-xl shadow-sm border p-4 mb-6">
              <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
                {/* Results Count */}
                <div className="text-sm text-gray-600">
                  Showing {products.length} product{products.length !== 1 ? 's' : ''}
                  {getActiveFiltersCount() > 0 && ` (${getActiveFiltersCount()} filter${getActiveFiltersCount() !== 1 ? 's' : ''} applied)`}
                </div>

                {/* Sort and View */}
                <div className="flex items-center gap-4">
                  <select 
                    className="border border-gray-300 rounded-lg px-3 py-2 text-sm"
                    value={sortBy}
                    onChange={(e) => handleSortChange(e.target.value)}
                  >
                    <option value="newest">Newest First</option>
                    <option value="price-low">Price: Low to High</option>
                    <option value="price-high">Price: High to Low</option>
                    <option value="popular">Most Popular</option>
                    <option value="rating">Highest Rated</option>
                  </select>

                  <div className="flex border border-gray-300 rounded-lg overflow-hidden">
                    <button
                      className={`p-2 ${viewMode === 'grid' ? 'bg-primary-600 text-white' : 'bg-white text-gray-600'}`}
                      onClick={() => setViewMode('grid')}
                    >
                      <Grid className="w-4 h-4" />
                    </button>
                    <button
                      className={`p-2 ${viewMode === 'list' ? 'bg-primary-600 text-white' : 'bg-white text-gray-600'}`}
                      onClick={() => setViewMode('list')}
                    >
                      <List className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>
            </div>

            {/* Products Grid */}
            {products.length === 0 ? (
              <div className="bg-white rounded-xl shadow-sm border p-16 text-center">
                <div className="w-24 h-24 bg-gray-200 rounded-full mx-auto mb-6 flex items-center justify-center">
                  <ShoppingCart className="w-12 h-12 text-gray-400" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">No products found</h3>
                <p className="text-gray-600 mb-6">Try adjusting your filters or browse other categories</p>
                <Link href="/collections" className="btn-primary">
                  Browse All Categories
                </Link>
              </div>
            ) : (
              <div className={`grid gap-6 ${
                viewMode === 'grid' 
                  ? 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3' 
                  : 'grid-cols-1'
              }`}>
                {products.map((product) => (
                  <ProductCard key={product._id} product={product} />
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
