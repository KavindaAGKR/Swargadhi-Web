import React, { useState } from 'react'
import { Button, Typography, TextField, Stack, Avatar, Grid } from '@mui/material';
import axios from 'axios';

export const FeedbacksSi = ({user}) => {
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
    <Stack width='auto' sx={{margin:'0 15px'}}  justifyContent='center'>
        <Typography variant="h5"mb='30px'  >අදහස් දක්වන්න</Typography>
        <Typography variant="body1" mb='20px'>අපගේ නිෂ්පාදන පිළිබද ඔබේ අත්දැකීම් අපට කියන්න!</Typography>
        
            <TextField
            sx={{width:{xs:'100%', md:'80%'}}}
            
                label="ඔබේ අදහස් මෙහි ලියන්න"
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
                සුරකින්න
            </Button>
        
    </Stack>
  )
}
