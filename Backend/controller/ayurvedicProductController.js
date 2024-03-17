import AyurvedicProduct from "../models/productModel.js";

// Create a new Ayurvedic product
export const createAyurvedicProduct = async (request, response) => {
    try {
        if (
            !request.body.productItemID ||
            !request.body.itemName ||
            !request.body.price ||
            !request.body.description ||
            !request.body.quantity ||
            !request.body.category
        ) {
            return response.status(400).send({
                message: 'Please send all required fields'
            });
        }

        const newAyurvedicProduct = {
            productItemID: request.body.productItemID,
            itemName: request.body.itemName,
            price: request.body.price,
            description: request.body.description,
            quantity: request.body.quantity,
            category: request.body.category
        };

        const ayurvedicProduct = await AyurvedicProduct.create(newAyurvedicProduct);

        return response.status(201).send(ayurvedicProduct);
    } catch (error) {
        console.log(error.message);
        response.status(500).send({ message: error.message });
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
export const getAllAyurvedicProducts = async (request, response) => {
    //let userId = request.params.userId; // Assuming your route has a parameter named 'userId'
    try {
        //const ayurvedicProducts = await AyurvedicProduct.find({ user: userId });
        const ayurvedicProducts = await AyurvedicProduct.find();
        return response.status(200).json({
            count: ayurvedicProducts.length,
            data: ayurvedicProducts
        });
    } catch (error) {
        console.log(error.message);
        response.status(500).send({ message: error.message });
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

// Delete an Ayurvedic product by ID
export const deleteAyurvedicProduct = async (request, response) => {
    try {
        const { id } = request.params;
        const isAyurvedicProduct = await AyurvedicProduct.findByIdAndDelete(id);

        if (!isAyurvedicProduct) {
            return response.status(404).json({ message: "Not found" });
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