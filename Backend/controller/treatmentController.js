
import multer from 'multer';
import upload from '../middleWare/fileUpload.js';
import AyurvedicTreatment from "../models/treatmentModel.js";
export const createAyurvedicTreatment = async (req, res) => {
    try {
        upload(req, res, async (err) => {
            if (err instanceof multer.MulterError) {
                return res.status(400).json({ message: 'Error uploading files', error: err });
            } else if (err) {
                return res.status(500).json({ message: 'Error uploading files', error: err });
            }
            const imagePaths = req.files.map(file => '/public/item/' + file.filename);
            const { treatmentNameEn, treatmentNameSi, price, descriptionEn, descriptionSi } = req.body;
            if (!treatmentNameEn || !treatmentNameSi || !price || !descriptionEn || !descriptionSi) {
                return res.status(400).json({ message: 'Please send all required fields' });
            }
            const newAyurvedicTreatment = {
                treatmentName: { en: treatmentNameEn, si: treatmentNameSi },
                price,
                description: { en: descriptionEn, si: descriptionSi },
                images: imagePaths 
            };
            const ayurvedicTreatment = await AyurvedicTreatment.create(newAyurvedicTreatment);
            return res.status(201).json(ayurvedicTreatment);
        });
    } catch (error) {
        console.error(error.message);
        res.status(500).json({ message: 'Internal server error', error: error.message });
    }
};


export const getAllAyurvedicTreatments = async (req, res) => {
    try {
        const ayurvedicTreatments = await AyurvedicTreatment.find();
        const treatmentsWithImages = ayurvedicTreatments.map(treatment => {
            const imagePaths = treatment.images.map(filename => filename.slice(1));
            return {
                ...treatment.toObject(),
                images: imagePaths
            };
        });
        return res.status(200).json({
            count: treatmentsWithImages.length,
            data: treatmentsWithImages
        });
    } catch (error) {
        console.error(error.message);
        res.status(500).json({ message: 'Internal server error', error: error.message });
    }
};
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
export const getSinhalaPart = async (req, res) => {
    try {
        const { id } = req.params;
        const ayurvedicTreatment = await AyurvedicTreatment.findById(id);

        if (!ayurvedicTreatment) {
            return res.status(404).json({ message: "Ayurvedic treatment not found" });
        }
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
export const getEnglishPart = async (req, res) => {
    try {
        const { id } = req.params;
        const ayurvedicTreatment = await AyurvedicTreatment.findById(id);

        if (!ayurvedicTreatment) {
            return res.status(404).json({ message: "Ayurvedic treatment not found" });
        }
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
      upload(req, res, async (err) => {
        if (err instanceof multer.MulterError) {
          return res.status(400).json({ message: 'Error uploading files', error: err });
        } else if (err) {
          return res.status(500).json({ message: 'Error uploading files', error: err });
        }
        const existingTreatment = await AyurvedicTreatment.findById(id);
  
        if (!existingTreatment) {
          return res.status(404).json({ message: 'Ayurvedic treatment not found' });
        }
        existingTreatment.treatmentName = {
          en: req.body.treatmentNameEn,
          si: req.body.treatmentNameSi
        };
        existingTreatment.price = req.body.price;
        existingTreatment.description = {
          en: req.body.descriptionEn,
          si: req.body.descriptionSi
        };
        if (req.files && req.files.length > 0) {

          const newImagePaths = req.files.map((file) => `/public/item/${file.filename}`);
  
          const updatedImageIndex = req.body.updatedImageIndex;
          if (updatedImageIndex !== undefined && updatedImageIndex !== null && updatedImageIndex >= 0) {
         
            if (updatedImageIndex < existingTreatment.images.length) {
              existingTreatment.images[updatedImageIndex] = newImagePaths[0];
            }
          } else {
           
            existingTreatment.images = newImagePaths;
          }
        }
        const updatedTreatment = await existingTreatment.save();
        res.status(200).json({ message: 'Ayurvedic treatment updated successfully', updatedTreatment });
      });
    } catch (error) {
      console.error('Error updating treatment:', error);
      res.status(500).json({ message: 'Internal server error', error: error.message });
    }
  };


export const getAllEnglishTreatment = async (req, res) => {
    try {
        const allTreatments = await AyurvedicTreatment.find();

        const treatmentsDetails = allTreatments.map(treatment => {
            const treatmentNameEn = treatment.treatmentName.en || '';
            const treatmentNameSi = treatment.treatmentName.si || '';
            const descriptionEn = treatment.description.en || '';
            const images = treatment.images || [];

            return {
                treatmentName: treatmentNameEn,
                treatmentNameSi: treatmentNameSi,
                price: treatment.price,
                description: descriptionEn,
                images: images
            };
        });

        return res.status(200).json(treatmentsDetails);
    } catch (error) {
        console.error('Error fetching treatments:', error);
        return res.status(500).json({ message: 'Internal server error' });
    }
};
  
export const getAllSinhalaTreatment = async (req, res) => {
    try {
        const allTreatments = await AyurvedicTreatment.find();

        const treatmentsDetails = allTreatments.map(treatment => {
            const treatmentNameEn = treatment.treatmentName.en || '';
            const treatmentNameSi = treatment.treatmentName.si || '';
            const descriptionSi = treatment.description.si || '';
            const images = treatment.images || [];

            return {
                treatmentName: treatmentNameEn,
                treatmentNameSi: treatmentNameSi,
                price: treatment.price,
                description: descriptionSi,
                images: images
            };
        });

        return res.status(200).json(treatmentsDetails);
    } catch (error) {
        console.error('Error fetching treatments:', error);
        return res.status(500).json({ message: 'Internal server error' });
    }
};
  