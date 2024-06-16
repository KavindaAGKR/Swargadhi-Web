
import React, { useState } from 'react';
import { Grid, Paper, Button, Typography, TextField, InputAdornment, FormControlLabel, Box, Checkbox, Stack, Alert, Container, IconButton } from '@mui/material';
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



export const LoginSi = () => {
    
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
    const [showPassword, setShowPassword] = useState(true);
    // const [passwordError, setPasswordError] = useState(false);



    const handleLogin = async () => {
    

    const emailType = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    if (!emailType.test(email) || !email) {
        setEmailError(true)
        setEmailErrorMsg('වලංගු විද්යුත්-තැපැල් ලිපිනයක් ඇතුලත් කරන්න!')
        return;
    }
    
    if (!password) {
        setErrorPW(true)
        setErrorPWMsg('මුරපදය ඇතුළත් කරන්න!')
        return;
    }

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
            

            setSnackMessage("සාර්ථකව ලොග් විය");
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
        
    <Container justifyContent='center' sx={{display:'flex' ,margin:'25px auto', alignSelf:'center',}} >
                <Paper sx={{
                    borderRadius: '35px', height:'650px'
                }} elevation={20} >
                    <Stack direction='row' margin='auto' justifyContent='center' alignItems='center'>
                        <Stack  sx={{display:{xs:'none', sm:'flex'},position:'relative', width:'50%', height:'650px'}} >
                            <img style={{position:'relative',zIndex:'10', height:'100%', width:'95%', maxHeight:'100%'}} src={signpng} alt="The signup"  />
                            <img style={{position:'absolute', zIndex:'1',height:'100%',width:'100%',  maxHeight:'100%',  }} src={signback} alt="The signup"  />
                        </Stack>
                        <Stack sx={{width:{xs:'100%', sm:'50%'}, position:'relative', padding:'25px 0'}}  justifyContent="center" alignItems="center" direction='column' spacing={2} >
                        <Stack  width='100%' justifyContent='end' alignItems='end' onClick={()=>navigate('/')}>
                                <IconButton><CancelIcon/></IconButton>
                            </Stack>
                            <img src={logo} alt="Swargadhi logo" style={{ width: '80%', margin: '10px 0' }} />
                            <Typography variant='h5' color='success.main' >ලොග් වන්න</Typography>
                            <TextField
                                placeholder='විද්යුත්-තැපැල් ලිපිනය'
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
                                placeholder='මුරපදය'
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
                                <FormControlLabel label='මතකයේ තබා ගන්න'
                                    control={<Checkbox checked={rememberMe} onChange={() => setRememberMe(!rememberMe)} color='success' />}
                                />
                            </Box>
                            <Button variant="contained" onClick={handleLogin} color='success'>ලොග් වන්න</Button>
                            <Button variant='text' onClick={() => { navigate('/forgotpassword') }}>මුරපදය අමතකයි?</Button>
                            <Typography variant='body'>ගිණුමක් නැතිද?<Button variant='text' onClick={() => { navigate('/signup') }}>නව ගිණුමක් සකසන්න</Button> </Typography>
                            
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
                        </Stack>
                    </Stack>
                </Paper>


                </Container>
                </div>
    )
}
