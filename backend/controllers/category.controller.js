const Category = require('../models/Category');
const { uploadBuffer } = require('../utils/cloudinary');

// Create category
exports.createCategory = async (req, res, next) => {
  try {
    const { name, slug, description, seoContent } = req.body;

    // Handle FormData fields for metaData
    let metaData = {};
    if (req.body['metaData[title]']) metaData.title = req.body['metaData[title]'];
    if (req.body['metaData[description]']) metaData.description = req.body['metaData[description]'];
    if (req.body['metaData[keywords]']) metaData.keywords = req.body['metaData[keywords]'];

    let imageUrl;

    // ✅ Handle main image
    if (req.files && req.files.image) {
      const mainImageFile = req.files.image[0];
      const uploaded = await uploadBuffer(mainImageFile.buffer, `categories/${slug || name}`);
      imageUrl = uploaded.secure_url;
    }

    // ✅ Handle Open Graph image
    if (req.files && req.files['metaData[ogImage]']) {
      const ogImageFile = req.files['metaData[ogImage]'][0];
      const uploaded = await uploadBuffer(ogImageFile.buffer, `categories/og-images/${slug || name}`);
      metaData.ogImage = uploaded.secure_url;
    }

    // Save category
    const category = await Category.create({
      name,
      slug,
      description,
      image: imageUrl,
      metaData,
      seoContent
    });

    res.status(201).json(category);
  } catch (err) {
    next(err);
  }
};

// Get all categories
exports.getCategories = async (req, res, next) => {
  try {
    const categories = await Category.find().sort({ createdAt: -1 });
    res.json(categories);
  } catch (err) {
    next(err);
  }
};

// Get category by slug
exports.getCategoryBySlug = async (req, res, next) => {
  try {
    const { slug } = req.params;
    const category = await Category.findOne({ slug });
    if (!category) return res.status(404).json({ message: 'Category not found' });
    res.json(category);
  } catch (err) {
    next(err);
  }
};

// Get category by ID
exports.getCategoryById = async (req, res, next) => {
  try {
    const { id } = req.params;
    const category = await Category.findById(id);
    if (!category) return res.status(404).json({ message: 'Category not found' });
    res.json(category);
  } catch (err) {
    next(err);
  }
};

// Get filter options for a category
exports.getCategoryFilterOptions = async (req, res, next) => {
  try {
    const { slug } = req.params;
    const category = await Category.findOne({ slug });
    
    if (!category) {
      return res.status(404).json({ message: 'Category not found' });
    }

    // Get all products in this category to extract filter options
    const Product = require('../models/Product');
    const products = await Product.find({ categoryId: category._id });

    // Extract only essential filter options
    const filterOptions = {
      // Price range from products
      priceRange: {
        min: Math.min(...products.map(p => p.basePrice)),
        max: Math.max(...products.map(p => p.basePrice))
      },
      
      // Brands from dynamic fields (if they exist)
      brands: [],
      
      // Ratings (if implemented)
      ratings: [5, 4, 3, 2, 1],
      
      // Availability based on stock
      availability: ['In Stock', 'Out of Stock', 'Pre-order'],
      
      // Only show the most important custom fields as filters
      importantFilters: {}
    };

    // Extract brand information if it exists in dynamic fields
    const brandField = category.customFields?.find(field => 
      field.slug === 'brand' || field.name.toLowerCase().includes('brand')
    );
    
    if (brandField) {
      const brands = new Set();
      products.forEach(product => {
        if (product.dynamicFields?.brand) {
          brands.add(product.dynamicFields.brand);
        }
      });
      filterOptions.brands = Array.from(brands).sort();
    }

    // Extract only the most important filter options (max 3-4 filters)
    const importantFields = [];
    
    // Add material if it exists
    const materialField = category.customFields?.find(field => 
      field.slug === 'material' || field.name.toLowerCase().includes('material')
    );
    if (materialField) {
      importantFields.push({
        key: 'material',
        name: materialField.name,
        options: materialField.options || []
      });
    }

    // Add style if it exists
    const styleField = category.customFields?.find(field => 
      field.slug === 'style' || field.name.toLowerCase().includes('style')
    );
    if (styleField) {
      importantFields.push({
        key: 'style',
        name: styleField.name,
        options: styleField.options || []
      });
    }

    // Add color if it exists
    const colorField = category.customFields?.find(field => 
      field.slug === 'color' || field.name.toLowerCase().includes('color')
    );
    if (colorField) {
      importantFields.push({
        key: 'color',
        name: colorField.name,
        options: colorField.options || []
      });
    }

    // Add one most important variant field if it exists
    if (category.variantFields && category.variantFields.length > 0) {
      const mainVariantField = category.variantFields[0]; // Take the first one
      const values = new Set();
      products.forEach(product => {
        if (product.variantOptions?.[mainVariantField.slug]) {
          product.variantOptions[mainVariantField.slug].forEach(value => {
            values.add(value);
          });
        }
      });
      
      if (values.size > 0) {
        importantFields.push({
          key: mainVariantField.slug,
          name: mainVariantField.name,
          unit: mainVariantField.unit,
          options: Array.from(values).sort()
        });
      }
    }

    // Limit to maximum 4 important filters
    filterOptions.importantFilters = importantFields.slice(0, 4);

    res.json(filterOptions);
  } catch (err) {
    console.error('Error getting filter options:', err);
    next(err);
  }
};

