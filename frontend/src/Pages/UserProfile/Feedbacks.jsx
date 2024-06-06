import React, { useState } from 'react'
import { Button, Typography, TextField, Stack, Avatar, Grid } from '@mui/material';
import axios from 'axios';

export const Feedbacks = ({user}) => {
    const [feedback, setFeedback] = useState('');




    const handleSubmitFeedback = async (event) => {
        event.preventDefault();

        try {
            const response = await axios.post('http://localhost:5000/api/feedback/', { givenBy: user._id, feedBack: feedback });
            setFeedback('');


        } catch (error) {
            console.error('Error submitting feedback:', error);
        }
    };


  return (
    <Stack width='80%'>
                            <Typography variant="h5" gutterBottom>Feedback</Typography>
                            <Typography variant="body1" gutterBottom>Tell us about your experience with our products!</Typography>
                            <form  onSubmit={handleSubmitFeedback}>
                                <TextField
                                    label="Feedback"
                                    variant="outlined"
                                    multiline
                                    rows={4}
                                    value={feedback}
                                    onChange={(event) => setFeedback(event.target.value)}
                                />
                                <Button
                                    
                                    variant="contained"
                                    color="primary"
                                    type="submit"
                                    sx={{ width: '250px' }}
                                >
                                    Submit Feedback
                                </Button>
                            </form>
                        </Stack>
  )
}
