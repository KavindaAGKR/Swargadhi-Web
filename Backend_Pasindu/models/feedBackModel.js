import mongoose from "mongoose";

// Declare the Schema of the Mongo model
const feedbackSchema = new mongoose.Schema({
    UserName: {
        type: String,
        required: true,
    },
   
    feedBack: {
        type: String,
        required: true,
    },
   
});

const Feedback = mongoose.model("Feedback", feedbackSchema);

export default Feedback
