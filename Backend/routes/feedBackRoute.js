// feedBackRoute.js
import express from 'express';
import * as feedBackController from '../controller/feedBackController.js';

const router = express.Router();

// Create Feedback
router.post('/', feedBackController.createFeedback);

// Get all Feedbacks
router.get('/', feedBackController.getAllFeedbacks);

// Get Feedback by ID
router.get('/:id', feedBackController.getFeedbackById);

// Update Feedback
router.put('/:id', feedBackController.editFeedback); // Rename to editFeedback

// Delete Feedback
router.delete('/:id', feedBackController.deleteFeedback);

export default router;
