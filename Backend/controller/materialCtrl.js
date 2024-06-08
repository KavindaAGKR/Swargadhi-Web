import multer from 'multer';
import upload from '../middleWare/fileUpload.js';
import Material from '../models/materialModel.js';

export const createMaterial = async (req, res) => {
    try {
        upload(req, res, async (err) => {
            if (err instanceof multer.MulterError) {
                return res.status(400).json({ message: 'Error uploading files', error: err });
            } else if (err) {
                return res.status(500).json({ message: 'Error uploading files', error: err });
            }
            const imagePaths = req.files.map(file => '/public/item/' + file.filename);
            const { materialName, price, description, quantity, givenBy } = req.body;
            if (!materialName || !price || !quantity || !givenBy) { // No need to check for description as it's optional
                return res.status(400).json({ message: 'Please send all required fields' });
            }
            const newMaterial = {
                materialName,
                price,
                description,
                quantity,
                givenBy,
                images: imagePaths 
            };
            const material = await Material.create(newMaterial);
            return res.status(201).json(material);
        });
    } catch (error) {
        console.error(error.message);
        res.status(500).json({ message: 'Internal server error', error: error.message });
    }
};


// Get all materials
export const getAllMaterials = async (request, response) => {
    try {
        const materials = await Material.find().populate('givenBy', 'firstName lastName mobileNumber deliveryAddress');
        return response.status(200).json({
            count: materials.length,
            data: materials
        });
    } catch (error) {
        console.error(error);
        response.status(500).json({ message: 'Internal Server Error' });
    }
};

// Get a material by ID
export const getMaterialById = async (request, response) => {
    try {
        const { id } = request.params;
        const material = await Material.findById(id);
        return response.status(200).json(material);
    } catch (error) {
        console.error(error);
        response.status(500).json({ message: 'Internal Server Error' });
    }
};

// Update a material by ID
export const updateMaterial = async (request, response) => {
    try {
        const { id } = request.params;
        const { UserName, MaterialName, quantity, userContactNumber } = request.body;

        const material = await Material.findById(id);

        if (!material) {
            return response.status(404).json({ message: 'Material not found' });
        }

        material.UserName = UserName || material.UserName;
        material.MaterialName = MaterialName || material.MaterialName;
        material.quantity = quantity || material.quantity;
        material.userContactNumber = userContactNumber || material.userContactNumber;

        await material.save();

        return response.status(200).json({ message: 'Material updated successfully', material });
    } catch (error) {
        console.error(error);
        response.status(500).json({ message: 'Internal Server Error' });
    }
};

// Delete a material by ID
export const deleteMaterial = async (request, response) => {
    try {
        const { id } = request.params;
        const isMaterialDeleted = await Material.findByIdAndDelete(id);

        if (!isMaterialDeleted) {
            return response.status(404).json({ message: 'Material not found' });
        }

        return response.status(200).json({ message: 'Material deleted successfully' });
    } catch (error) {
        console.error(error);
        response.status(500).json({ message: 'Internal Server Error' });
    }
};
