// feedBackController.js
import mongoose from 'mongoose';
import Feedback from '../models/feedBackModel.js';

// Create Feedback Controller
export const createFeedback = async (request, response) => {
    try {
        const { UserName, feedBack } = request.body;

        if (!UserName || !feedBack) {
            return response.status(400).json({
                message: 'Please provide UserName and feedBack',
                alert: 'error'
            });
        }

        const newFeedback = {
            UserName,
            feedBack,
        };

        const feedback = await Feedback.create(newFeedback);

        return response.status(201).json({
            feedback,
            message: 'Feedback created successfully',
            alert: 'success'
        });

    } catch (error) {
        console.error(error.message);
        response.status(500).json({ message: 'Internal Server Error', alert: 'error' });
    }
};

// Get all Feedbacks Controller
export const getAllFeedbacks = async (request, response) => {
    try {
        // Your implementation here
    } catch (error) {
        console.log(error.message);
        response.status(500).json({
            message: error.message,
            alert: false
        });
    }
};

// Get Feedback by ID Controller
export const getFeedbackById = async (request, response) => {
    try {
        const feedbackId = request.params.id;

        const feedback = await Feedback.findById(feedbackId);

        if (!feedback) {
            return response.status(404).json({
                message: 'Feedback not found',
                alert: false
            });
        }

        return response.status(200).json({
            feedback,
            message: 'Feedback found',
            alert: true
        });
    } catch (error) {
        console.log(error.message);
        response.status(500).json({
            message: error.message,
            alert: false
        });
    }
};

// Edit Feedback by ID Controller
export const editFeedback = async (request, response) => {
    try {
        const feedbackId = request.params.id;

        const updatedFeedback = await Feedback.findByIdAndUpdate(feedbackId, request.body, { new: true });

        if (!updatedFeedback) {
            return response.status(404).json({
                message: 'Feedback not found',
                alert: false
            });
        }

        return response.status(200).json({
            feedback: updatedFeedback,
            message: 'Feedback updated successfully',
            alert: true
        });
    } catch (error) {
        console.log(error.message);
        response.status(500).json({
            message: error.message,
            alert: false
        });
    }
};

// Delete Feedback by ID Controller
export const deleteFeedback = async (request, response) => {
    try {
        const feedbackId = request.params.id;

        const isFeedbackDeleted = await Feedback.findByIdAndDelete(feedbackId);

        if (!isFeedbackDeleted) {
            return response.status(404).json({
                message: 'Feedback not found',
                alert: false
            });
        }

        return response.status(200).json({
            message: 'Feedback deleted successfully',
            alert: true
        });
    } catch (error) {
        console.log(error.message);
        response.status(500).json({
            message: error.message,
            alert: false
        });
    }
};


export const getUserItems = async (req, res) => {
  try {
    const userId = req.userId; 
    const userItems = await Feedback.find({ user: userId });
    res.status(200).json(userItems);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};
