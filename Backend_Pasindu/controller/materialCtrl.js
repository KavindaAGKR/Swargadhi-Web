import Material from "../models/materialModel.js";

// Create a new material
export const createMaterial = async (request, response) => {
    try {
        const { UserName, MaterialName, quantity, userContactNumber } = request.body;

        if (!UserName || !MaterialName || !quantity || !userContactNumber) {
            return response.status(400).json({
                message: 'Please provide all required fields'
            });
        }

        const newMaterial = await Material.create({
            UserName,
            MaterialName,
            quantity,
            userContactNumber,
        });

        return response.status(201).json(newMaterial);
    } catch (error) {
        console.error(error);
        response.status(500).json({ message: 'Internal Server Error' });
    }
};

// Get all materials
export const getAllMaterials = async (request, response) => {
    try {
        const materials = await Material.find();
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
