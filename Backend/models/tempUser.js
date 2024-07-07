
import mongoose from "mongoose";
const temporaryUserSchema = new mongoose.Schema({
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    otp: { type: String, required: true },
    otpExpires: { type: Date, required: true }
});

export const TemporaryUser = mongoose.model("TemporaryUser", temporaryUserSchema);