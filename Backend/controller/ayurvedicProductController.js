import AyurvedicProduct from "../models/productModel.js";
import multer from 'multer';
import path from 'path';
import { v4 as uuidv4 } from 'uuid';

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
            const { productItemID, itemNameEn, itemNameSi, price, descriptionEn, descriptionSi, quantity, category } = req.body;
            if (!productItemID || !itemNameEn || !itemNameSi || !price || !descriptionEn || !descriptionSi || !quantity || !category) {
                return res.status(400).json({ message: 'Please send all required fields' });
            }

            // Create new Ayurvedic product
            const newAyurvedicProduct = {
                productItemID,
                itemName: { en: itemNameEn, si: itemNameSi },
                price,
                description: { en: descriptionEn, si: descriptionSi },
                quantity,
                category: { en: category, si: category },
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

export const createAyurvedicProduct2 = async (request, response) => {
    try {
        // Check if all required fields are present in the request body
        const requiredFields = ['productItemID', 'itemName', 'price',  'description', 'quantity',  'category', 'images'];
        const missingFields = requiredFields.filter(field => !request.body[field]);
        if (missingFields.length > 0) {
            return response.status(400).send({
                message: `Please provide all required fields: ${missingFields.join(', ')}`
            });
        }
        
        // Create a new Ayurvedic product object
        const newAyurvedicProduct = {
            productItemID: request.body.productItemID,
            itemName: request.body.itemName,
            price: request.body.price,
            description: request.body.description,
            quantity: request.body.quantity,
            category: request.body.category,
            images: request.body.images // Include the images array from the request body
        };

        // Create the Ayurvedic product in the database
        const ayurvedicProduct = await AyurvedicProduct.create(newAyurvedicProduct);

        // Respond with the created Ayurvedic product
        return response.status(201).send(ayurvedicProduct);
    } catch (error) {
        console.error('Error creating Ayurvedic product:', error);
        response.status(500).send({ message: 'Internal server error' });
    }
};


// Update an Ayurvedic product by ID
export const updateAyurvedicProduct = async (request, response) => {
    try {
        const { id } = request.params;

        const ayurvedicProduct = await AyurvedicProduct.findById(id);

        if (!ayurvedicProduct) {
            return response.status(404).json({ message: "Ayurvedic product not found" });
        }

        ayurvedicProduct.productItemID = request.body.productItemID || ayurvedicProduct.productItemID;
        ayurvedicProduct.itemName = request.body.itemName || ayurvedicProduct.itemName;
        ayurvedicProduct.price = request.body.price || ayurvedicProduct.price;
        ayurvedicProduct.availability = request.body.availability || ayurvedicProduct.availability;
        ayurvedicProduct.description = request.body.description || ayurvedicProduct.description;
        ayurvedicProduct.quantity = request.body.quantity || ayurvedicProduct.quantity;
        ayurvedicProduct.productDetails = request.body.productDetails || ayurvedicProduct.productDetails;
        ayurvedicProduct.category = request.body.category || ayurvedicProduct.category;

        await ayurvedicProduct.save();

        return response.status(200).json({ message: "Ayurvedic product updated successfully", ayurvedicProduct });
    } catch (error) {
        console.log(error.message);
        response.status(500).json({ message: "Internal Server Error" });
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


export const getAllAyurvedicProducts = async (req, res) => {
    try {
        // Fetch all Ayurvedic products from the database
        const ayurvedicProducts = await AyurvedicProduct.find();

        // Modify each product to include full image paths
        const productsWithImages = ayurvedicProducts.map(product => {
            // Map each image filename to its full URL path
            const imagePaths = product.images.map(filename => `path.join(http://localhost:5000/public/item/', filename)`);
            
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
export const getAyurvedicProductById = async (request, response) => {
    try {
        const { id } = request.params;
        const ayurvedicProduct = await AyurvedicProduct.findById(id);
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


