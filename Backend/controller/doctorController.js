import multer from 'multer';
import AyurvedicDoctor from "../models/doctorModel.js";
import upload from '../middleWare/fileUpload.js';
export const createAyurvedicDoctor = async (req, res) => {
    try {
       
        upload(req, res, async (err) => {
            if (err instanceof multer.MulterError) {
                return res.status(400).json({ message: 'Error uploading files', error: err });
            } else if (err) {
                return res.status(500).json({ message: 'Error uploading files', error: err });
            }
            const imagePaths = req.files.map(file => '/public/item/' + file.filename);
            const { doctorID, nameEn, nameSi, descriptionEn, descriptionSi, time } = req.body;
            if (!doctorID || !nameEn || !nameSi || !descriptionEn || !descriptionSi || !time) {
                return res.status(400).json({ message: 'Please send all required fields' });
            }
            const newAyurvedicDoctor = {
                doctorID,
                name: { en: nameEn, si: nameSi },
                description: { en: descriptionEn, si: descriptionSi },
                time,
                images: imagePaths 
            };
            const ayurvedicDoctor = await AyurvedicDoctor.create(newAyurvedicDoctor);
            return res.status(201).json(ayurvedicDoctor);
        });
    } catch (error) {
        console.error(error.message);
        res.status(500).json({ message: 'Internal server error', error: error.message });
    }
};

export const getAllAyurvedicDoctor = async (req, res) => {
    try {
        const ayurvedicDoctor = await AyurvedicDoctor.find();
        const doctorsWithImages = ayurvedicDoctor.map(doctor => {
            const imagePaths = doctor.images.map(filename => filename.slice(1));
            return {
                ...doctor.toObject(),
                images: imagePaths
            };
        });
        return res.status(200).json({
            count: doctorsWithImages.length,
            data: doctorsWithImages
        });
    } catch (error) {
        console.error(error.message);
        res.status(500).json({ message: 'Internal server error', error: error.message });
    }
};

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
      const updatedDoctor = await existingDoctor.save();
      res.status(200).json({ message: 'Ayurvedic doctor updated successfully', updatedDoctor }
    );
});
    } catch (error) {
      console.error('Error updating doctor:', error);
      res.status(500).json({ message: 'Internal server error', error: error.message });
    }
  };