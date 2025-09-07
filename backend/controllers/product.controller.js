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
        console.log('Request headers:', req.headers);
        console.log('Content-Type:', req.get('Content-Type'));
        
        const {
            categoryId,
            name,
            slug,
            basePrice,
            mrp,
            discount,
            description,
            variants,
            variantOptions,
            hasVariants
        } = req.body;
        
        console.log('Extracted values:', { mrp, discount, basePrice });

        // Handle metadata - support both nested object and flat fields
        let metaData = {};
        
        // ✅ Handle nested metaData object (from admin panel)
        if (req.body.metaData && typeof req.body.metaData === 'object') {
            console.log('Processing nested metaData object from admin panel');
            
            if (req.body.metaData.title !== undefined) {
                metaData.title = req.body.metaData.title || '';
            }
            if (req.body.metaData.description !== undefined) {
                metaData.description = req.body.metaData.description || '';
            }
            if (req.body.metaData.keywords !== undefined) {
                // Convert keywords string to array if it's not empty
                const keywordsString = req.body.metaData.keywords || '';
                if (keywordsString && keywordsString.trim()) {
                    metaData.keywords = keywordsString.split(',').map(k => k.trim()).filter(k => k);
                } else {
                    metaData.keywords = [];
                }
            }
            if (req.body.metaData.ogImage !== undefined) {
                metaData.ogImage = req.body.metaData.ogImage || '';
            }
        } else {
            // ✅ Handle FormData fields for metaData (fallback for Postman)
            console.log('Processing flat metaData fields (Postman format)');
            console.log('MetaData fields:');
            console.log('- metaData[title]:', req.body['metaData[title]']);
            console.log('- metaData[description]:', req.body['metaData[description]']);
            console.log('- metaData[keywords]:', req.body['metaData[keywords]']);
            
            if (req.body['metaData[title]'] !== undefined) metaData.title = req.body['metaData[title]'] || '';
            if (req.body['metaData[description]'] !== undefined) metaData.description = req.body['metaData[description]'] || '';
            if (req.body['metaData[keywords]'] !== undefined) {
                // Convert keywords string to array
                const keywordsString = req.body['metaData[keywords]'] || '';
                if (keywordsString && keywordsString.trim()) {
                    metaData.keywords = keywordsString.split(',').map(k => k.trim()).filter(k => k);
                } else {
                    metaData.keywords = [];
                }
            }
        }
        
        console.log('Processed metaData:', metaData);
        const parsedVariants = typeof variants === 'string' ? JSON.parse(variants) : variants;
        const parsedVariantOptions = variantOptions ? (typeof variantOptions === 'string' ? JSON.parse(variantOptions) : variantOptions) : {};

        const dynamicFieldsRaw = req.body.dynamicFields ? (typeof req.body.dynamicFields === 'string' ? JSON.parse(req.body.dynamicFields) : req.body.dynamicFields) : {};
        const dynamicFields = await pickDynamicFields(categoryId, dynamicFieldsRaw);

        const mainImages = [];
        console.log('=== IMAGE PROCESSING DEBUG ===');
        console.log('req.files:', req.files);
        console.log('req.files type:', typeof req.files);
        console.log('req.files.images:', req.files?.images);
        
        if (req.files && req.files.images) {
            console.log('Processing images:', req.files.images);
            console.log('Images array length:', req.files.images.length);
            for (const file of req.files.images) {
                console.log('Processing file:', file.originalname, file.mimetype, file.size);
                const uploaded = await uploadBuffer(file.buffer, `products/${slug || name}`);
                console.log('Uploaded to Cloudinary:', uploaded.secure_url);
                mainImages.push(uploaded.secure_url);
            }
        } else {
            console.log('No images found in req.files');
            console.log('Available files keys:', Object.keys(req.files || {}));
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
            metaData,
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
        
        // Handle metadata - support both nested object and flat fields
        if (req.body.metaData && typeof req.body.metaData === 'object') {
            console.log('Processing nested metaData object from admin panel');
            updates.metaData = {};
            
            if (req.body.metaData.title !== undefined) {
                updates.metaData.title = req.body.metaData.title || '';
            }
            if (req.body.metaData.description !== undefined) {
                updates.metaData.description = req.body.metaData.description || '';
            }
            if (req.body.metaData.keywords !== undefined) {
                // Convert keywords string to array if it's not empty
                const keywordsString = req.body.metaData.keywords || '';
                if (keywordsString && keywordsString.trim()) {
                    updates.metaData.keywords = keywordsString.split(',').map(k => k.trim()).filter(k => k);
                } else {
                    updates.metaData.keywords = [];
                }
            }
            if (req.body.metaData.ogImage !== undefined) {
                updates.metaData.ogImage = req.body.metaData.ogImage || '';
            }
        } else {
            // ✅ Handle FormData fields for metaData (fallback for Postman)
            console.log('Processing flat metaData fields (Postman format)');
            if (req.body['metaData[title]'] !== undefined) {
                updates.metaData = updates.metaData || {};
                updates.metaData.title = req.body['metaData[title]'] || '';
            }
            if (req.body['metaData[description]'] !== undefined) {
                updates.metaData = updates.metaData || {};
                updates.metaData.description = req.body['metaData[description]'] || '';
            }
            if (req.body['metaData[keywords]'] !== undefined) {
                updates.metaData = updates.metaData || {};
                // Convert keywords string to array
                const keywordsString = req.body['metaData[keywords]'] || '';
                if (keywordsString && keywordsString.trim()) {
                    updates.metaData.keywords = keywordsString.split(',').map(k => k.trim()).filter(k => k);
                } else {
                    updates.metaData.keywords = [];
                }
            }
        }
        
        console.log('Processed updates.metaData:', updates.metaData);
        
        // ✅ Handle Open Graph image update
        if (req.files && req.files['metaData[ogImage]']) {
            const ogImageFile = req.files['metaData[ogImage]'][0];
            const uploaded = await uploadBuffer(ogImageFile.buffer, `products/og-images/${slug || id}`);
            updates.metaData = updates.metaData || {};
            updates.metaData.ogImage = uploaded.secure_url;
        }
        if (variants) updates.variants = typeof variants === 'string' ? JSON.parse(variants) : variants;
        if (variantOptions) updates.variantOptions = typeof variantOptions === 'string' ? JSON.parse(variantOptions) : variantOptions;
        if (hasVariants !== undefined) updates.hasVariants = hasVariants;

        if (req.body.dynamicFields) {
            const dynamicFieldsRaw = typeof req.body.dynamicFields === 'string' ? JSON.parse(req.body.dynamicFields) : req.body.dynamicFields;
            updates.dynamicFields = await pickDynamicFields(categoryId, dynamicFieldsRaw);
        }

        console.log('=== UPDATE PRODUCT IMAGE DEBUG ===');
        console.log('req.files:', req.files);
        console.log('req.files.images:', req.files?.images);
        
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
        const { 
            categorySlug, 
            categoryId, 
            featured, 
            limit,
            sort,
            // Advanced filtering parameters
            priceRange,
            brands,
            ratings,
            availability,
            // Dynamic filters from category custom fields
            material,
            style,
            color,
            // Variant filters
            ...variantFilters
        } = req.query;
        
        const filter = {};
        
        // Basic category filtering
        if (categoryId) filter.categoryId = categoryId;
        if (categorySlug) {
            const category = await Category.findOne({ slug: categorySlug });
            if (category) filter.categoryId = category._id;
        }
        
        // Price range filtering
        if (priceRange) {
            try {
                const { min, max } = JSON.parse(priceRange);
                if (min !== undefined && max !== undefined && !isNaN(parseFloat(min)) && !isNaN(parseFloat(max))) {
                    filter.basePrice = { $gte: parseFloat(min), $lte: parseFloat(max) };
                }
            } catch (e) {
                console.warn('Invalid price range format:', priceRange, e.message);
            }
        }
        
        // Brand filtering
        if (brands) {
            try {
                const brandArray = JSON.parse(brands);
                if (Array.isArray(brandArray) && brandArray.length > 0) {
                    const dynamicFieldFilter = { 'dynamicFields.brand': { $in: brandArray } };
                    const variantFieldFilter = { 'variants.fields.brand': { $in: brandArray } };
                    
                    if (!filter.$or) {
                        filter.$or = [];
                    }
                    filter.$or.push(dynamicFieldFilter);
                    filter.$or.push(variantFieldFilter);
                }
            } catch (e) {
                console.warn('Invalid brands format:', brands, e.message);
            }
        }
        
        // Rating filtering (if ratings are implemented)
        if (ratings) {
            try {
                const ratingArray = JSON.parse(ratings);
                if (Array.isArray(ratingArray) && ratingArray.length > 0) {
                    // This would need to be implemented based on your rating system
                    // filter.rating = { $in: ratingArray };
                }
            } catch (e) {
                console.warn('Invalid ratings format:', ratings);
            }
        }
        
        // Availability filtering
        if (availability) {
            try {
                const availabilityArray = JSON.parse(availability);
                if (Array.isArray(availabilityArray) && availabilityArray.length > 0) {
                    // For now, we'll skip availability filtering until stock system is implemented
                    console.log('Availability filtering requested:', availabilityArray);
                    // TODO: Implement proper stock-based availability filtering
                }
            } catch (e) {
                console.warn('Invalid availability format:', availability);
            }
        }
        
        // Dynamic filters from category custom fields
        if (material) {
            try {
                const materialArray = JSON.parse(material);
                if (Array.isArray(materialArray) && materialArray.length > 0) {
                    const dynamicFieldFilter = { 'dynamicFields.material': { $in: materialArray } };
                    const variantFieldFilter = { 'variants.fields.material': { $in: materialArray } };
                    
                    if (!filter.$or) {
                        filter.$or = [];
                    }
                    filter.$or.push(dynamicFieldFilter);
                    filter.$or.push(variantFieldFilter);
                }
            } catch (e) {
                console.warn('Invalid material format:', material, e.message);
            }
        }
        
        if (style) {
            try {
                const styleArray = JSON.parse(style);
                if (Array.isArray(styleArray) && styleArray.length > 0) {
                    const dynamicFieldFilter = { 'dynamicFields.style': { $in: styleArray } };
                    const variantFieldFilter = { 'variants.fields.style': { $in: styleArray } };
                    
                    if (!filter.$or) {
                        filter.$or = [];
                    }
                    filter.$or.push(dynamicFieldFilter);
                    filter.$or.push(variantFieldFilter);
                }
            } catch (e) {
                console.warn('Invalid style format:', style, e.message);
            }
        }
        
        if (color) {
            try {
                const colorArray = JSON.parse(color);
                if (Array.isArray(colorArray) && colorArray.length > 0) {
                    const dynamicFieldFilter = { 'dynamicFields.color': { $in: colorArray } };
                    const variantFieldFilter = { 'variants.fields.color': { $in: colorArray } };
                    
                    if (!filter.$or) {
                        filter.$or = [];
                    }
                    filter.$or.push(dynamicFieldFilter);
                    filter.$or.push(variantFieldFilter);
                }
            } catch (e) {
                console.warn('Invalid color format:', color, e.message);
            }
        }
        
        // Handle other dynamic filters
        Object.keys(variantFilters).forEach(key => {
            try {
                const value = JSON.parse(variantFilters[key]);
                if (Array.isArray(value) && value.length > 0) {
                    // Check both dynamicFields and variants.fields for the filter
                    const dynamicFieldFilter = { [`dynamicFields.${key}`]: { $in: value } };
                    const variantFieldFilter = { [`variants.fields.${key}`]: { $in: value } };
                    
                    // Use $or to match either dynamicFields or variants.fields
                    if (!filter.$or) {
                        filter.$or = [];
                    }
                    filter.$or.push(dynamicFieldFilter);
                    filter.$or.push(variantFieldFilter);
                }
            } catch (e) {
                console.warn(`Invalid ${key} format:`, variantFilters[key]);
            }
        });
        
        console.log('=== PRODUCT FILTER DEBUG ===');
        console.log('Query parameters:', req.query);
        console.log('Applied filter:', JSON.stringify(filter, null, 2));
        console.log('Filter $or conditions:', filter.$or ? filter.$or.length : 0);
        
        // Build query
        let query = Product.find(filter);
        
        // Apply sorting
        if (sort) {
            switch (sort) {
                case 'price-low':
                    query = query.sort({ basePrice: 1 });
                    break;
                case 'price-high':
                    query = query.sort({ basePrice: -1 });
                    break;
                case 'newest':
                    query = query.sort({ createdAt: -1 });
                    break;
                case 'oldest':
                    query = query.sort({ createdAt: 1 });
                    break;
                case 'name-asc':
                    query = query.sort({ name: 1 });
                    break;
                case 'name-desc':
                    query = query.sort({ name: -1 });
                    break;
                default:
                    query = query.sort({ createdAt: -1 });
            }
        } else {
            query = query.sort({ createdAt: -1 });
        }
        
        // Apply limit if specified
        if (limit && !isNaN(parseInt(limit))) {
            query = query.limit(parseInt(limit));
        }
        
        console.log('Final query:', query.getQuery());
        
        const products = await query.exec();
        console.log(`Found ${products.length} products matching filters`);
        
        res.json(products);
    } catch (err) {
        console.error('Error in getProducts:', err);
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
