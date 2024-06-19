import React, { useState } from 'react'
import { Button, Typography, TextField, Stack, Avatar, Grid, Snackbar, Alert } from '@mui/material';
import axios from 'axios';

export const Feedbacks = ({user}) => {
    const [feedback, setFeedback] = useState('');
    const [error, setError] = useState(false);
    const [snackbarOpen, setSnackbarOpen] = useState(false);
    const [snackMessage, setSnackMessage] = useState('');



    const handleSubmitFeedback = async (event) => {

        if(!feedback){
            setError(true);
        }


        event.preventDefault();

        try {
            const response = await axios.post('http://localhost:5000/api/feedback/', { givenBy: user._id, feedBack: feedback });
            setFeedback('');
            setSnackbarOpen(true);
            setSnackMessage("Feedback submitted")
            setError(false);


        } catch (error) {
            console.error('Error submitting feedback:', error);
        }
    };


  return (
    <Stack width='auto' sx={{margin:'0 15px'}}  justifyContent='center'>
        <Typography variant="h5"mb='30px'  >Feedback</Typography>
        <Typography variant="body1" mb='20px'>Tell us about your experience with our products!</Typography>
        
            <TextField
                sx={{width:{xs:'100%', md:'80%'}}}
                required
                error={error}
                helperText={error ? 'Type a feedback' : ''}
                label="Write your feedback here"
                variant="outlined"
                multiline
                rows={4}
                fullWidth
                value={feedback}
                onChange={(event) => setFeedback(event.target.value)}
            />
            <Button
                
                variant="contained"
                color="primary"
                type="submit"
                sx={{ width: '200px' , m:'25px 0px'}}
                onClick={handleSubmitFeedback}
            >
                Submit Feedback
            </Button>
        <Snackbar
                open={snackbarOpen}
                autoHideDuration={5000}
                onClose={() => { setSnackbarOpen(false); }}
                anchorOrigin={{ vertical: 'bottom', horizontal: 'left' }}
                sx={{ marginTop: "50px", width: '100%' }}
            >
                <Alert
                    onClose={() => setSnackbarOpen(false)}
                    severity={snackMessage === "Feedback submitted" ? 'success' : 'error'}
                    variant="filled"
                >
                    {snackMessage}
                </Alert>
            </Snackbar>
    </Stack>
  )
}
