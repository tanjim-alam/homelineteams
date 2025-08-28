'use client';

import { useState, useEffect } from 'react';
import { Plus, Edit, Trash2, Package, Image as ImageIcon } from 'lucide-react';
import apiClient from '../api/client';

export default function ProductsPage() {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [editingProduct, setEditingProduct] = useState(null);
  const [createLoading, setCreateLoading] = useState(false);
  const [updateLoading, setUpdateLoading] = useState(false);
  const [error, setError] = useState('');

  const [form, setForm] = useState({
    categoryId: '',
    name: '',
    slug: '',
    basePrice: '',
    description: '',
    mainImages: [],
    hasVariants: false,
    variants: [],
    variantOptions: {}, // New: Store available options for each variant field
    dynamicFields: {},
    metaData: {
      title: '',
      description: '',
      keywords: '',
      ogImage: null
    }
  });

  const [selectedCategory, setSelectedCategory] = useState(null);

  const [variantForm, setVariantForm] = useState({
    fields: {},
    price: '',
    mrp: '',
    discount: '',
    stock: 0,
    images: []
  });

  const [variantOptionsForm, setVariantOptionsForm] = useState({
    fieldSlug: '',
    options: ['']
  });

  useEffect(() => {
    fetchProducts();
    fetchCategories();
  }, []);

  const fetchProducts = async () => {
    try {
      setLoading(true);
      const response = await apiClient.get('/api/products');
      let data = response;
      if (response && response.data) {
        data = response.data;
      }
      if (Array.isArray(data)) {
        setProducts(data);
      } else if (data && typeof data === 'object') {
        if (Array.isArray(data.products)) {
          setProducts(data.products);
        } else if (Array.isArray(data.items)) {
          setProducts(data.items);
        } else {
          setProducts([]);
        }
      } else {
        setProducts([]);
      }
    } catch (err) {
      console.error('Error fetching products:', err);
      setError('Failed to fetch products. Please check if the backend server is running.');
      setProducts([]);
    } finally {
      setLoading(false);
    }
  };

  const fetchCategories = async () => {
    try {
      const response = await apiClient.get('/api/categories');
      let data = response;
      if (response && response.data) {
        data = response.data;
      }
      if (Array.isArray(data)) {
        setCategories(data);
      } else if (data && typeof data === 'object') {
        if (Array.isArray(data.categories)) {
          setCategories(data.categories);
        } else if (Array.isArray(data.items)) {
          setCategories(data.items);
        } else {
          setCategories([]);
        }
      } else {
        setCategories([]);
      }
    } catch (err) {
      console.error('Error fetching categories:', err);
      setCategories([]);
    }
  };

  const fetchCategoryDetails = async (categoryId) => {
    try {
      const response = await apiClient.get(`/api/categories/id/${categoryId}`);
      let data = response;
      if (response && response.data) {
        data = response.data;
      }
      setSelectedCategory(data);
    } catch (err) {
      console.error('Error fetching category details:', err);
      setSelectedCategory(null);
    }
  };

  const handleCategoryChange = (categoryId) => {
    setForm({ ...form, categoryId, dynamicFields: {} });
    if (categoryId) {
      fetchCategoryDetails(categoryId);
    } else {
      setSelectedCategory(null);
    }
  };

  const updateDynamicField = (fieldSlug, value) => {
    setForm(prev => ({
      ...prev,
      dynamicFields: {
        ...prev.dynamicFields,
        [fieldSlug]: value
      }
    }));
  };

  const updateVariantField = (fieldSlug, value) => {
    setVariantForm(prev => ({
      ...prev,
      fields: {
        ...prev.fields,
        [fieldSlug]: value
      }
    }));
  };

  const updateVariantOptions = (fieldSlug, options) => {
    setForm(prev => ({
      ...prev,
      variantOptions: {
        ...prev.variantOptions,
        [fieldSlug]: options
      }
    }));
  };

  const addVariantOption = () => {
    setVariantOptionsForm(prev => ({
      ...prev,
      options: [...prev.options, '']
    }));
  };

  const removeVariantOption = (index) => {
    const newOptions = variantOptionsForm.options.filter((_, i) => i !== index);
    setVariantOptionsForm(prev => ({
      ...prev,
      options: newOptions
    }));
  };

  const updateVariantOption = (index, value) => {
    const newOptions = [...variantOptionsForm.options];
    newOptions[index] = value;
    setVariantOptionsForm(prev => ({
      ...prev,
      options: newOptions
    }));
  };

  const saveVariantOptions = () => {
    if (variantOptionsForm.fieldSlug && variantOptionsForm.options.length > 0) {
      const validOptions = variantOptionsForm.options.filter(option => option.trim() !== '');
      if (validOptions.length > 0) {
        updateVariantOptions(variantOptionsForm.fieldSlug, validOptions);
        setVariantOptionsForm({
          fieldSlug: '',
          options: ['']
        });
      }
    }
  };

  const resetForm = () => {
    setForm({
      categoryId: '',
      name: '',
      slug: '',
      basePrice: '',
      description: '',
      mainImages: [],
      hasVariants: false,
      variants: [],
      variantOptions: {},
      dynamicFields: {},
      metaData: {
        title: '',
        description: '',
        keywords: '',
        ogImage: null
      }
    });
    setEditingProduct(null);
    setSelectedCategory(null);
  };

  const generateSlug = (name) => {
    if (name) {
      const slug = name.toLowerCase()
        .replace(/[^a-z0-9 -]/g, '')
        .replace(/\s+/g, '-')
        .replace(/-+/g, '-')
        .trim();
      setForm({ ...form, slug });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    try {
      const formData = new FormData();
      formData.append('categoryId', form.categoryId);
      formData.append('name', form.name);
      formData.append('slug', form.slug);
      formData.append('basePrice', form.basePrice);
      formData.append('description', form.description);
      formData.append('hasVariants', form.hasVariants);
      formData.append('variants', JSON.stringify(form.variants));
      formData.append('variantOptions', JSON.stringify(form.variantOptions));
      formData.append('dynamicFields', JSON.stringify(form.dynamicFields));
      formData.append('metaData', JSON.stringify(form.metaData));

      if (form.mainImages && form.mainImages.length > 0) {
        for (let i = 0; i < form.mainImages.length; i++) {
          formData.append('images', form.mainImages[i]);
        }
      }

      if (editingProduct) {
        setUpdateLoading(true);
        await apiClient.put(`/api/products/${editingProduct._id}`, formData);
        setError('');
        setShowForm(false);
        resetForm();
        fetchProducts();
      } else {
        setCreateLoading(true);
        await apiClient.post('/api/products', formData);
        setError('');
        setShowForm(false);
        resetForm();
        fetchProducts();
      }
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to save product');
    } finally {
      setCreateLoading(false);
      setUpdateLoading(false);
    }
  };

  const handleEdit = (product) => {
    setEditingProduct(product);
    setForm({
      categoryId: product.categoryId,
      name: product.name,
      slug: product.slug,
      basePrice: product.basePrice || product.price || '',
      description: product.description || '',
      mainImages: product.mainImages || [],
      hasVariants: product.hasVariants || false,
      variants: product.variants || [],
      variantOptions: product.variantOptions || {},
      dynamicFields: product.dynamicFields || {},
      metaData: product.metaData || {
        title: '',
        description: '',
        keywords: '',
        ogImage: null
      }
    });

    if (product.categoryId) {
      fetchCategoryDetails(product.categoryId);
    }

    setShowForm(true);
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this product?')) {
      try {
        await apiClient.delete(`/api/products/${id}`);
        fetchProducts();
      } catch (err) {
        console.log(err);
        setError('Failed to delete product');
      }
    }
  };

  const addVariant = () => {
    const selectedCategory = categories.find(cat => cat._id === form.categoryId);
    if (!selectedCategory || !selectedCategory.variantFields) {
      alert('Please select a category with variant fields first');
      return;
    }

    const requiredFields = selectedCategory.variantFields.filter(field => field.required);
    const missingFields = requiredFields.filter(field => !variantForm.fields[field.slug]);

    if (missingFields.length > 0) {
      alert(`Please fill in required fields: ${missingFields.map(f => f.name).join(', ')}`);
      return;
    }

    if (!variantForm.price) {
      alert('Please enter a price for the variant');
      return;
    }

    setForm({
      ...form,
      variants: [...form.variants, { ...variantForm }]
    });
    
    setVariantForm({
      fields: {},
      price: '',
      mrp: '',
      discount: '',
      stock: 0,
      images: []
    });
  };

  const removeVariant = (index) => {
    const newVariants = form.variants.filter((_, i) => i !== index);
    setForm({ ...form, variants: newVariants });
  };

  const renderDynamicField = (field) => {
    switch (field.type) {
      case 'text':
        return (
          <input
            type="text"
            value={form.dynamicFields[field.slug] || ''}
            onChange={(e) => updateDynamicField(field.slug, e.target.value)}
            className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            placeholder={`Enter ${field.name}`}
            required={field.required}
          />
        );
      case 'number':
        return (
          <input
            type="number"
            value={form.dynamicFields[field.slug] || ''}
            onChange={(e) => updateDynamicField(field.slug, e.target.value)}
            className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            placeholder={`Enter ${field.name}`}
            required={field.required}
          />
        );
      case 'dropdown':
        return (
          <select
            value={form.dynamicFields[field.slug] || ''}
            onChange={(e) => updateDynamicField(field.slug, e.target.value)}
            className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            required={field.required}
          >
            <option value="">Select {field.name}</option>
            {field.options && field.options.map((option, index) => (
              <option key={index} value={option}>
                {option}
              </option>
            ))}
          </select>
        );
      case 'multi-select':
        return (
          <select
            multiple
            value={form.dynamicFields[field.slug] || []}
            onChange={(e) => {
              const selectedOptions = Array.from(e.target.selectedOptions, option => option.value);
              updateDynamicField(field.slug, selectedOptions);
            }}
            className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            required={field.required}
          >
            {field.options && field.options.map((option, index) => (
              <option key={index} value={option}>
                {option}
              </option>
            ))}
          </select>
        );
      case 'boolean':
        return (
          <input
            type="checkbox"
            checked={form.dynamicFields[field.slug] || false}
            onChange={(e) => updateDynamicField(field.slug, e.target.checked)}
            className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
            required={field.required}
          />
        );
      case 'image':
        return (
          <input
            type="file"
            accept="image/*"
            onChange={(e) => {
              const file = e.target.files[0];
              if (file) {
                updateDynamicField(field.slug, file);
              }
            }}
            className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            required={field.required}
          />
        );
      case 'rich text':
        return (
          <textarea
            value={form.dynamicFields[field.slug] || ''}
            onChange={(e) => updateDynamicField(field.slug, e.target.value)}
            rows={4}
            className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            placeholder={`Enter ${field.name}`}
            required={field.required}
          />
        );
      default:
        return (
          <input
            type="text"
            value={form.dynamicFields[field.slug] || ''}
            onChange={(e) => updateDynamicField(field.slug, e.target.value)}
            className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            placeholder={`Enter ${field.name}`}
            required={field.required}
          />
        );
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold text-gray-900">Products Management</h1>
        <button
          onClick={() => setShowForm(true)}
          className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors flex items-center gap-2"
        >
          <Plus size={20} />
          Add Product
        </button>
      </div>

      {error && (
        <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-6">
          <div className="flex">
            <div className="flex-shrink-0">
              <svg className="h-5 w-5 text-red-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z" />
              </svg>
            </div>
            <div className="ml-3">
              <p className="text-sm text-red-800">{error}</p>
              {error.includes('backend server') && (
                <div className="mt-2 text-xs text-red-700">
                  <p>• Make sure the backend server is running on port 5000</p>
                  <p>• Check the terminal for any error messages</p>
                  <p>• Try refreshing the page after starting the server</p>
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Product Form */}
      {showForm && (
        <div className="bg-white rounded-lg shadow-md p-6 mb-6">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-semibold text-gray-900">
              {editingProduct ? 'Edit Product' : 'Add New Product'}
            </h2>
            <button
              onClick={() => {
                setShowForm(false);
                resetForm();
              }}
              className="text-gray-400 hover:text-gray-600"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Basic Information */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Category *</label>
                <select
                  value={form.categoryId}
                  onChange={(e) => handleCategoryChange(e.target.value)}
                  className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  required
                >
                  <option value="">Select Category</option>
                  {categories.map((category) => (
                    <option key={category._id} value={category._id}>
                      {category.name}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Product Name *</label>
                <input
                  type="text"
                  value={form.name}
                  onChange={(e) => setForm({ ...form, name: e.target.value })}
                  onBlur={() => generateSlug(form.name)}
                  className="w-full border border-gray-300 rounded-lg px-3 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Product Slug *</label>
                <input
                  type="text"
                  value={form.slug}
                  onChange={(e) => setForm({ ...form, slug: e.target.value })}
                  className="w-full border border-gray-300 rounded-lg px-3 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Base Price *</label>
                <input
                  type="number"
                  value={form.basePrice}
                  onChange={(e) => setForm({ ...form, basePrice: e.target.value })}
                  className="w-full border border-gray-300 rounded-lg px-3 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  required
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Description</label>
              <textarea
                value={form.description}
                onChange={(e) => setForm({ ...form, description: e.target.value })}
                rows={4}
                className="w-full border border-gray-300 rounded-lg px-3 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="Product description..."
              />
            </div>

            {/* Product Images Upload */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Product Images *</label>
              <input
                key={editingProduct ? `edit-${editingProduct._id}` : 'new-product'}
                type="file"
                multiple
                accept="image/*"
                onChange={(e) => {
                  const files = Array.from(e.target.files);
                  setForm({ ...form, mainImages: files });
                }}
                className="w-full border border-gray-300 rounded-lg px-3 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                required
              />
              <p className="text-xs text-gray-500 mt-1">Select multiple images for the product gallery</p>
            </div>

            {/* Custom Fields based on Category */}
            {selectedCategory && selectedCategory.customFields && selectedCategory.customFields.length > 0 && (
              <div className="border-t pt-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">
                  Category Fields ({selectedCategory.customFields.length} fields)
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {selectedCategory.customFields.map((field) => (
                    <div key={field.slug}>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        {field.name}
                        {field.required && <span className="text-red-500">*</span>}
                        <span className="text-xs text-gray-500 ml-2">({field.type})</span>
                      </label>
                      {renderDynamicField(field)}
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Variants Toggle */}
            <div className="flex items-center space-x-3">
              <input
                type="checkbox"
                id="hasVariants"
                checked={form.hasVariants}
                onChange={(e) => setForm({ ...form, hasVariants: e.target.checked })}
                className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
              />
              <label htmlFor="hasVariants" className="text-sm font-medium text-gray-700">
                This product has variants
              </label>
            </div>

            {/* Variant Fields Info */}
            {form.hasVariants && selectedCategory && selectedCategory.variantFields && (
              <div className="space-y-6">
                <h3 className="text-lg font-semibold text-gray-900">Variant Fields</h3>
                <div className="p-4 bg-blue-50 rounded-lg border border-blue-200">
                  <p className="text-sm text-blue-800 mb-2">
                    This category uses the following variant fields:
                  </p>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                    {selectedCategory.variantFields.map((field, index) => (
                      <div key={index} className="text-sm text-blue-700">
                        <span className="font-medium">{field.name}</span>
                        {field.required && <span className="text-red-500 ml-1">*</span>}
                        {field.unit && <span className="text-blue-600 ml-1">({field.unit})</span>}
                        {field.type === 'dropdown' && field.options && (
                          <span className="text-blue-600 ml-1">Options: {field.options.join(', ')}</span>
                        )}
                      </div>
                    ))}
                  </div>
                </div>

                {/* Variant Options Management */}
                <div className="border-t pt-6">
                  <h4 className="text-md font-semibold text-gray-900 mb-4">Define Available Options</h4>
                  <p className="text-sm text-gray-600 mb-4">
                    Set what values are available for each variant field in this product.
                  </p>
                  
                  <div className="space-y-4">
                    {selectedCategory.variantFields.map((field) => (
                      <div key={field.slug} className="border rounded-lg p-4">
                        <div className="flex items-center justify-between mb-3">
                          <h5 className="font-medium text-gray-900">
                            {field.name}
                            {field.unit && <span className="text-gray-500 ml-1">({field.unit})</span>}
                          </h5>
                          <span className="text-sm text-gray-500">
                            {form.variantOptions[field.slug]?.length || 0} options set
                          </span>
                        </div>
                        
                        {/* Show current options */}
                        {form.variantOptions[field.slug] && form.variantOptions[field.slug].length > 0 && (
                          <div className="mb-3">
                            <p className="text-sm text-gray-600 mb-2">Current options:</p>
                            <div className="flex flex-wrap gap-2">
                              {form.variantOptions[field.slug].map((option, index) => (
                                <span key={index} className="px-2 py-1 bg-green-100 text-green-800 text-xs rounded-full">
                                  {option}
                                </span>
                              ))}
                            </div>
                          </div>
                        )}

                        {/* Add new options */}
                        <div className="space-y-3">
                          <div className="flex items-center space-x-2">
                            <input
                              type="text"
                              value={variantOptionsForm.fieldSlug === field.slug ? variantOptionsForm.options[0] : ''}
                              onChange={(e) => {
                                if (variantOptionsForm.fieldSlug === field.slug) {
                                  updateVariantOption(0, e.target.value);
                                } else {
                                  setVariantOptionsForm({
                                    fieldSlug: field.slug,
                                    options: [e.target.value]
                                  });
                                }
                              }}
                              placeholder={`Enter ${field.name} option`}
                              className="flex-1 border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                            />
                            <button
                              type="button"
                              onClick={() => {
                                if (variantOptionsForm.fieldSlug === field.slug) {
                                  addVariantOption();
                                } else {
                                  setVariantOptionsForm({
                                    fieldSlug: field.slug,
                                    options: ['', '']
                                  });
                                }
                              }}
                              className="px-3 py-2 text-blue-600 hover:text-blue-800 text-sm border border-blue-300 rounded-lg"
                            >
                              + Add More
                            </button>
                          </div>

                          {/* Additional options */}
                          {variantOptionsForm.fieldSlug === field.slug && variantOptionsForm.options.length > 1 && (
                            <div className="space-y-2">
                              {variantOptionsForm.options.slice(1).map((option, index) => (
                                <div key={index + 1} className="flex items-center space-x-2">
                                  <input
                                    type="text"
                                    value={option}
                                    onChange={(e) => updateVariantOption(index + 1, e.target.value)}
                                    placeholder={`Option ${index + 2}`}
                                    className="flex-1 border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                  />
                                  <button
                                    type="button"
                                    onClick={() => removeVariantOption(index + 1)}
                                    className="px-3 py-2 text-red-600 hover:text-red-800 text-sm"
                                  >
                                    Remove
                                  </button>
                                </div>
                              ))}
                            </div>
                          )}

                          {/* Save button */}
                          {variantOptionsForm.fieldSlug === field.slug && (
                            <div className="flex justify-end">
                              <button
                                type="button"
                                onClick={saveVariantOptions}
                                className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
                              >
                                Save Options
                              </button>
                            </div>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {/* Bulk Variant Creation */}
            {form.hasVariants && selectedCategory && selectedCategory.variantFields && Object.keys(form.variantOptions).length > 0 && (
              <div className="border-t pt-6">
                <h4 className="text-md font-semibold text-gray-900 mb-4">Bulk Variant Creation</h4>
                <p className="text-sm text-gray-600 mb-4">
                  Create all possible variant combinations automatically with base pricing.
                </p>
                
                <div className="p-4 bg-yellow-50 rounded-lg border border-yellow-200 mb-4">
                  <div className="text-sm text-yellow-800">
                    <p className="font-medium mb-2">Available combinations:</p>
                    {(() => {
                      const fields = selectedCategory.variantFields;
                      const options = form.variantOptions;
                      const combinations = fields.reduce((acc, field) => {
                        const fieldOptions = options[field.slug] || [];
                        return acc * Math.max(fieldOptions.length, 1);
                      }, 1);
                      return (
                        <p>
                          {fields.map((field, index) => {
                            const fieldOptions = options[field.slug] || [];
                            return (
                              <span key={field.slug}>
                                {field.name}: {fieldOptions.length} options
                                {index < fields.length - 1 ? ' × ' : ''}
                              </span>
                            );
                          })}
                          {combinations > 1 && (
                            <span className="font-bold ml-2">= {combinations} total variants</span>
                          )}
                        </p>
                      );
                    })()}
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                  <input
                    type="number"
                    value={variantForm.price}
                    onChange={(e) => setVariantForm({ ...variantForm, price: e.target.value })}
                    placeholder="Base Price"
                    className="border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                  <input
                    type="number"
                    value={variantForm.mrp}
                    onChange={(e) => setVariantForm({ ...variantForm, mrp: e.target.value })}
                    placeholder="Base MRP"
                    className="border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                  <input
                    type="number"
                    value={variantForm.stock}
                    onChange={(e) => setVariantForm({ ...variantForm, stock: e.target.value })}
                    placeholder="Base Stock"
                    className="border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>

                <button
                  type="button"
                  onClick={() => {
                    const fields = selectedCategory.variantFields;
                    const options = form.variantOptions;
                    
                    // Generate all combinations
                    const generateCombinations = (fieldIndex = 0, currentCombination = {}) => {
                      if (fieldIndex >= fields.length) {
                        return [currentCombination];
                      }
                      
                      const field = fields[fieldIndex];
                      const fieldOptions = options[field.slug] || [];
                      
                      if (fieldOptions.length === 0) {
                        return generateCombinations(fieldIndex + 1, currentCombination);
                      }
                      
                      const combinations = [];
                      fieldOptions.forEach(option => {
                        const newCombination = { ...currentCombination, [field.slug]: option };
                        combinations.push(...generateCombinations(fieldIndex + 1, newCombination));
                      });
                      
                      return combinations;
                    };
                    
                    const allCombinations = generateCombinations();
                    
                    // Create variants for each combination
                    const newVariants = allCombinations.map(combination => ({
                      fields: combination,
                      price: variantForm.price || form.basePrice,
                      mrp: variantForm.mrp || form.basePrice,
                      discount: variantForm.discount || 0,
                      stock: variantForm.stock || 0,
                      images: []
                    }));
                    
                    setForm(prev => ({
                      ...prev,
                      variants: [...prev.variants, ...newVariants]
                    }));
                    
                    // Reset variant form
                    setVariantForm({
                      fields: {},
                      price: '',
                      mrp: '',
                      discount: '',
                      stock: 0,
                      images: []
                    });
                  }}
                  className="bg-yellow-600 text-white px-4 py-2 rounded-lg hover:bg-yellow-700 transition-colors"
                >
                  Create All Variants
                </button>
              </div>
            )}

            {/* Add Variant */}
            {form.hasVariants && (
              <div className="border-t pt-6">
                <h4 className="text-md font-semibold text-gray-900 mb-4">Add Variant</h4>
                
                {/* Dynamic Variant Fields */}
                {selectedCategory && selectedCategory.variantFields && (
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-4">
                    {selectedCategory.variantFields.map((field, index) => (
                      <div key={index}>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          {field.name}
                          {field.required && <span className="text-red-500">*</span>}
                        </label>
                        
                        {field.type === 'dropdown' && field.options ? (
                          <select
                            value={variantForm.fields[field.slug] || ''}
                            onChange={(e) => updateVariantField(field.slug, e.target.value)}
                            className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                            required={field.required}
                          >
                            <option value="">Select {field.name}</option>
                            {field.options.map((option, optIndex) => (
                              <option key={optIndex} value={option}>
                                {option}
                              </option>
                            ))}
                          </select>
                        ) : (
                          <input
                            type={field.type === 'number' ? 'number' : 'text'}
                            value={variantForm.fields[field.slug] || ''}
                            onChange={(e) => updateVariantField(field.slug, e.target.value)}
                            className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                            placeholder={`Enter ${field.name}${field.unit ? ` (${field.unit})` : ''}`}
                            required={field.required}
                          />
                        )}
                      </div>
                    ))}
                  </div>
                )}

                {/* Variant Fields Inputs */}
                {selectedCategory && selectedCategory.variantFields && (
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-4">
                    {selectedCategory.variantFields.map((field, index) => (
                      <div key={index}>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          {field.name}
                          {field.required && <span className="text-red-500">*</span>}
                        </label>
                        
                        {field.type === 'dropdown' && field.options ? (
                          <select
                            value={variantForm.fields[field.slug] || ''}
                            onChange={(e) => updateVariantField(field.slug, e.target.value)}
                            className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                            required={field.required}
                          >
                            <option value="">Select {field.name}</option>
                            {field.options.map((option, optIndex) => (
                              <option key={optIndex} value={option}>
                                {option}
                              </option>
                            ))}
                          </select>
                        ) : (
                          <input
                            type={field.type === 'number' ? 'number' : 'text'}
                            value={variantForm.fields[field.slug] || ''}
                            onChange={(e) => updateVariantField(field.slug, e.target.value)}
                            className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                            placeholder={`Enter ${field.name}${field.unit ? ` (${field.unit})` : ''}`}
                            required={field.required}
                          />
                        )}
                      </div>
                    ))}
                  </div>
                )}

                {/* Basic Variant Fields */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4">
                  <input
                    type="number"
                    value={variantForm.price}
                    onChange={(e) => setVariantForm({ ...variantForm, price: e.target.value })}
                    placeholder="Price"
                    className="border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                  <input
                    type="number"
                    value={variantForm.mrp}
                    onChange={(e) => setVariantForm({ ...variantForm, mrp: e.target.value })}
                    placeholder="MRP"
                    className="border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                  <input
                    type="number"
                    value={variantForm.stock}
                    onChange={(e) => setVariantForm({ ...variantForm, stock: e.target.value })}
                    placeholder="Stock"
                    className="border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>

                <button
                  type="button"
                  onClick={addVariant}
                  className="mt-4 bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-colors"
                >
                  Add Variant
                </button>
              </div>
            )}

            {/* Variants List */}
            {form.variants.length > 0 && (
              <div>
                <h4 className="text-md font-semibold text-gray-900 mb-4">Current Variants</h4>
                <div className="space-y-2">
                  {form.variants.map((variant, index) => (
                    <div key={index} className="flex items-center justify-between bg-gray-50 p-3 rounded-lg">
                      <div className="flex-1">
                        {/* Display dynamic variant fields */}
                        {variant.fields && Object.entries(variant.fields).map(([, value], fieldIndex) => (
                          <span key={fieldIndex}>
                            {fieldIndex > 0 && <span className="mx-1">-</span>}
                            <span className="font-medium">{value}</span>
                          </span>
                        ))}
                        <span className="ml-4 text-gray-600">₹{variant.price}</span>
                        {variant.stock > 0 && <span className="ml-2 text-green-600">Stock: {variant.stock}</span>}
                      </div>
                      <button
                        type="button"
                        onClick={() => removeVariant(index)}
                        className="text-red-600 hover:text-red-800 ml-2"
                      >
                        <Trash2 size={16} />
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Form Buttons */}
            <div className="flex justify-end space-x-3">
              <button
                type="button"
                onClick={() => {
                  setShowForm(false);
                  resetForm();
                }}
                className="px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={createLoading || updateLoading}
                className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 transition-colors"
              >
                {createLoading || updateLoading ? 'Saving...' : (editingProduct ? 'Update Product' : 'Create Product')}
              </button>
            </div>
          </form>
        </div>
      )}

      {/* Products List */}
      <div className="bg-white rounded-lg shadow-md overflow-hidden">
        <div className="px-6 py-4 border-b border-gray-200">
          <h3 className="text-lg font-semibold text-gray-900">
            Products ({Array.isArray(products) ? products.length : 0})
          </h3>
        </div>

        {loading ? (
          <div className="p-6 text-center">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto"></div>
            <p className="mt-2 text-gray-600">Loading products...</p>
          </div>
        ) : !Array.isArray(products) || products.length === 0 ? (
          <div className="p-6 text-center">
            <div className="text-gray-400 mb-4">
              <svg className="mx-auto h-12 w-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
              </svg>
            </div>
            <h3 className="text-lg font-medium text-gray-900 mb-2">No products found</h3>
            <p className="text-gray-600 mb-4">Get started by creating your first product.</p>
            <button
              onClick={() => setShowForm(true)}
              className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
            >
              Create Product
            </button>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Product</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Category</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Price</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Variants</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {products.map((product) => (
                  <tr key={product._id}>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <div className="flex-shrink-0 h-10 w-10">
                          {product.mainImages && product.mainImages.length > 0 ? (
                            <img className="h-10 w-10 rounded-lg object-cover" src={product.mainImages[0]} alt={product.name} />
                          ) : (
                            <div className="h-10 w-10 rounded-lg bg-gray-200 flex items-center justify-center">
                              <ImageIcon size={20} className="text-gray-400" />
                            </div>
                          )}
                        </div>
                        <div className="ml-4">
                          <div className="text-sm font-medium text-gray-900">{product.name}</div>
                          <div className="text-sm text-gray-500">{product.slug}</div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {categories.find(c => c._id === product.categoryId)?.name || 'Unknown'}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      ₹{product.basePrice || product.price || 0}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {product.hasVariants ? (
                        <div className="flex items-center">
                          <Package size={16} className="text-blue-600 mr-1" />
                          {product.variants?.length || 0} variants
                        </div>
                      ) : (
                        'No variants'
                      )}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                      <div className="flex space-x-2">
                        <button
                          onClick={() => handleEdit(product)}
                          className="text-blue-600 hover:text-blue-900"
                        >
                          <Edit size={16} />
                        </button>
                        <button
                          onClick={() => handleDelete(product._id)}
                          className="text-red-600 hover:text-red-900"
                        >
                          <Trash2 size={16} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}
