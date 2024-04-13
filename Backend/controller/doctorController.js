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

// Update an Ayurvedic doctor by ID
export const editDoctor = async (req, res) => {
    try {
      const { id } = req.params;

      upload(req, res, async (err) => {
        if (err instanceof multer.MulterError) {
          return res.status(400).json({ message: 'Error uploading files', error: err });
        } else if (err) {
          return res.status(500).json({ message: 'Error uploading files', error: err });
        }
      const existingDoctor = await AyurvedicDoctor.findById(id);
  
      if (!existingDoctor) {
        return res.status(404).json({ message: 'Ayurvedic doctor not found' });
      }
  
      // Update doctor fields based on request body
      existingDoctor.doctorID = req.body.doctorID;
      existingDoctor.name = {
        en: req.body.nameEn,
        si: req.body.nameSi,
      };
      existingDoctor.description = {
        en: req.body.descriptionEn,
        si: req.body.descriptionSi,
      };
      existingDoctor.time = req.body.time;
  
      // Handle updated images
      if (req.files && req.files.length > 0) {
        const newImagePaths = req.files.map((file) => `/public/item/${file.filename}`);
        const updatedImageIndex = req.body.updatedImageIndex;
  
        if (updatedImageIndex !== undefined && updatedImageIndex !== null && updatedImageIndex >= 0) {
          if (updatedImageIndex < existingDoctor.images.length) {
            existingDoctor.images[updatedImageIndex] = newImagePaths[0];
          }
        } else {
          existingDoctor.images =newImagePaths;
        }
      }
  
      // Save updated doctor to the database
      const updatedDoctor = await existingDoctor.save();
  
      // Respond with updated doctor
      res.status(200).json({ message: 'Ayurvedic doctor updated successfully', updatedDoctor }
    );
});
    } catch (error) {
      console.error('Error updating doctor:', error);
      res.status(500).json({ message: 'Internal server error', error: error.message });
    }
  };