import React, { useState } from 'react';
import { Grid, Paper, Button, Typography, TextField, InputAdornment, Stack, Alert } from '@mui/material';
import { makeStyles } from '@mui/styles';
import { useNavigate } from 'react-router-dom';
import logo from '../Images/logo.png'
import EmailRoundedIcon from '@mui/icons-material/EmailRounded';
import LockRoundedIcon from '@mui/icons-material/LockRounded';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import axios from 'axios';
import Snackbar from '@mui/material/Snackbar';
import Cookies from 'js-cookie'; 


const theme = createTheme();

const useStyles = makeStyles((theme) => ({
    stackContainer: {
        width: '80%',
        margin: '50px auto',
    },
    '@media (max-width: 600px)': {
        stackContainer: {
            width: '100%',
            margin: '50px auto'
        },
    },
}));

export const AdminLogin = () => {
    const navigate = useNavigate();
    const classes = useStyles();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [snackbarOpen, setSnackbarOpen] = useState(false); 
    const [snackMessage, setSnackMessage] = useState('');
    const [isLogin, setIsLogin] = useState(false);
    const [emailError, setEmailError] = useState(false);
    const [passwordError, setPasswordError] = useState(false);

    const handleLogin = async () => {
        if (!email || !password) {
            setSnackMessage('Both email and password are required');
            setSnackbarOpen(true);
            return;
        }

        const emailtype = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailtype.test(email)) {
            setSnackMessage('Please enter a valid email address');
            setSnackbarOpen(true);
            return;
        }

        try {
            const response = await axios.post('http://localhost:5000/api/admin/login', {
                email,
                password
            });

            if (response.data.alert) {
                setSnackMessage("Successfully logged in")
                setSnackbarOpen(true);
                setIsLogin(true)
                
                localStorage.setItem('userDetails', JSON.stringify(response.data.Admin));
                Cookies.set('jwt', response.data.token); 
                console.log('Successfully authenticated as admin');
                console.log('Token:', response.data.token); 

                setTimeout(() => {
                    localStorage.removeItem('userDetails');
                    
                }, 3600000);
            } else {
                setSnackMessage(response.data.message)
                setSnackbarOpen(true);
            }
        } catch (error) {
            console.error(error);
            setSnackMessage("Incorrect Email or Password")
            setSnackbarOpen(true);
        }
    };

    return (
        <div>
            <ThemeProvider theme={theme}>
                <Grid
                    container
                    justifyContent="center"
                    alignItems="center"
                    margin='auto'
                    style={{ minHeight: '100vh', maxWidth: '1200px', maxHeight: '80%' }}
                >
                    <Paper sx={{ width: '1200px', margin: '50px', borderRadius: '25px' }} elevation={20} className={classes.paperContainer}>
                        <Stack className={classes.stackContainer} justifyContent="center" alignItems="center" direction='column'  >
                            <img src={logo} alt="Swargadhi logo" style={{ width: '50%' }} />
                            <Typography variant='h5' color='success' style={{ color: 'green', margin: '25px' }} >Admin Login</Typography>
                            <TextField
                                placeholder='Email'
                                variant="standard"
                                margin="normal"
                                type='text'
                                required
                                error={emailError}
                                helperText={emailError ? 'Please enter a valid email address' : ''}
                                style={{ width: '80%' }}
                                value={email}
                                onChange={(e) => {
                                    setEmail(e.target.value);
                                    setEmailError(false);
                                }}
                                InputProps={{
                                    startAdornment: (
                                        <InputAdornment position='start'>
                                            <EmailRoundedIcon />
                                        </InputAdornment>
                                    ),
                                }}
                            />
                            <TextField
                                placeholder='Password'
                                variant="standard"
                                margin="normal"
                                type='password'
                                required
                                error={passwordError}
                                helperText={passwordError ? 'Please enter your password' : ''}
                                style={{ width: '80%', marginBottom: '50px' }}
                                value={password}
                                onChange={(e) => {
                                    setPassword(e.target.value);
                                    setPasswordError(false);
                                }}
                                InputProps={{
                                    startAdornment: (
                                        <InputAdornment position='start'>
                                            <LockRoundedIcon />
                                        </InputAdornment>
                                    ),
                                }}
                            />
                            <Button variant="contained" onClick={handleLogin} color='success'>Login</Button>
                            <Snackbar
                                open={snackbarOpen}
                                autoHideDuration={3000}
                                onClose={() => { setSnackbarOpen(false); if (isLogin) { navigate('/admin/home') } }}
                                message={snackMessage}
                                anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
                                sx={{marginTop:"100px"}}
                                
                            >
                                <Alert
                                    onClose={() => { setSnackbarOpen(false); if (isLogin) { navigate('/admin/home') } }}
                                    severity={isLogin ? "success" : "error"}
                                    variant="filled"
                                    sx={{ width: '100%'}}>
                                    {snackMessage}
                                </Alert>
                            </Snackbar>
                        </Stack>
                    </Paper>
                </Grid>
            </ThemeProvider>
        </div>
    );
};
