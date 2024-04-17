
import React, { useState } from 'react';
import { Grid, Paper, Button, Typography, TextField, InputAdornment, FormControlLabel, Box, Checkbox, Stack, Alert } from '@mui/material';
import { makeStyles } from '@mui/styles';
import { useNavigate } from 'react-router-dom';
import signpng from '../Images/signupfinal.png';
import signback from '../Images/signback.png'
import logo from '../Images/logo.png'
import EmailRoundedIcon from '@mui/icons-material/EmailRounded';
import LockRoundedIcon from '@mui/icons-material/LockRounded';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import GoogleButton from 'react-google-button'
import Snackbar from '@mui/material/Snackbar';
import Cookies from 'js-cookie';
import axios from 'axios';



import { setUser, setToken } from '../redux/slices/userSlice';
import { useSelector, useDispatch } from 'react-redux';
// import { loginStart, loginSuccess, loginFailure } from '../redux/slices/authSlice'



const theme = createTheme();

const useStyles = makeStyles((theme) => ({
    imageContainer: {
        position: 'relative',
        width: '50%',
    },
    stackContainer: {
        width: '50%',
        margin: '50px 0px'
    },
    image: {
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        zIndex: 2,
    },
    image2: {
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        margin: '0 0 0 10px',
        zIndex: 1,
    },
    '@media (max-width: 600px)': {
        imageContainer: {
            display: 'none',
        },
        stackContainer: {
            width: '100%',
            margin: '25px'
        },
        paperContainer: {
            margin: '25px'
        },
    },
}));

export const Login = () => {
    
    const dispatch = useDispatch();
    



    const navigate = useNavigate();
    const classes = useStyles();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [rememberMe, setRememberMe] = useState(false);
    const [snackbarOpen, setSnackbarOpen] = useState(false); // State for controlling Snackbar visibility
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

    const emailType = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailType.test(email)) {
        setSnackMessage('Please enter a valid email address');
        setSnackbarOpen(true);
        return;
    }

    // Dispatch loginStart action to indicate the start of login process
    

    try {
        const response = await axios.post('http://localhost:5000/api/user/login', {
            email,
            password
        });

        if (response.data.alert) {
            

            dispatch(setUser(response.data.User));
            dispatch(setToken(response.data.token)); // Save token in Redux store

            localStorage.setItem('user', JSON.stringify(response.data.User));
            localStorage.setItem('token', response.data.token);
            
            setTimeout(() => {
                localStorage.removeItem('user');
                localStorage.removeItem('token');
              }, 3600000); // 3600000 milliseconds = 1 hour
            

        // localStorage.setItem('token', response.data.token); // Save token in local storage

            setSnackMessage("Successfully logged in");
            setSnackbarOpen(true);
            setIsLogin(true);

            
            // Cookies.set('jwt', response.data.token);
            console.log('Successfully authenticated as user');
            console.log('Token:', response.data.token);
            
        } else {
            
            

            setSnackMessage(response.data.message);
            setSnackbarOpen(true);
        }
    } catch (error) {
        console.error(error);

        

        setSnackMessage("Incorrect Email or Password");
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
                    <Paper sx={{
                        width: 'auto', margin: '50px', borderRadius: '35px',
                    }} elevation={20} className={classes.paperContainer}>

                        <Grid container>
                            <Stack className={classes.imageContainer} >
                                <img src={signpng} alt="The signup" className={classes.image} />
                                <img src={signback} alt="The signup" className={classes.image2} />
                            </Stack>

                            <Stack className={classes.stackContainer} justifyContent="center" alignItems="center" direction='column'  >

                                <img src={logo} alt="Swargadhi logo" style={{ width: '80%', margin: '0px 0 0 0' }} />
                                <Typography variant='h4' color='success' style={{ color: 'green' }} >Login</Typography>


                                <TextField
                                    placeholder='Email'
                                    variant="standard"
                                    margin="normal"
                                    type='text'
                                    required
                                    style={{ width: '80%' }}
                                    error={emailError}
                                    helperText={emailError ? 'Please enter a valid email address' : ''}
                                    value={email}
                                    onChange={(e) => { setEmail(e.target.value); setEmailError(false); }}
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
                                    style={{ width: '80%' }}
                                    value={password}
                                    onChange={(e) => { setPassword(e.target.value) }}
                                    InputProps={{
                                        startAdornment: (
                                            <InputAdornment position='start'>
                                                <LockRoundedIcon />
                                            </InputAdornment>
                                        ),
                                    }}
                                />
                                <Box>
                                    <FormControlLabel label='Remember Me'
                                        control={<Checkbox checked={rememberMe} onChange={() => setRememberMe(!rememberMe)} color='success' />}
                                    />
                                </Box>

                                <Button variant="contained" onClick={handleLogin} color='success'>Login</Button>
                                <Button variant='text' onClick={() => { navigate('/forgotpassword') }}>Forgot password?</Button>
                                <Typography variant='body'>Don't have an account?<Button variant='text' onClick={() => { navigate('/signup') }}>Sign Up</Button> </Typography>
                                <GoogleButton type="light"
                                    onClick={() => { console.log('Google button clicked') }}
                                />
                                <Snackbar
                                    open={snackbarOpen}
                                    autoHideDuration={3000}
                                    onClose={() => { setSnackbarOpen(false); if (isLogin) { navigate('/') } }}
                                    message={snackMessage}
                                    anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
                                    sx={{ marginTop: "100px" }}
                                >
                                    <Alert
                                        onClose={() => { setSnackbarOpen(false); if (isLogin) { navigate('/') } }}
                                        severity={isLogin ? "success" : "error"}
                                        variant="filled"
                                        sx={{ width: '100%' }}>
                                        {snackMessage}
                                    </Alert>
                                    </Snackbar>
                            </Stack>

                        </Grid>
                    </Paper>
                </Grid>
            </ThemeProvider>

        </div>
    )
}
