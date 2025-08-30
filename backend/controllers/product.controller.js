const Product = require('../models/Product');
const Category = require('../models/Category');
const { uploadBuffer } = require('../utils/cloudinary');

// Helper to ensure only fields defined for category are accepted
async function pickDynamicFields(categoryId, incomingFields) {
    const category = await Category.findById(categoryId);
    if (!category) throw new Error('Invalid category');
    const allowedSlugs = new Set((category.customFields || []).map((f) => f.slug));
    const picked = {};
    Object.entries(incomingFields || {}).forEach(([key, value]) => {
        if (allowedSlugs.has(key)) picked[key] = value;
    });
    return picked;
}

// Create product
exports.createProduct = async (req, res, next) => {
    try {
        console.log('=== CREATE PRODUCT DEBUG ===');
        console.log('Files received:', req.files);
        console.log('Body received:', req.body);
        
        const {
            categoryId,
            name,
            slug,
            basePrice,
            mrp,
            discount,
            description,
            metaData,
            variants,
            variantOptions,
            hasVariants
        } = req.body;
        
        console.log('Extracted values:', { mrp, discount, basePrice });

        const parsedMeta = typeof metaData === 'string' ? JSON.parse(metaData) : metaData;
        const parsedVariants = typeof variants === 'string' ? JSON.parse(variants) : variants;
        const parsedVariantOptions = variantOptions ? (typeof variantOptions === 'string' ? JSON.parse(variantOptions) : variantOptions) : {};

        const dynamicFieldsRaw = req.body.dynamicFields ? (typeof req.body.dynamicFields === 'string' ? JSON.parse(req.body.dynamicFields) : req.body.dynamicFields) : {};
        const dynamicFields = await pickDynamicFields(categoryId, dynamicFieldsRaw);

        const mainImages = [];
        if (req.files && req.files.images) {
            console.log('Processing images:', req.files.images);
            for (const file of req.files.images) {
                console.log('Processing file:', file.originalname, file.mimetype, file.size);
                const uploaded = await uploadBuffer(file.buffer, `products/${slug || name}`);
                console.log('Uploaded to Cloudinary:', uploaded.secure_url);
                mainImages.push(uploaded.secure_url);
            }
        } else {
            console.log('No images found in req.files');
        }
        
        console.log('Final mainImages array:', mainImages);

        // Process variants if they exist
        let processedVariants = [];
        if (hasVariants && parsedVariants && Array.isArray(parsedVariants)) {
            for (const variant of parsedVariants) {
                // Generate SKU for each variant
                const variantWithSKU = { ...variant };

                // Handle variant-specific images if any
                if (variant.images && Array.isArray(variant.images)) {
                    variantWithSKU.images = variant.images;
                }

                processedVariants.push(variantWithSKU);
            }
        }

        // Validate and prepare MRP and discount values
        let mrpValue = null;
        let discountValue = null;
        
        console.log('Processing MRP:', { mrp, type: typeof mrp, isUndefined: mrp === undefined });
        console.log('Processing discount:', { discount, type: typeof discount, isUndefined: discount === undefined });
        
        if (mrp !== undefined && mrp !== '' && mrp !== null) {
            mrpValue = parseFloat(mrp);
            if (isNaN(mrpValue)) {
                return res.status(400).json({ message: 'Invalid MRP value' });
            }
        }
        
        if (discount !== undefined && discount !== '' && discount !== null) {
            discountValue = parseFloat(discount);
            if (isNaN(discountValue)) {
                return res.status(400).json({ message: 'Invalid discount value' });
            }
            if (discountValue < 0 || discountValue > 100) {
                return res.status(400).json({ message: 'Discount must be between 0 and 100' });
            }
        }
        
        console.log('Final values:', { mrpValue, discountValue });
        
        const product = await Product.create({
            categoryId,
            name,
            slug,
            basePrice,
            mrp: mrpValue,
            discount: discountValue,
            description,
            mainImages,
            dynamicFields,
            variantOptions: parsedVariantOptions,
            metaData: parsedMeta,
            hasVariants: hasVariants || false,
            variants: processedVariants
        });
        
        console.log('Product created successfully:', { 
            id: product._id, 
            name: product.name, 
            mrp: product.mrp, 
            discount: product.discount 
        });

        // Generate SKUs for variants after product creation
        if (hasVariants && processedVariants.length > 0) {
            for (let i = 0; i < processedVariants.length; i++) {
                processedVariants[i].sku = product.generateVariantSKU(processedVariants[i]);
            }
            product.variants = processedVariants;
            await product.save();
        }

        res.status(201).json(product);
    } catch (err) {
        next(err);
    }
};

