import multer from 'multer';
import AyurvedicProduct from "../models/productModel.js";
import upload from '../middleWare/fileUpload.js';
export const createAyurvedicProduct = async (req, res) => {
    try {
        upload(req, res, async (err) => {
            if (err instanceof multer.MulterError) {
                return res.status(400).json({ message: 'Error uploading files', error: err });
            } else if (err) {

                return res.status(500).json({ message: 'Error uploading files', error: err });
            }
            const imagePaths = req.files.map(file => '/public/item/' + file.filename);
            const { productItemID, itemNameEn, itemNameSi, price, descriptionEn, descriptionSi, quantity, categoryEn,categorySi } = req.body;
            if (!productItemID || !itemNameEn || !itemNameSi || !price || !descriptionEn || !descriptionSi || !quantity || !categoryEn || !categorySi) {
                return res.status(400).json({ message: 'Please send all required fields' });
            }
            const newAyurvedicProduct = {
                productItemID,
                itemName: { en: itemNameEn, si: itemNameSi },
                price,
                description: { en: descriptionEn, si: descriptionSi },
                quantity,
                category: { en: categoryEn, si: categorySi },
                images: imagePaths
            };
            const ayurvedicProduct = await AyurvedicProduct.create(newAyurvedicProduct);
            
            return res.status(201).json(ayurvedicProduct);
        });
    } catch (error) {
        console.error(error.message);
        res.status(500).json({ message: 'Internal server error', error: error.message });
    }
};
export const updateAyurvedicProduct = async (req, res) => {
    try {
      const { id } = req.params;
      upload(req, res, async (err) => {
        if (err instanceof multer.MulterError) {
          return res.status(400).json({ message: 'Error uploading files', error: err });
        } else if (err) {
          return res.status(500).json({ message: 'Error uploading files', error: err });
        }
        const existingProduct = await AyurvedicProduct.findById(id);
  
        if (!existingProduct) {
          return res.status(404).json({ message: 'Ayurvedic product not found' });
        }
        existingProduct.productItemID = req.body.productItemID;
        existingProduct.price = req.body.price;
        existingProduct.quantity = req.body.quantity;
        existingProduct.itemName = {
          en: req.body.itemNameEn,
          si: req.body.itemNameSi
        };
        existingProduct.description = {
          en: req.body.descriptionEn,
          si: req.body.descriptionSi
        };
        existingProduct.category = {
          en: req.body.categoryEn,
          si: req.body.categorySi
        };

        if (req.files && req.files.length > 0) {
            const newImagePaths = req.files.map((file) => `/public/item/${file.filename}`);
            const updatedImageIndex = req.body.updatedImageIndex;
            if (updatedImageIndex !== undefined && updatedImageIndex !== null && updatedImageIndex >= 0) {
              if (updatedImageIndex < existingProduct.images.length) {
                existingProduct.images[updatedImageIndex] = newImagePaths[0];
              }
            } else {
              existingProduct.images = newImagePaths;
            }
          }
        const updatedProduct = await existingProduct.save();
        res.status(200).json({ message: 'Ayurvedic product updated successfully', updatedProduct });
      });
    } catch (error) {
      console.error('Error updating product:', error);
      res.status(500).json({ message: 'Internal server error', error: error.message });
    }
  };

export const getAllAyurvedicProducts = async (req, res) => {
    try {
        const ayurvedicProducts = await AyurvedicProduct.find();
        const productsWithImages = ayurvedicProducts.map(product => {
            const imagePaths = product.images.map(filename => filename.slice(1));
            return {
                ...product.toObject(),
                images: imagePaths
            };
        });
        return res.status(200).json({
            count: productsWithImages.length,
            data: productsWithImages
        });
    } catch (error) {
        console.error(error.message);
        res.status(500).json({ message: 'Internal server error', error: error.message });
    }
};
export const getAyurvedicProductById = async (request, response) => {
    try {
      const { id } = request.params; 
      const ayurvedicProduct = await AyurvedicProduct.findById(id);
      if (!ayurvedicProduct) {
        return response.status(404).json({ message: "Ayurvedic product not found" });
      }
      return response.status(200).json(ayurvedicProduct);
    } catch (error) {
      console.log(error.message);
      response.status(500).send({ message: error.message });
    }
  };
export const getAyurvedicProductsByCategory = async (request, response) => {
    try {
        const { category } = request.params;
        const ayurvedicProducts = await AyurvedicProduct.find({ category: category });
        return response.status(200).json({
            count: ayurvedicProducts.length,
            data: ayurvedicProducts
        });
    } catch (error) {
        console.log(error.message);
        response.status(500).send({ message: error.message });
    }
};

export const deleteAyurvedicProduct = async (request, response) => {
    try {
        const { id } = request.params;
        const isAyurvedicProduct = await AyurvedicProduct.findByIdAndDelete(id);

        if (!isAyurvedicProduct) {
            return response.status(404).json({ message: "Product not found" });
        }

        return response.status(200).json({ message: "Success" });
    } catch (error) {
        console.log(error.message);
        response.status(500).send({ message: error.message });
    }
};

export const getSinhalaPart = async (request, response) => {
    try {
        const { id } = request.params;
        const ayurvedicProduct = await AyurvedicProduct.findById(id);

        if (!ayurvedicProduct) {
            return response.status(404).json({ message: "Ayurvedic product not found" });
        }

        // Extract relevant details
        const productDetails = {
            productItemID: ayurvedicProduct.productItemID,
            itemName: 
                ayurvedicProduct.itemName.si
            ,
            price: ayurvedicProduct.price,
            description: 
              ayurvedicProduct.description.si,
          
            quantity: ayurvedicProduct.quantity,
            productDetails: ayurvedicProduct.productDetails.si,
            category: ayurvedicProduct.category.si
        };

        return response.status(200).json(productDetails);
    } catch (error) {
        console.log(error.message);
        response.status(500).send({ message: error.message });
    }
};

