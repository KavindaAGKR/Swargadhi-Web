
import React, { useState } from 'react';
import {  Paper, Button, Typography, TextField, InputAdornment, FormControlLabel, Box, Checkbox, Stack, Alert, Container, IconButton } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import signpng from '../../Images/signupfinal.png';
import signback from '../../Images/signback.png'
import logo from '../../Images/logo.png'
import EmailRoundedIcon from '@mui/icons-material/EmailRounded';
import LockRoundedIcon from '@mui/icons-material/LockRounded';
// import GoogleButton from 'react-google-button'
import Snackbar from '@mui/material/Snackbar';
import CancelIcon from '@mui/icons-material/Cancel';
import axios from 'axios';



import { setUser, setToken } from '../../redux/slices/userSlice';
import {  useDispatch } from 'react-redux';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import config from '../../config';
import ForgotPasswordDialog from '../Password/ForgotPasswordDialog';


//     '@media (max-width: 600px)': {

//         stackContainer: {
//             width: '100%',
//             margin: '25px'
//         },
//         paperContainer: {
            
//             width:'90%'
            
//         },
//     },
// }));

export const Login = () => {
    
    const dispatch = useDispatch();
    
    const navigate = useNavigate();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [rememberMe, setRememberMe] = useState(false);
    const [snackbarOpen, setSnackbarOpen] = useState(false); // State for controlling Snackbar visibility
    const [snackMessage, setSnackMessage] = useState('');
    const [isLogin, setIsLogin] = useState(false);
    const [emailError, setEmailError] = useState(false);
    const [errorEmailMsg, setEmailErrorMsg] = useState('');
    const [errorPW, setErrorPW] = useState(false)
    const [errorPWMsg, setErrorPWMsg] = useState('')
    const [showPassword, setShowPassword] = useState(false);
    const [forgotPasswordOpen, setForgotPasswordOpen] = useState(false);


    const handleLogin = async () => {
    

        const emailType = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\d{1,3}\.\d{1,3}\.\d{1,3}\.\d{1,3})|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        if (!emailType.test(email) || !email) {
        setEmailError(true)
        setEmailErrorMsg('Enter a valid email address!')
        return;
    }
    if (!password) {
        setErrorPW(true)
        setErrorPWMsg('Enter the password!')
        return;
    }


    try {
        const response = await axios.post(`${config.baseURL}/api/user/login`, {
            email,
            password
        });

        if (response.data.alert) {
            

            dispatch(setUser(response.data.User));
            dispatch(setToken(response.data.token)); // Save token in Redux store

            // localStorage.setItem('user', JSON.stringify(response.data.User));
            // localStorage.setItem('token', response.data.token);
            

            setSnackMessage("Successfully logged in");
            setSnackbarOpen(true);
            setIsLogin(true);

            
            // Cookies.set('jwt', response.data.token);
            console.log('Successfully authenticated as user');
            console.log('Token:', response.data.token);
            
        } else {
            
            

            setSnackMessage(response.data.message);
            
        }
    } catch (error) {
        console.error(error);

        

        setSnackMessage("Incorrect Email or Password");
        
    }
    setSnackbarOpen(true);
};


    return (
    
    <div>
        
    <Container justifyContent='center' sx={{display:'flex' ,margin:'25px auto', alignSelf:'center',}} >
                <Paper sx={{
                    borderRadius: '35px', height:'650px'
                }} elevation={20} >
                    <Stack direction='row' margin='auto' justifyContent='center' alignItems='center' >
                        <Stack  sx={{display:{xs:'none', sm:'flex'},position:'relative', width:'50%', height:'650px'}} >
                            <img style={{position:'relative',zIndex:'10', height:'100%', width:'95%', maxHeight:'100%'}} src={signpng} alt="The signup"  />
                            <img style={{position:'absolute', zIndex:'1',height:'100%',width:'100%',  maxHeight:'100%',  }} src={signback} alt="The signup"  />
                        </Stack>
                        <Stack sx={{width:{xs:'100%', sm:'50%'}, position:'relative', padding:'0p'}}  alignItems="center" direction='column' spacing={2} >
                            <Stack  width='100%' justifyContent='end' alignItems='end' sx={{paddingRight:'15px', pt:'15px'}} onClick={()=>navigate('/')}>
                                <IconButton><CancelIcon/></IconButton>
                            </Stack>
                            <img src={logo} alt="Swargadhi logo" style={{ width: '80%', margin: '10px 0' }} />
                            <Typography variant='h4' color='success.main' >Login</Typography>
                            <TextField
                                placeholder='Email'
                                variant="standard"
                                margin="normal"
                                type='text'
                                required
                                style={{ width: '80%' }}
                                error={emailError}
                                helperText={emailError ? errorEmailMsg : ''}
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
                                type={showPassword ? 'text' : 'password'}
                                required
                                error={errorPW}
                                helperText={errorPW ? errorPWMsg : ''}
                                style={{ width: '80%' }}
                                value={password}
                                onChange={(e) => { setPassword(e.target.value); setErrorPW(false); }}
                                InputProps={{
                                    startAdornment: (
                                        <InputAdornment position='start'>
                                            <LockRoundedIcon />
                                        </InputAdornment>
                                    ),
                                    endAdornment: password ? (
                                        <InputAdornment position="end">
                                            <IconButton
                                                
                                                onClick={()=>setShowPassword(!showPassword)}
                                                
                                            >
                                                {showPassword ? <VisibilityOff /> : <Visibility />}
                                            </IconButton>
                                        </InputAdornment>
                                    ) : null,
                                }}
                                
                            />
                            <Box>
                                <FormControlLabel label='Remember Me'
                                    control={<Checkbox checked={rememberMe} onChange={() => setRememberMe(!rememberMe)} color='success' />}
                                />
                            </Box>
                            <Button variant="contained" onClick={handleLogin} color='success'>Login</Button>
                            <Button variant='text' onClick={() => setForgotPasswordOpen(true)}>Forgot password?</Button>
                            <Typography variant='body'>Don't have an account?<Button variant='text' onClick={() => { navigate('/signup') }}>Sign Up</Button> </Typography>
                            
                            <Snackbar
                                open={snackbarOpen}
                                autoHideDuration={2000}
                                onClose={() => { setSnackbarOpen(false); if (isLogin) { navigate('/') } }}
                                anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
                                
                            >
                                <Alert
                                    onClose={() => { setSnackbarOpen(false); if (isLogin) { navigate('/') } }}
                                    severity={isLogin ? "success" : "error"}
                                    variant="filled"
                                    sx={{marginTop:'50px'}}
                                    >
                                    {snackMessage}
                                </Alert>
                                </Snackbar>
                                <ForgotPasswordDialog open={forgotPasswordOpen} onClose={() => setForgotPasswordOpen(false)} />
                        </Stack>
                    </Stack>
                </Paper>


                </Container>
                </div>
    )
}
