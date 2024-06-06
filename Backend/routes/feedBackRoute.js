// feedBackRoute.js
import express from 'express';
import * as feedBackController from '../controller/feedBackController.js';

const router = express.Router();
router.post('/', feedBackController.createFeedback);
router.get('/get', feedBackController.getAllFeedback);
router.get('/:id', feedBackController.getFeedbackById);
router.put('/:id', feedBackController.editFeedback); 
router.delete('/:id', feedBackController.deleteFeedback);

router.get('/get',feedBackController.getUserItems);

export default router;
