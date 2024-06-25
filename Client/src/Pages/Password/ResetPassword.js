import React, { useState } from 'react';
import { Container, Paper, Typography, TextField, Button, Snackbar, Alert, Stack } from '@mui/material';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';
import config from '../../config';

const ResetPassword = () => {
    const navigate = useNavigate();
    const { token } = useParams();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');  // Updated to password
    const [snackbarOpen, setSnackbarOpen] = useState(false);
    const [snackMessage, setSnackMessage] = useState('');
    const [isSuccess, setIsSuccess] = useState(false);

    const handleResetPassword = async () => {
        try {
            const response = await axios.post(`${config.baseURL}/api/user/reset-password`, { token, password });  // Updated to password
            setSnackMessage(response.data.message);
            setIsSuccess(response.data.alert);
            setSnackbarOpen(true);
            if (response.data.alert) {
                setTimeout(() => navigate('/login'), 2000);
            }
        } catch (error) {
            console.error(error);
            setSnackMessage('Error resetting password');
            setIsSuccess(false);
            setSnackbarOpen(true);
        }
    };

    return (
        <Container justifyContent='center' sx={{ display: 'flex', margin: '25px auto', alignSelf: 'center' }}>
            <Paper sx={{ borderRadius: '35px', padding: '25px', width: '100%' }} elevation={20}>
                <Stack direction='column' spacing={2} alignItems='center'>
                    <Typography variant='h4' color='success.main'>Reset Password</Typography>
                    <TextField
                        placeholder='Email'
                        variant="standard"
                        margin="normal"
                        type='text'
                        required
                        style={{ width: '80%' }}
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                    <TextField
                        placeholder='New Password'
                        variant="standard"
                        margin="normal"
                        type='password'
                        required
                        style={{ width: '80%' }}
                        value={password}  // Updated to password
                        onChange={(e) => setPassword(e.target.value)}  // Updated to password
                    />
                    <Button variant="contained" onClick={handleResetPassword} color='success'>Reset Password</Button>
                    <Snackbar
                        open={snackbarOpen}
                        autoHideDuration={2000}
                        onClose={() => setSnackbarOpen(false)}
                    >
                        <Alert
                            onClose={() => setSnackbarOpen(false)}
                            severity={isSuccess ? "success" : "error"}
                            variant="filled"
                        >
                            {snackMessage}
                        </Alert>
                    </Snackbar>
                </Stack>
            </Paper>
        </Container>
    );
};

export default ResetPassword;
