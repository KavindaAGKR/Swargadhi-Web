// // 


// import supertest from 'supertest';
// import app  from '../index.js'

// import  Feedback  from '../models/feedBackModel.js'; // Import the Feedback model

// // Mocked feedback data
// const mockFeedback = {
//   _id: '123',
//   UserName: 'TestUser',
//   feedBack: 'Test feedback',
// };

// // Mock Feedback model methods
// jest.mock('../models/feedbackModel', () => ({
//   create: jest.fn(),
//   find: jest.fn(),
//   findById: jest.fn(),
//   findByIdAndUpdate: jest.fn(),
//   findByIdAndDelete: jest.fn(),
// }));

// // Test cases for feedback routes
// describe('Feedback Routes Testing', () => {
//   test('Create Feedback - Success', async () => {
//     // Mock Feedback.create method
//     Feedback.create.mockResolvedValueOnce(mockFeedback);

//     const response = await supertest(app)
//       .post('/feedback')
//       .send({ UserName: 'TestUser', feedBack: 'Test feedback' })
//       .expect(201);

//     expect(response.body.feedback).toEqual(mockFeedback);
//     expect(response.body.message).toBe('Feedback created successfully');
//     expect(response.body.alert).toBe('success');
//   });

//   test('Get all Feedbacks - Success', async () => {
//     // Mock Feedback.find method
//     Feedback.find.mockResolvedValueOnce([mockFeedback]);

//     const response = await supertest(app)
//       .get('/feedback/create')
//       .expect(200);

//     expect(response.body).toEqual([mockFeedback]);
//   });

//   test('Get Feedback by ID - Success', async () => {
//     // Mock Feedback.findById method
//     Feedback.findById.mockResolvedValueOnce(mockFeedback);

//     const response = await supertest(app)
//       .get('/feedback/123') // assuming 123 is a valid ID
//       .expect(200);

//     expect(response.body.feedback).toEqual(mockFeedback);
//     expect(response.body.message).toBe('Feedback found');
//     expect(response.body.alert).toBe(true);
//   });

//   test('Edit Feedback by ID - Success', async () => {
//     const updatedFeedback = { ...mockFeedback, feedBack: 'Updated feedback' };

//     // Mock Feedback.findByIdAndUpdate method
//     Feedback.findByIdAndUpdate.mockResolvedValueOnce(updatedFeedback);

//     const response = await supertest(app)
//       .put('/feedback/123') // assuming 123 is a valid ID
//       .send(updatedFeedback)
//       .expect(200);

//     expect(response.body.feedback).toEqual(updatedFeedback);
//     expect(response.body.message).toBe('Feedback updated successfully');
//     expect(response.body.alert).toBe(true);
//   });

//   test('Delete Feedback by ID - Success', async () => {
//     // Mock Feedback.findByIdAndDelete method
//     Feedback.findByIdAndDelete.mockResolvedValueOnce({});

//     const response = await supertest(app)
//       .delete('/feedback/123') // assuming 123 is a valid ID
//       .expect(200);

//     expect(response.body.message).toBe('Feedback deleted successfully');
//     expect(response.body.alert).toBe(true);
//   });

//   test('Get User Feedbacks - Success', async () => {
//     const userId = 'user123';

//     // Mock Feedback.find method to return user-specific feedback
//     Feedback.find.mockResolvedValueOnce([mockFeedback]);

//     const response = await supertest(app)
//       .get('/feedback/get')
//       .set('userId', userId)
//       .expect(200);

//     expect(response.body).toEqual([mockFeedback]);
//   });
// });
