import multer from 'multer';
import path from 'path';
import { v4 as uuidv4 } from 'uuid';
import AyurvedicDoctor from "../models/doctorModel.js";

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
// Route handler to create a new Ayurvedic doctor with image upload
export const createAyurvedicDoctor = async (req, res) => {
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
            const { doctorID, nameEn, nameSi, descriptionEn, descriptionSi, time } = req.body;
            if (!doctorID || !nameEn || !nameSi || !descriptionEn || !descriptionSi || !time) {
                return res.status(400).json({ message: 'Please send all required fields' });
            }

            // Create new Ayurvedic doctor
            const newAyurvedicDoctor = {
                doctorID,
                name: { en: nameEn, si: nameSi },
                description: { en: descriptionEn, si: descriptionSi },
                time,
                images: imagePaths // Store image paths in the doctor object
            };

            // Save doctor to database
            const ayurvedicDoctor = await AyurvedicDoctor.create(newAyurvedicDoctor);

            // Return success response
            return res.status(201).json(ayurvedicDoctor);
        });
    } catch (error) {
        console.error(error.message);
        res.status(500).json({ message: 'Internal server error', error: error.message });
    }
};




// // Update an Ayurvedic product by ID
// export const updateAyurvedicProduct = async (request, response) => {
//     try {
//         const { id } = request.params;

//         const ayurvedicDoctor = await AyurvedicDoctor.findById(id);

//         if (!ayurvedicDoctor) {
//             return response.status(404).json({ message: "Ayurvedic product not found" });
//         }

//         ayurvedicDoctor.productItemID = request.body.productItemID || ayurvedicDoctor.productItemID;
//         ayurvedicDoctor.itemName = request.body.itemName || ayurvedicDoctor.itemName;
//         ayurvedicDoctor.price = request.body.price || ayurvedicDoctor.price;
//         ayurvedicDoctor.availability = request.body.availability || ayurvedicDoctor.availability;
//         ayurvedicDoctor.description = request.body.description || ayurvedicDoctor.description;
//         ayurvedicDoctor.quantity = request.body.quantity || ayurvedicDoctor.quantity;
//         ayurvedicDoctor.productDetails = request.body.productDetails || ayurvedicDoctor.productDetails;
//         ayurvedicDoctor.category = request.body.category || ayurvedicDoctor.category;

//         await ayurvedicDoctor.save();

//         return response.status(200).json({ message: "Ayurvedic product updated successfully", ayurvedicDoctor });
//     } catch (error) {
//         console.log(error.message);
//         response.status(500).json({ message: "Internal Server Error" });
//     }
// };



export const getAllAyurvedicDoctor = async (req, res) => {
    try {
        // Fetch all Ayurvedic products from the database
        const ayurvedicDoctor = await AyurvedicDoctor.find();

        // Modify each product to include full image paths
        const doctorsWithImages = ayurvedicDoctor.map(doctor => {
            // Map each image filename to its full URL path
            const imagePaths = doctor.images.map(filename => filename.slice(1));
            
            // Return product object with updated image paths
            return {
                ...doctor.toObject(),
                images: imagePaths
            };
        });

        // Return the modified products with image paths
        return res.status(200).json({
            count: doctorsWithImages.length,
            data: doctorsWithImages
        });
    } catch (error) {
        console.error(error.message);
        res.status(500).json({ message: 'Internal server error', error: error.message });
    }
};
// Get an Ayurvedic product by ID
export const getAyurvedicDoctorById = async (request, response) => {
    try {
        const { id } = request.params;
        const ayurvedicDoctor = await AyurvedicDoctor.findById(id);
        return response.status(200).json(ayurvedicDoctor);
    } catch (error) {
        console.log(error.message);
        response.status(500).send({ message: error.message });
    }
};

//Delete an Ayurvedic product by ID
export const deleteAyurvedicDoctor = async (request, response) => {
    try {
        const { id } = request.params;
        const isAyurvedicDoctor = await AyurvedicDoctor.findByIdAndDelete(id);

        if (!isAyurvedicDoctor) {
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
        const ayurvedicDoctor = await AyurvedicDoctor.findById(id);

        if (!ayurvedicDoctor) {
            return response.status(404).json({ message: "Ayurvedic doctor not found" });
        }

        // Extract relevant details
        const doctorDetails = {
            doctorID: ayurvedicDoctor.doctorID,
            name: ayurvedicDoctor.name.si,
            description: ayurvedicDoctor.description.si,
            time: ayurvedicDoctor.time,
            images: ayurvedicDoctor.images
        };

        return response.status(200).json(doctorDetails);
    } catch (error) {
        console.log(error.message);
        response.status(500).send({ message: error.message });
    }
};

export const getEnglishPart = async (request, response) => {
    try {
        const { id } = request.params;
        const ayurvedicDoctor = await AyurvedicDoctor.findById(id);

        if (!ayurvedicDoctor) {
            return response.status(404).json({ message: "Ayurvedic doctor not found" });
        }

        // Extract relevant details
        const doctorDetails = {
            doctorID: ayurvedicDoctor.doctorID,
            name: ayurvedicDoctor.name.en,
            description: ayurvedicDoctor.description.en,
            time: ayurvedicDoctor.time,
            images: ayurvedicDoctor.images
        };

        return response.status(200).json(doctorDetails);
    } catch (error) {
        console.log(error.message);
        response.status(500).send({ message: error.message });
    }
};