// Update product
exports.updateProduct = async (req, res, next) => {
    try {
        const { id } = req.params;
        const {
            categoryId,
            name,
            slug,
            basePrice,
            mrp,
            discount,
            description,
            metaData,
            variants,
            variantOptions,
            hasVariants
        } = req.body;

        const updates = { categoryId, name, slug, basePrice, description };
        
        // Validate and prepare MRP and discount values
        if (mrp !== undefined) {
            if (mrp === '' || mrp === null) {
                updates.mrp = null;
            } else {
                const mrpValue = parseFloat(mrp);
                if (isNaN(mrpValue)) {
                    return res.status(400).json({ message: 'Invalid MRP value' });
                }
                updates.mrp = mrpValue;
            }
        }
        
        if (discount !== undefined) {
            if (discount === '' || discount === null) {
                updates.discount = null;
            } else {
                const discountValue = parseFloat(discount);
                if (isNaN(discountValue)) {
                    return res.status(400).json({ message: 'Invalid discount value' });
                }
                if (discountValue < 0 || discountValue > 100) {
                    return res.status(400).json({ message: 'Discount must be between 0 and 100' });
                }
                updates.discount = discountValue;
            }
        }
        
        // Add debug logging
        console.log('=== UPDATE PRODUCT DEBUG ===');
        console.log('Request body:', req.body);
        console.log('Extracted values:', { mrp, discount });
        console.log('Updates object:', updates);
        if (metaData) updates.metaData = typeof metaData === 'string' ? JSON.parse(metaData) : metaData;
        if (variants) updates.variants = typeof variants === 'string' ? JSON.parse(variants) : variants;
        if (variantOptions) updates.variantOptions = typeof variantOptions === 'string' ? JSON.parse(variantOptions) : variantOptions;
        if (hasVariants !== undefined) updates.hasVariants = hasVariants;

        if (req.body.dynamicFields) {
            const dynamicFieldsRaw = typeof req.body.dynamicFields === 'string' ? JSON.parse(req.body.dynamicFields) : req.body.dynamicFields;
            updates.dynamicFields = await pickDynamicFields(categoryId, dynamicFieldsRaw);
        }

        if (req.files && req.files.images && req.files.images.length) {
            console.log('=== UPDATE PRODUCT DEBUG ===');
            console.log('Files received:', req.files.images);
            updates.mainImages = [];
            for (const file of req.files.images) {
                console.log('Processing file:', file.originalname, file.mimetype, file.size);
                const uploaded = await uploadBuffer(file.buffer, `products/${slug || id}`);
                console.log('Uploaded to Cloudinary:', uploaded.secure_url);
                updates.mainImages.push(uploaded.secure_url);
            }
            console.log('Final mainImages array:', updates.mainImages);
        }

        const product = await Product.findByIdAndUpdate(id, updates, { new: true });
        if (!product) return res.status(404).json({ message: 'Product not found' });

        // Update SKUs for variants if they changed
        if (hasVariants && updates.variants && Array.isArray(updates.variants)) {
            for (let i = 0; i < updates.variants.length; i++) {
                updates.variants[i].sku = product.generateVariantSKU(updates.variants[i]);
            }
            product.variants = updates.variants;
            await product.save();
        }

        res.json(product);
    } catch (err) {
        next(err);
    }
};

// Get all products (optional filters)
exports.getProducts = async (req, res, next) => {
    try {
        const { categorySlug, categoryId, featured, limit } = req.query;
        const filter = {};
        
        if (categoryId) filter.categoryId = categoryId;
        if (categorySlug) {
            const category = await Category.findOne({ slug: categorySlug });
            if (category) filter.categoryId = category._id;
        }
        
        // For featured products, we'll use a simple approach
        // You can enhance this later by adding a 'featured' field to products
        let query = Product.find(filter).sort({ createdAt: -1 });
        
        // Apply limit if specified
        if (limit && !isNaN(parseInt(limit))) {
            query = query.limit(parseInt(limit));
        }
        
        const products = await query.exec();
        res.json(products);
    } catch (err) {
        next(err);
    }
};

// Get product by slug
exports.getProductBySlug = async (req, res, next) => {
    try {
        const { slug } = req.params;
        const product = await Product.findOne({ slug });
        if (!product) return res.status(404).json({ message: 'Product not found' });
        res.json(product);
    } catch (err) {
        next(err);
    }
};

// Delete product
exports.deleteProduct = async (req, res, next) => {
    try {
        const { id } = req.params;
        const deleted = await Product.findByIdAndDelete(id);
        if (!deleted) return res.status(404).json({ message: 'Product not found' });
        res.json({ message: 'Product deleted' });
    } catch (err) {
        next(err);
    }
};
