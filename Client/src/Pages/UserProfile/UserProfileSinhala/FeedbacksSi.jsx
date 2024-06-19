import React, { useState } from 'react'
import { Button, Typography, TextField, Stack, Avatar, Grid, Snackbar, Alert } from '@mui/material';
import axios from 'axios';
import config from '../../../config';

export const FeedbacksSi = ({user}) => {
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
            const response = await axios.post(`${config.baseURL}/api/feedback/`, { givenBy: user._id, feedBack: feedback });
            setFeedback('');
            setSnackbarOpen(true);
            setSnackMessage("ඔබේ අදහස සාර්ථකව සුරකින ලදි")
            setError(false);

        } catch (error) {
            console.error('යම් කිසි දෝෂයක් ඇති විය', error);
            
        }
    };


  return (
    <Stack width='auto' sx={{margin:'0 15px'}}  justifyContent='center'>
        <Typography variant="h5"mb='30px'  >අදහස් දක්වන්න</Typography>
        <Typography variant="body1" mb='20px'>අපගේ නිෂ්පාදන පිළිබද ඔබේ අත්දැකීම් අපට කියන්න!</Typography>
        
            <TextField
            sx={{width:{xs:'100%', md:'80%'}}}
                required
                error={error}
                helperText={error ? 'ඔබේ අදහසක් මෙහි ඇතුලත් කරන්න' : ''}
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
        
            <Snackbar
                open={snackbarOpen}
                autoHideDuration={5000}
                onClose={() => { setSnackbarOpen(false); }}
                anchorOrigin={{ vertical: 'bottom', horizontal: 'left' }}
                sx={{ marginTop: "50px", width: '100%' }}
            >
                <Alert
                    onClose={() => setSnackbarOpen(false)}
                    severity={snackMessage === "ඔබේ අදහස සාර්ථකව සුරකින ලදි" ? 'success' : 'error'}
                    variant="filled"
                >
                    {snackMessage}
                </Alert>
            </Snackbar>
    </Stack>
  )
}
