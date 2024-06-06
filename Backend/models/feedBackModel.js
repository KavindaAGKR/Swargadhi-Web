import mongoose from "mongoose";
const feedbackSchema = new mongoose.Schema({
    feedBack: {
        type: String,
        required: true,
    },
    givenBy:{
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required:true
      }
   
});

const Feedback = mongoose.model("Feedback", feedbackSchema);

export default Feedback
