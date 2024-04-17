// treatmentController.js

import multer from 'multer';
import path from 'path';
import { v4 as uuidv4 } from 'uuid';
import AyurvedicTreatment from "../models/treatmentModel.js";

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

// Route handler to create a new Ayurvedic treatment with image upload
export const createAyurvedicTreatment = async (req, res) => {
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
            const { treatmentNameEn, treatmentNameSi, price, descriptionEn, descriptionSi } = req.body;
            if (!treatmentNameEn || !treatmentNameSi || !price || !descriptionEn || !descriptionSi) {
                return res.status(400).json({ message: 'Please send all required fields' });
            }

            // Create new Ayurvedic treatment
            const newAyurvedicTreatment = {
                treatmentName: { en: treatmentNameEn, si: treatmentNameSi },
                price,
                description: { en: descriptionEn, si: descriptionSi },
                images: imagePaths // Store image paths in the treatment object
            };

            // Save treatment to database
            const ayurvedicTreatment = await AyurvedicTreatment.create(newAyurvedicTreatment);

            // Return success response
            return res.status(201).json(ayurvedicTreatment);
        });
    } catch (error) {
        console.error(error.message);
        res.status(500).json({ message: 'Internal server error', error: error.message });
    }
};

// Fetch all Ayurvedic treatments from the database
export const getAllAyurvedicTreatments = async (req, res) => {
    try {
        const ayurvedicTreatments = await AyurvedicTreatment.find();

        // Modify each treatment to include full image paths
        const treatmentsWithImages = ayurvedicTreatments.map(treatment => {
            // Map each image filename to its full URL path
            const imagePaths = treatment.images.map(filename => filename.slice(1));
            
            // Return treatment object with updated image paths
            return {
                ...treatment.toObject(),
                images: imagePaths
            };
        });

        // Return the modified treatments with image paths
        return res.status(200).json({
            count: treatmentsWithImages.length,
            data: treatmentsWithImages
        });
    } catch (error) {
        console.error(error.message);
        res.status(500).json({ message: 'Internal server error', error: error.message });
    }
};

// Get an Ayurvedic treatment by ID
export const getAyurvedicTreatmentById = async (req, res) => {
    try {
        const { id } = req.params;
        const ayurvedicTreatment = await AyurvedicTreatment.findById(id);
        return res.status(200).json(ayurvedicTreatment);
    } catch (error) {
        console.log(error.message);
        res.status(500).send({ message: error.message });
    }
};

// Delete an Ayurvedic treatment by ID
export const deleteAyurvedicTreatment = async (req, res) => {
    try {
        const { id } = req.params;
        const isDeleted = await AyurvedicTreatment.findByIdAndDelete(id);

        if (!isDeleted) {
            return res.status(404).json({ message: "Treatment not found" });
        }

        return res.status(200).json({ message: "Success" });
    } catch (error) {
        console.log(error.message);
        res.status(500).send({ message: error.message });
    }
};

// Get Sinhala part of treatment by ID
export const getSinhalaPart = async (req, res) => {
    try {
        const { id } = req.params;
        const ayurvedicTreatment = await AyurvedicTreatment.findById(id);

        if (!ayurvedicTreatment) {
            return res.status(404).json({ message: "Ayurvedic treatment not found" });
        }

        // Extract relevant details
        const treatmentDetails = {
            treatmentName: ayurvedicTreatment.treatmentName.si,
            description: ayurvedicTreatment.description.si,
            price: ayurvedicTreatment.price,
            images: ayurvedicTreatment.images
        };

        return res.status(200).json(treatmentDetails);
    } catch (error) {
        console.error(error.message);
        res.status(500).json({ message: 'Internal server error', error: error.message });
    }
};

// Get English part of treatment by ID
export const getEnglishPart = async (req, res) => {
    try {
        const { id } = req.params;
        const ayurvedicTreatment = await AyurvedicTreatment.findById(id);

        if (!ayurvedicTreatment) {
            return res.status(404).json({ message: "Ayurvedic treatment not found" });
        }

        // Extract relevant details
        const treatmentDetails = {
            treatmentName: ayurvedicTreatment.treatmentName.en,
            description: ayurvedicTreatment.description.en,
            price: ayurvedicTreatment.price,
            images: ayurvedicTreatment.images
        };

        return res.status(200).json(treatmentDetails);
    } catch (error) {
        console.error(error.message);
        res.status(500).json({ message: 'Internal server error', error: error.message });
    }
};
export const updateAyurvedicTreatment = async (req, res) => {
    try {
      const { id } = req.params;
  
      // Use `upload` middleware to handle file uploads
      upload(req, res, async (err) => {
        if (err instanceof multer.MulterError) {
          return res.status(400).json({ message: 'Error uploading files', error: err });
        } else if (err) {
          return res.status(500).json({ message: 'Error uploading files', error: err });
        }
  
        // Retrieve existing treatment from database
        const existingTreatment = await AyurvedicTreatment.findById(id);
  
        if (!existingTreatment) {
          return res.status(404).json({ message: 'Ayurvedic treatment not found' });
        }
  
        // Update treatment fields
        existingTreatment.treatmentName = {
          en: req.body.treatmentNameEn,
          si: req.body.treatmentNameSi
        };
        existingTreatment.price = req.body.price;
        existingTreatment.description = {
          en: req.body.descriptionEn,
          si: req.body.descriptionSi
        };
  
        // Handle updated images
        if (req.files && req.files.length > 0) {
          // Map uploaded files to new image paths
          const newImagePaths = req.files.map((file) => `/public/item/${file.filename}`);
  
          // Replace existing images or update specific image based on request
          const updatedImageIndex = req.body.updatedImageIndex;
          if (updatedImageIndex !== undefined && updatedImageIndex !== null && updatedImageIndex >= 0) {
            // Replace the image at the specified index
            if (updatedImageIndex < existingTreatment.images.length) {
              existingTreatment.images[updatedImageIndex] = newImagePaths[0];
            }
          } else {
            // Append new image paths to existing images
            existingTreatment.images = newImagePaths;
          }
        }
  
        // Save updated treatment to database
        const updatedTreatment = await existingTreatment.save();
  
        // Respond with updated treatment
        res.status(200).json({ message: 'Ayurvedic treatment updated successfully', updatedTreatment });
      });
    } catch (error) {
      console.error('Error updating treatment:', error);
      res.status(500).json({ message: 'Internal server error', error: error.message });
    }
  };