// Update category
exports.updateCategory = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { name, slug, description, seoContent } = req.body;

    const updates = { name, slug, description, seoContent };

    // ✅ Handle FormData fields for metaData
    if (req.body['metaData[title]'] !== undefined) {
      updates.metaData = updates.metaData || {};
      updates.metaData.title = req.body['metaData[title]'];
    }
    if (req.body['metaData[description]'] !== undefined) {
      updates.metaData = updates.metaData || {};
      updates.metaData.description = req.body['metaData[description]'];
    }
    if (req.body['metaData[keywords]'] !== undefined) {
      updates.metaData = updates.metaData || {};
      updates.metaData.keywords = req.body['metaData[keywords]'];
    }

    // ✅ Handle main image update
    if (req.files && req.files.image) {
      const mainImageFile = req.files.image[0];
      const uploaded = await uploadBuffer(mainImageFile.buffer, `categories/${slug || id}`);
      updates.image = uploaded.secure_url;
    }

    // ✅ Handle Open Graph image update
    if (req.files && req.files['metaData[ogImage]']) {
      const ogImageFile = req.files['metaData[ogImage]'][0];
      const uploaded = await uploadBuffer(ogImageFile.buffer, `categories/og-images/${slug || id}`);
      updates.metaData = updates.metaData || {};
      updates.metaData.ogImage = uploaded.secure_url;
    }

    const category = await Category.findByIdAndUpdate(id, updates, { new: true });
    if (!category) return res.status(404).json({ message: 'Category not found' });
    res.json(category);
  } catch (err) {
    next(err);
  }
};

// Add new field to existing category
exports.addCustomField = async (req, res, next) => {
  try {
    const { categoryId } = req.params;
    const { name, slug, type, options, required, visibleOnProduct } = req.body;

    const category = await Category.findByIdAndUpdate(
      categoryId,
      { $push: { customFields: { name, slug, type, options, required, visibleOnProduct } } },
      { new: true }
    );

    if (!category) return res.status(404).json({ message: 'Category not found' });
    res.json(category);
  } catch (err) {
    next(err);
  }
};

// Add new variant field to existing category
exports.addVariantField = async (req, res, next) => {
  try {
    const { categoryId } = req.params;
    const { name, slug, type, options, required, unit, order } = req.body;

    const category = await Category.findByIdAndUpdate(
      categoryId,
      { $push: { variantFields: { name, slug, type, options, required, unit, order } } },
      { new: true }
    );

    if (!category) return res.status(404).json({ message: 'Category not found' });
    res.json(category);
  } catch (err) {
    next(err);
  }
};

// Delete category
exports.deleteCategory = async (req, res, next) => {
  try {
    const { id } = req.params;
    const deleted = await Category.findByIdAndDelete(id);
    if (!deleted) return res.status(404).json({ message: 'Category not found' });
    res.json({ message: 'Category deleted' });
  } catch (err) {
    next(err);
  }
};
