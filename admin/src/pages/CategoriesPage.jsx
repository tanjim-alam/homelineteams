import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import {
  listCategories,
  createCategory,
  updateCategory,
  deleteCategory,
  addCustomField,
  addVariantField,
  clearError
} from '../store/slices/categorySlice'
import RichTextEditor from '../components/RichTextEditor'

export default function CategoriesPage() {
  const dispatch = useDispatch()
  const { items, loading, error, createLoading, updateLoading } = useSelector(s => s.categories)

  const [showForm, setShowForm] = useState(false)
  const [editingCategory, setEditingCategory] = useState(null)
  const [showCustomFieldForm, setShowCustomFieldForm] = useState(false)
  const [showVariantFieldForm, setShowVariantFieldForm] = useState(false)
  const [selectedCategory, setSelectedCategory] = useState(null)

  const [form, setForm] = useState({
    name: '',
    slug: '',
    description: '',
    image: null,
    seoContent: '',
    metaData: {
      title: '',
      description: '',
      keywords: '',
      ogImage: ''
    }
  })

  const [customFieldForm, setCustomFieldForm] = useState({
    name: '',
    slug: '',
    type: 'text',
    options: [''],
    required: false,
    visibleOnProduct: true
  })

  const [variantFieldForm, setVariantFieldForm] = useState({
    name: '',
    slug: '',
    type: 'dropdown',
    options: [''],
    required: false,
    unit: '',
    order: 1
  })

  useEffect(() => {
    dispatch(listCategories())
  }, [dispatch])

  useEffect(() => {
    if (error) {
      const timer = setTimeout(() => dispatch(clearError()), 5000)
      return () => clearTimeout(timer)
    }
  }, [error, dispatch])

  const handleSubmit = (e) => {
    e.preventDefault()
    
    console.log('=== FORM SUBMISSION DEBUG ===')
    console.log('Form data:', form)
    console.log('Editing category:', editingCategory)
    
    const formData = new FormData()

    // Append basic fields
    formData.append('name', form.name)
    formData.append('slug', form.slug)
    formData.append('description', form.description)
    formData.append('seoContent', form.seoContent)

    // Append SEO metadata
    formData.append('metaData[title]', form.metaData.title)
    formData.append('metaData[description]', form.metaData.description)
    formData.append('metaData[keywords]', form.metaData.keywords)
    if (form.metaData.ogImage) {
      formData.append('metaData[ogImage]', form.metaData.ogImage)
    }

    // Append image
    if (form.image) {
      formData.append('image', form.image)
    }

    // Debug FormData contents
    console.log('=== FORMDATA CONTENTS ===')
    for (let [key, value] of formData.entries()) {
      console.log(`${key}:`, value instanceof File ? `File(${value.name}, ${value.size} bytes)` : value)
    }
    console.log('FormData size:', formData.entries().length, 'entries')

    if (editingCategory) {
      console.log('Dispatching updateCategory with ID:', editingCategory._id)
      dispatch(updateCategory({ id: editingCategory._id, payload: formData }))
    } else {
      console.log('Dispatching createCategory')
      dispatch(createCategory(formData))
    }

    resetForm()
    setShowForm(false)
  }

  const handleEdit = (category) => {
    setEditingCategory(category)
    setForm({
      name: category.name,
      slug: category.slug,
      description: category.description || '',
      image: null,
      seoContent: category.seoContent || '',
      metaData: {
        title: category.metaData?.title || '',
        description: category.metaData?.description || '',
        keywords: category.metaData?.keywords || '',
        ogImage: category.metaData?.ogImage || ''
      }
    })
    setShowForm(true)
  }

  const handleDelete = (id) => {
    if (window.confirm('Are you sure you want to delete this category?')) {
      dispatch(deleteCategory(id))
    }
  }

  const handleCustomFieldSubmit = (e) => {
    e.preventDefault()
    if (selectedCategory) {
      dispatch(addCustomField({
        id: selectedCategory._id,
        payload: customFieldForm
      }))
      setCustomFieldForm({
        name: '',
        slug: '',
        type: 'text',
        options: [''],
        required: false,
        visibleOnProduct: true
      })
      setShowCustomFieldForm(false)
    }
  }

  const handleVariantFieldSubmit = (e) => {
    e.preventDefault()
    if (selectedCategory) {
      // Add variant field to category using the API
      dispatch(addVariantField({
        id: selectedCategory._id,
        payload: variantFieldForm
      }))
      
      setVariantFieldForm({
        name: '',
        slug: '',
        type: 'dropdown',
        options: [''],
        required: false,
        unit: '',
        order: 1
      })
      setShowVariantFieldForm(false)
    }
  }

  const resetForm = () => {
    setForm({
      name: '',
      slug: '',
      description: '',
      image: null,
      seoContent: '',
      metaData: {
        title: '',
        description: '',
        keywords: '',
        ogImage: ''
      }
    })
    setEditingCategory(null)
  }

  const handleImageChange = (e) => {
    const file = e.target.files[0]
    if (file) {
      setForm({ ...form, image: file })
    }
  }

  const addOption = () => {
    setCustomFieldForm({
      ...customFieldForm,
      options: [...customFieldForm.options, '']
    })
  }

  const removeOption = (index) => {
    const newOptions = customFieldForm.options.filter((_, i) => i !== index)
    setCustomFieldForm({ ...customFieldForm, options: newOptions })
  }

  const updateOption = (index, value) => {
    const newOptions = [...customFieldForm.options]
    newOptions[index] = value
    setCustomFieldForm({ ...customFieldForm, options: newOptions })
  }

  const generateSlug = (name) => {
    const slug = name
      .toLowerCase()
      .trim()
      .replace(/[^\w\s-]/g, '')
      .replace(/[\s_-]+/g, '-')
      .replace(/^-+|-+$/g, '')
    setForm({ ...form, slug })
  }

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-gray-900">Categories</h1>
        <button
          onClick={() => setShowForm(true)}
          className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
        >
          Add Category
        </button>
      </div>

      {/* Error Alert */}
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
            </div>
          </div>
        </div>
      )}

      {/* Category Form */}
      {showForm && (
        <div className="bg-white rounded-lg shadow-md p-6 mb-6">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-semibold text-gray-900">
              {editingCategory ? 'Edit Category' : 'Add New Category'}
            </h2>
            <button
              onClick={() => {
                setShowForm(false)
                resetForm()
              }}
              className="text-gray-400 hover:text-gray-600"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Basic Information */}
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Category Name *</label>
                  <input
                    type="text"
                    value={form.name}
                    onChange={(e) => setForm({ ...form, name: e.target.value })}
                    onBlur={() => generateSlug(form.name)}
                    className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Category Slug *</label>
                  <input
                    type="text"
                    value={form.slug}
                    onChange={(e) => setForm({ ...form, slug: e.target.value })}
                    className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    required
                  />
                  <p className="text-xs text-gray-500 mt-1">URL-friendly version of the category name</p>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Description</label>
                  <textarea
                    value={form.description}
                    onChange={(e) => setForm({ ...form, description: e.target.value })}
                    rows={3}
                    className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="Brief description of the category"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Category Image</label>
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleImageChange}
                    className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
              </div>

              {/* SEO Metadata */}
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Meta Title</label>
                  <input
                    type="text"
                    value={form.metaData.title}
                    onChange={(e) => setForm({
                      ...form,
                      metaData: { ...form.metaData, title: e.target.value }
                    })}
                    className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="SEO title for search engines"
                  />
                  <p className="text-xs text-gray-500 mt-1">Recommended: 50-60 characters</p>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Meta Description</label>
                  <textarea
                    value={form.metaData.description}
                    onChange={(e) => setForm({
                      ...form,
                      metaData: { ...form.metaData, description: e.target.value }
                    })}
                    rows={3}
                    className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="SEO description for search engines"
                  />
                  <p className="text-xs text-gray-500 mt-1">Recommended: 150-160 characters</p>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Meta Keywords</label>
                  <input
                    type="text"
                    value={form.metaData.keywords}
                    onChange={(e) => setForm({
                      ...form,
                      metaData: { ...form.metaData, keywords: e.target.value }
                    })}
                    className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="Keywords separated by commas"
                  />
                  <p className="text-xs text-gray-500 mt-1">Comma-separated keywords for SEO</p>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Open Graph Image</label>
                  <input
                    type="file"
                    accept="image/*"
                    onChange={(e) => {
                      const file = e.target.files[0]
                      if (file) {
                        setForm({
                          ...form,
                          metaData: { ...form.metaData, ogImage: file }
                        })
                      }
                    }}
                    className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                  <p className="text-xs text-gray-500 mt-1">Image for social media sharing (1200x630px recommended)</p>
                </div>
              </div>
            </div>

            {/* SEO Content Editor */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">SEO Content (Rich Text)</label>
              <RichTextEditor
                value={form.seoContent}
                onChange={(value) => setForm({ ...form, seoContent: value })}
                placeholder="Enter rich HTML content for SEO. This content will be displayed on category pages and help with search engine rankings."
                rows={8}
              />
              <p className="text-xs text-gray-500 mt-1">
                Rich HTML content for SEO. This content will be displayed on category pages and help with search engine rankings.
              </p>
            </div>

            <div className="flex justify-end space-x-3">
              <button
                type="button"
                onClick={() => {
                  setShowForm(false)
                  resetForm()
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
                {createLoading || updateLoading ? 'Saving...' : (editingCategory ? 'Update Category' : 'Create Category')}
              </button>
            </div>
          </form>
        </div>
      )}

      {/* Custom Field Form */}
      {showCustomFieldForm && selectedCategory && (
        <div className="bg-white rounded-lg shadow-md p-6 mb-6">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-semibold text-gray-900">
              Add Custom Field to {selectedCategory.name}
            </h2>
            <button
              onClick={() => setShowCustomFieldForm(false)}
              className="text-gray-400 hover:text-gray-600"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          <form onSubmit={handleCustomFieldSubmit} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Field Name *</label>
                <input
                  type="text"
                  value={customFieldForm.name}
                  onChange={(e) => setCustomFieldForm({ ...customFieldForm, name: e.target.value })}
                  className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Field Slug *</label>
                <input
                  type="text"
                  value={customFieldForm.slug}
                  onChange={(e) => setCustomFieldForm({ ...customFieldForm, slug: e.target.value })}
                  className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Field Type *</label>
                <select
                  value={customFieldForm.type}
                  onChange={(e) => setCustomFieldForm({ ...customFieldForm, type: e.target.value })}
                  className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  <option value="text">Text</option>
                  <option value="number">Number</option>
                  <option value="dropdown">Dropdown</option>
                  <option value="multi-select">Multi-select</option>
                  <option value="boolean">Boolean</option>
                  <option value="image">Image</option>
                  <option value="rich-text">Rich Text</option>
                </select>
              </div>

              <div className="flex items-center space-x-3">
                <label className="flex items-center">
                  <input
                    type="checkbox"
                    checked={customFieldForm.required}
                    onChange={(e) => setCustomFieldForm({ ...customFieldForm, required: e.target.checked })}
                    className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                  />
                  <span className="ml-2 text-sm text-gray-700">Required Field</span>
                </label>
              </div>

              <div className="flex items-center space-x-3">
                <label className="flex items-center">
                  <input
                    type="checkbox"
                    checked={customFieldForm.visibleOnProduct}
                    onChange={(e) => setCustomFieldForm({ ...customFieldForm, visibleOnProduct: e.target.checked })}
                    className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                  />
                  <span className="ml-2 text-sm text-gray-700">Visible on Product Page</span>
                </label>
              </div>
            </div>

            {/* Options for dropdown/multi-select */}
            {(customFieldForm.type === 'dropdown' || customFieldForm.type === 'multi-select') && (
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Options</label>
                <div className="space-y-2">
                  {customFieldForm.options.map((option, index) => (
                    <div key={index} className="flex space-x-2">
                      <input
                        type="text"
                        value={option}
                        onChange={(e) => updateOption(index, e.target.value)}
                        className="flex-1 border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        placeholder={`Option ${index + 1}`}
                      />
                      <button
                        type="button"
                        onClick={() => removeOption(index)}
                        className="px-3 py-2 text-red-600 hover:text-red-800"
                      >
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                        </svg>
                      </button>
                    </div>
                  ))}
                  <button
                    type="button"
                    onClick={addOption}
                    className="text-blue-600 hover:text-blue-800 text-sm"
                  >
                    + Add Option
                  </button>
                </div>
              </div>
            )}

            <div className="flex justify-end space-x-3">
              <button
                type="button"
                onClick={() => setShowCustomFieldForm(false)}
                className="px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
              >
                Add Field
              </button>
            </div>
          </form>
        </div>
      )}

      {/* Variant Field Form */}
      {showVariantFieldForm && selectedCategory && (
        <div className="bg-white rounded-lg shadow-md p-6 mb-6">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-semibold text-gray-900">
              Add Variant Field to {selectedCategory.name}
            </h2>
            <button
              onClick={() => setShowVariantFieldForm(false)}
              className="text-gray-400 hover:text-gray-600"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          <form onSubmit={handleVariantFieldSubmit} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Field Name *</label>
                <input
                  type="text"
                  value={variantFieldForm.name}
                  onChange={(e) => setVariantFieldForm({ ...variantFieldForm, name: e.target.value })}
                  className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Field Slug *</label>
                <input
                  type="text"
                  value={variantFieldForm.slug}
                  onChange={(e) => setVariantFieldForm({ ...variantFieldForm, slug: e.target.value })}
                  className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Field Type *</label>
                <select
                  value={variantFieldForm.type}
                  onChange={(e) => setVariantFieldForm({ ...variantFieldForm, type: e.target.value })}
                  className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  <option value="dropdown">Dropdown</option>
                  <option value="number">Number</option>
                  <option value="text">Text</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Unit (optional)</label>
                <input
                  type="text"
                  value={variantFieldForm.unit}
                  onChange={(e) => setVariantFieldForm({ ...variantFieldForm, unit: e.target.value })}
                  className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="e.g., ft, cm, kg"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Order</label>
                <input
                  type="number"
                  value={variantFieldForm.order}
                  onChange={(e) => setVariantFieldForm({ ...variantFieldForm, order: parseInt(e.target.value) })}
                  className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  min="1"
                />
              </div>

              <div className="flex items-center space-x-3">
                <label className="flex items-center">
                  <input
                    type="checkbox"
                    checked={variantFieldForm.required}
                    onChange={(e) => setVariantFieldForm({ ...variantFieldForm, required: e.target.checked })}
                    className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                  />
                  <span className="ml-2 text-sm text-gray-700">Required Field</span>
                </label>
              </div>
            </div>

            {/* Options for dropdown */}
            {variantFieldForm.type === 'dropdown' && (
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Options</label>
                <div className="space-y-2">
                  {variantFieldForm.options.map((option, index) => (
                    <div key={index} className="flex space-x-2">
                      <input
                        type="text"
                        value={option}
                        onChange={(e) => updateOption(index, e.target.value)}
                        className="flex-1 border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        placeholder={`Option ${index + 1}`}
                      />
                      <button
                        type="button"
                        onClick={() => removeOption(index)}
                        className="px-3 py-2 text-red-600 hover:text-red-800"
                      >
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                        </svg>
                      </button>
                    </div>
                  ))}
                  <button
                    type="button"
                    onClick={addOption}
                    className="text-blue-600 hover:text-blue-800 text-sm"
                  >
                    + Add Option
                  </button>
                </div>
              </div>
            )}

            <div className="flex justify-end space-x-3">
              <button
                type="button"
                onClick={() => setShowVariantFieldForm(false)}
                className="px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
              >
                Add Variant Field
              </button>
            </div>
          </form>
        </div>
      )}

      {/* Categories List */}
      <div className="bg-white rounded-lg shadow-md">
        {loading ? (
          <div className="p-6">
            <div className="animate-pulse space-y-4">
              {[1, 2, 3].map((i) => (
                <div key={i} className="h-20 bg-gray-200 rounded"></div>
              ))}
            </div>
          </div>
        ) : items.length === 0 ? (
          <div className="p-6 text-center text-gray-500">
            <svg className="mx-auto h-12 w-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
            </svg>
            <h3 className="mt-2 text-sm font-medium text-gray-900">No categories</h3>
            <p className="mt-1 text-sm text-gray-500">Get started by creating a new category.</p>
          </div>
        ) : (
          <div className="divide-y divide-gray-200">
            {items.map((category) => (
              <div key={category._id} className="p-6">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center space-x-3 mb-3">
                      <h3 className="text-lg font-medium text-gray-900">{category.name}</h3>
                      <span className="text-sm text-gray-500">/{category.slug}</span>
                    </div>

                    {category.description && (
                      <p className="text-gray-600 mb-3">{category.description}</p>
                    )}

                    {category.image && (
                      <div className="mb-3">
                        <img
                          src={category.image}
                          alt={category.name}
                          className="w-20 h-20 object-cover rounded-lg border"
                        />
                      </div>
                    )}

                    {/* SEO Metadata Display */}
                    {(category.metaData?.title || category.metaData?.description || category.metaData?.keywords) && (
                      <div className="mb-3 p-3 bg-blue-50 rounded-lg">
                        <h4 className="text-sm font-medium text-blue-900 mb-2">SEO Metadata</h4>
                        {category.metaData.title && (
                          <p className="text-xs text-blue-800 mb-1">
                            <strong>Title:</strong> {category.metaData.title}
                          </p>
                        )}
                        {category.metaData.description && (
                          <p className="text-xs text-blue-800 mb-1">
                            <strong>Description:</strong> {category.metaData.description}
                          </p>
                        )}
                        {category.metaData.keywords && (
                          <p className="text-xs text-blue-800">
                            <strong>Keywords:</strong> {category.metaData.keywords}
                          </p>
                        )}
                      </div>
                    )}

                    {/* SEO Content Preview */}
                    {category.seoContent && (
                      <div className="mb-3 p-3 bg-green-50 rounded-lg">
                        <h4 className="text-sm font-medium text-green-900 mb-2">SEO Content</h4>
                        <div
                          className="text-xs text-green-800 prose prose-sm max-w-none"
                          dangerouslySetInnerHTML={{
                            __html: category.seoContent.length > 200
                              ? category.seoContent.substring(0, 200) + '...'
                              : category.seoContent
                          }}
                        />
                      </div>
                    )}

                    {/* Custom Fields */}
                    {category.customFields && category.customFields.length > 0 && (
                      <div className="mb-3">
                        <h4 className="text-sm font-medium text-gray-900 mb-2">Custom Fields ({category.customFields.length})</h4>
                        <div className="flex flex-wrap gap-2">
                          {category.customFields.map((field, index) => (
                            <span
                              key={index}
                              className="px-2 py-1 bg-blue-100 text-blue-800 text-xs rounded-full"
                            >
                              {field.name} ({field.type})
                              {field.required && <span className="text-red-600 ml-1">*</span>}
                            </span>
                          ))}
                        </div>
                      </div>
                    )}

                    {/* Variant Fields */}
                    {category.variantFields && category.variantFields.length > 0 && (
                      <div className="mb-3">
                        <h4 className="text-sm font-medium text-gray-900 mb-2">Variant Fields ({category.variantFields.length})</h4>
                        <div className="flex flex-wrap gap-2">
                          {category.variantFields.map((field, index) => (
                            <span
                              key={index}
                              className="px-2 py-1 bg-purple-100 text-purple-800 text-xs rounded-full"
                            >
                              {field.name} ({field.type})
                              {field.unit && <span className="text-purple-600 ml-1">({field.unit})</span>}
                              {field.required && <span className="text-red-600 ml-1">*</span>}
                            </span>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>

                  <div className="flex flex-col space-y-2 ml-4">
                    <button
                      onClick={() => handleEdit(category)}
                      className="px-3 py-1 text-blue-600 hover:text-blue-800 text-sm"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => {
                        setSelectedCategory(category)
                        setShowCustomFieldForm(true)
                      }}
                      className="px-3 py-1 text-green-600 hover:text-green-800 text-sm"
                    >
                      Add Field
                    </button>
                    <button
                      onClick={() => {
                        setSelectedCategory(category)
                        setShowVariantFieldForm(true)
                      }}
                      className="px-3 py-1 text-purple-600 hover:text-purple-800 text-sm"
                    >
                      Add Variant Field
                    </button>
                    <button
                      onClick={() => handleDelete(category._id)}
                      className="px-3 py-1 text-red-600 hover:text-red-800 text-sm"
                    >
                      Delete
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}


