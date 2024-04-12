import multer from 'multer';
import path from 'path';
import { v4 as uuidv4 } from 'uuid';
import AyurvedicProduct from "../models/productModel.js";

// Multer storage configuration
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'public/item'); // Specify the destination folder
    },
    filename: function(req, file, cb) {   
        cb(null, uuidv4() + '-' + Date.now() + path.extname(file.originalname));
    }
});

const fileFilter = (req, file, cb) => {
    const allowedFileTypes = ['image/jpeg', 'image/jpg', 'image/png'];
    if(allowedFileTypes.includes(file.mimetype)) {
        cb(null, true);
    } else {
        cb(null, false);
    }
}


// Multer upload instance
const upload = multer({
    storage: storage,
    fileFilter: fileFilter
}).array('images');

// Route handler to create a new Ayurvedic product with image upload
export const createAyurvedicProduct = async (req, res) => {
    try {
        // Use `upload.array('images')` middleware to handle file uploads
        upload(req, res, async (err) => {
            if (err instanceof multer.MulterError) {
                // Multer error handling
                return res.status(400).json({ message: 'Error uploading files', error: err });
            } else if (err) {
                // Other errors
                return res.status(500).json({ message: 'Error uploading files', error: err });
            }

            // Extract uploaded file paths
            const imagePaths = req.files.map(file => '/public/item/' + file.filename);

            // Validate request body fields
            const { productItemID, itemNameEn, itemNameSi, price, descriptionEn, descriptionSi, quantity, categoryEn,categorySi } = req.body;
            if (!productItemID || !itemNameEn || !itemNameSi || !price || !descriptionEn || !descriptionSi || !quantity || !categoryEn|| !categorySi) {
                return res.status(400).json({ message: 'Please send all required fields' });
            }

            // Create new Ayurvedic product
            const newAyurvedicProduct = {
                productItemID,
                itemName: { en: itemNameEn, si: itemNameSi },
                price,
                description: { en: descriptionEn, si: descriptionSi },
                quantity,
                category: { en: categoryEn, si: categorySi },
                images: imagePaths // Store image paths in the product object
            };

            // Save product to database
            const ayurvedicProduct = await AyurvedicProduct.create(newAyurvedicProduct);

            // Return success response
            
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
  
      // Use `upload` middleware to handle file uploads
      upload(req, res, async (err) => {
        if (err instanceof multer.MulterError) {
          return res.status(400).json({ message: 'Error uploading files', error: err });
        } else if (err) {
          return res.status(500).json({ message: 'Error uploading files', error: err });
        }
  
        // Retrieve existing product from database
        const existingProduct = await AyurvedicProduct.findById(id);
  
        if (!existingProduct) {
          return res.status(404).json({ message: 'Ayurvedic product not found' });
        }
  
        // Update product fields
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
  
        // Handle updated images
        if (req.files && req.files.length > 0) {
            // Map uploaded files to new image paths
            const newImagePaths = req.files.map((file) => `/public/item/${file.filename}`);
      
            // Replace existing images or update specific image based on request
            const updatedImageIndex = req.body.updatedImageIndex;
            if (updatedImageIndex !== undefined && updatedImageIndex !== null && updatedImageIndex >= 0) {
              // Replace the image at the specified index
              if (updatedImageIndex < existingProduct.images.length) {
                existingProduct.images[updatedImageIndex] = newImagePaths[0];
              }
            } else {
              // Append new image paths to existing images
              existingProduct.images = newImagePaths;
            }
          }
  
        // Save updated product to database
        const updatedProduct = await existingProduct.save();
  
        // Respond with updated product
        res.status(200).json({ message: 'Ayurvedic product updated successfully', updatedProduct });
      });
    } catch (error) {
      console.error('Error updating product:', error);
      res.status(500).json({ message: 'Internal server error', error: error.message });
    }
  };

// Get all Ayurvedic products
// export const getAllAyurvedicProducts = async (request, response) => {
//     //let userId = request.params.userId; // Assuming your route has a parameter named 'userId'
//     try {
//         //const ayurvedicProducts = await AyurvedicProduct.find({ user: userId });
//         const ayurvedicProducts = await AyurvedicProduct.find();
//         return response.status(200).json({
//             count: ayurvedicProducts.length,
//             data: ayurvedicProducts
//         });
//     } catch (error) {
//         console.log(error.message);
//         response.status(500).send({ message: error.message });
//     }
// };

// Update an Ayurvedic product by ID


export const getAllAyurvedicProducts = async (req, res) => {
    try {
        // Fetch all Ayurvedic products from the database
        const ayurvedicProducts = await AyurvedicProduct.find();

        // Modify each product to include full image paths
        const productsWithImages = ayurvedicProducts.map(product => {
            // Map each image filename to its full URL path
            const imagePaths = product.images.map(filename => filename.slice(1));
            
            // Return product object with updated image paths
            return {
                ...product.toObject(),
                images: imagePaths
            };
        });

        // Return the modified products with image paths
        return res.status(200).json({
            count: productsWithImages.length,
            data: productsWithImages
        });
    } catch (error) {
        console.error(error.message);
        res.status(500).json({ message: 'Internal server error', error: error.message });
    }
};









// Get an Ayurvedic product by ID
// export const getAyurvedicProductById = async (request, response) => {
//     try {
//         const { id } = request.params;
//         const ayurvedicProduct = await AyurvedicProduct.findById(id);
//         return response.status(200).json(ayurvedicProduct);
//     } catch (error) {
//         console.log(error.message);
//         response.status(500).send({ message: error.message });
//     }
// };
export const getAyurvedicProductById = async (request, response) => {
    try {
      const { id } = request.params; // Extract the 'id' parameter from request parameters
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

// Get Ayurvedic products by category
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

// Uncomment and modify the updateAyurvedicProduct function if you plan to use image updates

//Delete an Ayurvedic product by ID
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

        // Extract relevant details
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


// export const getAllEnglishProducts = async (request, response) => {
//     try {
//         // Retrieve all products from the database
//         const allProducts = await AyurvedicProduct.find();

//         // Modify each product to include full image URLs
//         const englishProducts = allProducts.map(product => {
//             // Map each image filename to its full URL path (assuming images are stored in a specific directory)
//             const imagePaths = product.images.map(filename => filename.slice(1));

//             // Ensure product has itemName, description, and category with 'en' property
//             const itemNameEn = product.itemName && product.itemName.en ? product.itemName.en : '';
//             const descriptionEn = product.description && product.description.en ? product.description.en : '';
//             const categoryEn = product.category && product.category.en ? product.category.en : '';

//             // Return product object with updated image paths and other details
//             return {
//                 productItemID: product.productItemID,
//                 itemName: itemNameEn,
//                 price: product.price,
//                 description: descriptionEn,
//                 quantity: product.quantity,
//                 category: categoryEn,
//                 images: imagePaths
//             };
//         });

//         // Return the modified products with full image URLs
//         return response.status(200).json(englishProducts);
//     } catch (error) {
//         console.error('Error fetching English products:', error);
//         return response.status(500).json({ message: 'Internal server error' });
//     }
// };










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
                                                        .select({ "itemName.en": 1, "description.en": 1, "category.en": 1, "price": 1, "quantity": 1 ,"images":1}) // Projection to select only specific fields in Sinhala
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




// export const createAyurvedicProduct2 = async (request, response) => {
//     try {
//         // Check if all required fields are present in the request body
//         const requiredFields = ['productItemID', 'itemName', 'price',  'description', 'quantity',  'category', 'images'];
//         const missingFields = requiredFields.filter(field => !request.body[field]);
//         if (missingFields.length > 0) {
//             return response.status(400).send({
//                 message: `Please provide all required fields: ${missingFields.join(', ')}`
//             });
//         }
        
//         // Create a new Ayurvedic product object
//         const newAyurvedicProduct = {
//             productItemID: request.body.productItemID,
//             itemName: request.body.itemName,
//             price: request.body.price,
//             description: request.body.description,
//             quantity: request.body.quantity,
//             category: request.body.category,
//             images: request.body.images // Include the images array from the request body
//         };

//         // Create the Ayurvedic product in the database
//         const ayurvedicProduct = await AyurvedicProduct.create(newAyurvedicProduct);

//         // Respond with the created Ayurvedic product
//         return response.status(201).send(ayurvedicProduct);
//     } catch (error) {
//         console.error('Error creating Ayurvedic product:', error);
//         response.status(500).send({ message: 'Internal server error' });
//     }
// };









