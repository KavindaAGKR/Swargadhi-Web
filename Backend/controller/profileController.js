import multer from 'multer';
import path from 'path';
import { v4 as uuidv4 } from 'uuid';
import  Profile  from '../models/profileModel.js';
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
const upload = multer({
    storage: storage,
    fileFilter: fileFilter
}).array('images');

export const createOrUpdateProfile = async (req, res) => {
    try {
        upload(req, res, async (err) => {
            if (err instanceof multer.MulterError) {
                return res.status(400).json({ message: 'Error uploading files', error: err });
            } else if (err) {
                return res.status(500).json({ message: 'Error uploading files', error: err });
            }

            const { addressL1, addressL2, addressL3, mobileNumber, userId } = req.body;
            if (!userId || !mobileNumber || !addressL1 || !addressL2 || !addressL3) {
                return res.status(400).json({ message: 'Please provide all required fields' });
            }

            const imagePaths = req.files.map(file => '/public/item/' + file.filename);

            const profileData = {
                images: imagePaths,
                deliveryAddress: {
                    addressL1,
                    addressL2,
                    addressL3
                },
                mobileNumber,
                user: userId
            };

            let profile = await Profile.findOne({ user: userId });
            if (profile) {
                // Update existing profile
                profile = await Profile.findByIdAndUpdate(profile._id, profileData, { new: true });
            } else {
                // Create new profile
                profile = new Profile(profileData);
                await profile.save();
            }

            res.status(201).json(profile);
        });
    } catch (error) {
        console.error('Error creating/updating profile:', error);
        res.status(500).json({ message: 'Internal server error', error: error.message });
    }
};