export const getEnglishPart = async (request, response) => {
    try {
        const { id } = request.params;
        const ayurvedicProduct = await AyurvedicProduct.findById(id);

        if (!ayurvedicProduct) {
            return response.status(404).json({ message: "Ayurvedic product not found" });
        }
        const productDetails = {
            productItemID: ayurvedicProduct.productItemID,
            itemName: 
                ayurvedicProduct.itemName.en
            ,
            price: ayurvedicProduct.price,
            description: 
              ayurvedicProduct.description.en,
          
            quantity: ayurvedicProduct.quantity,
            productDetails: ayurvedicProduct.productDetails.en,
            category: ayurvedicProduct.category.en
        };

        return response.status(200).json(productDetails);
    } catch (error) {
        console.log(error.message);
        response.status(500).send({ message: error.message });
    }
};

export const getAllSinhalaProducts = async (request, response) => {
    try {
        // Retrieve all products from the database
        const allProducts = await AyurvedicProduct.find();

        // Map each product to extract Sinhala details and construct response format
        const sinhalaProducts = allProducts.map(product => ({
            productItemID: product.productItemID,
            itemName: product.itemName.si,
            price: product.price,
            description: product.description.si,
            quantity: product.quantity,
            productDetails: product.productDetails.si,
            category: product.category.si,
            imageUrl: product.images && product.images.length > 0 ? product.images[0] : null // Assuming imageUrl is the first element of images array
        }));

        // Respond with the array of products containing Sinhala details
        return response.status(200).json(sinhalaProducts);
    } catch (error) {
        console.error('Error fetching Sinhala products:', error);
        return response.status(500).json({ message: 'Internal server error' });
    }
};

export const getAllEnglishProducts = async (request, response) => {
    try {
        // Retrieve all products from the database
        const allProducts = await AyurvedicProduct.find();

        // Map each product to extract English details and construct response format
        const englishProducts = allProducts.map(product => {
            // Ensure product has itemName, description, and category with 'en' property
            const itemNameEn = product.itemName && product.itemName.en ? product.itemName.en : '';
            const descriptionEn = product.description && product.description.en ? product.description.en : '';
            const categoryEn = product.category && product.category.en ? product.category.en : '';
            const imageUrls = product.images || []; 
            return {
                productItemID: product.productItemID,
                itemName: itemNameEn,
                price: product.price,
                description: descriptionEn,
                quantity: product.quantity,
                category: categoryEn,
                imageUrl: imageUrls
            };
        });
        return response.status(200).json(englishProducts);
    } catch (error) {
        console.error('Error fetching English products:', error);
        return response.status(500).json({ message: 'Internal server error' });
    }
};

export const getSinhalaAyurvedicProductsByCategory = async (request, response) => {
    try {
        const { category } = request.params;
        const ayurvedicProducts = await AyurvedicProduct.find({ "category.si": category })
                                                        .select({ "itemName.si": 1, "description.si": 1, "category.si": 1, "price": 1, "quantity": 1 ,"images":1}) // Projection to select only specific fields in Sinhala
                                                        .lean(); // Convert Mongoose documents to plain JavaScript objects
        return response.status(200).json({
            count: ayurvedicProducts.length,
            data: ayurvedicProducts
        });
    } catch (error) {
        console.log(error.message);
        response.status(500).send({ message: error.message });
    }
};
export const getEnglishAyurvedicProductsByCategory = async (request, response) => {
    try {
        const { category } = request.params;
        const ayurvedicProducts = await AyurvedicProduct.find({ "category.en": category })
            .select({ 
                "itemName.en": 1,
                "description.en": 1,
                "category.en": 1,
                "price": 1,
                "quantity": 1,
                "images": 1
            })
            .lean(); 
        const formattedProducts = ayurvedicProducts.map(product => ({
            productItemID: product._id, 
            itemName: product.itemName.en,
            price: product.price,
            description: product.description.en,
            quantity: product.quantity,
            category: product.category.en,
            imageUrl: product.images || [] 
        }));
        return response.status(200).json({
            count: formattedProducts.length,
            data: formattedProducts
        });
    } catch (error) {
        console.error('Error fetching English products by category:', error);
        return response.status(500).json({ message: 'Internal server error' });
    }
};

export const searchAyurvedicProducts = async (req, res) => {
    try {
        const { query } = req.query;

        if (!query) {
            return res.status(400).json({ message: 'Search query is required' });
        }

        const searchCriteria = {
            $or: [
                { 'itemName.en': { $regex: query, $options: 'i' } },
                { 'itemName.si': { $regex: query, $options: 'i' } },
                { 'description.en': { $regex: query, $options: 'i' } },
                { 'description.si': { $regex: query, $options: 'i' } },
                { 'category.en': { $regex: query, $options: 'i' } },
                { 'category.si': { $regex: query, $options: 'i' } }
            ]
        };
        const ayurvedicProducts = await AyurvedicProduct.find(searchCriteria);
            return res.status(200).json({
            count: ayurvedicProducts.length,
            data: ayurvedicProducts
        });
    } catch (error) {
        console.error('Error searching products:', error);
        res.status(500).json({ message: 'Internal server error', error: error.message });
    }
};
