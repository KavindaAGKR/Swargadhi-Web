import React, { useState } from 'react';
import { Container, Paper, Typography, TextField, Button, Snackbar, Alert, Stack, InputAdornment, IconButton, Grid } from '@mui/material';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';
import config from '../../../config';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import EmailRoundedIcon from '@mui/icons-material/EmailRounded';
import LockRoundedIcon from '@mui/icons-material/LockRounded';


const ResetPassword = () => {
    const navigate = useNavigate();
    const { token } = useParams();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');  // Updated to password
    const [snackbarOpen, setSnackbarOpen] = useState(false);
    const [snackMessage, setSnackMessage] = useState('');
    const [isSuccess, setIsSuccess] = useState(false);




    const [password2, setPw2] = useState('');


    const [errorPW, setErrorPW] = useState(false)
    const [errorPWMsg, setErrorPWMsg] = useState('')
    const [errorPW2, setErrorPW2] = useState(false)
    const [errorPW2Msg, setErrorPW2Msg] = useState('')
    const [showPassword, setShowPassword] = useState(false);
    const [showPassword2, setShowPassword2] = useState(false);

    const [emailError, setEmailError] = useState(false);
    const [errorEmailMsg, setEmailErrorMsg] = useState('');









    const handleResetPassword = async () => {


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

        const passwordType = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).+$/;
    if (!passwordType.test(password)) {
        setErrorPW(true);
        setErrorPWMsg('Password must contain atleast one capital letter, lowercase letter, and a number');
        return;
    }

        if (!password2) {
            setErrorPW2(true)
            setErrorPW2Msg('Enter the password here also!')
            return;
        }
        try {
            const response = await axios.post(`${config.baseURL}/api/user/resetpassword`, { token, password });  // Updated to password
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
        <Grid container 
        direction="column"
        alignItems="center"
        justifyContent="center"
        sx={{ minHeight: '100vh', width:{xs:'90%', sm:'80%', md:'70%'}, margin:'auto' }}
        
        >
            <Paper sx={{ borderRadius: '35px', padding: '50px 0', width: '100%' }} elevation={20}>
                <Stack direction='column' spacing={2} alignItems='center'>
                    <Typography variant='h4' color='success.main' >Reset Password</Typography>
                    {/* <TextField
                        placeholder='Enter your Email'
                        variant="standard"
                        margin="normal"
                        type='text'
                        required
                        style={{ width: '80%' }}
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    /> */}
                    <Typography variant='body' >Enter your email address to reset the password</Typography>
<TextField placeholder='Enter your Email' variant="standard"   type='text' required style={{width:'80%'}}
                    value={email}
                    onChange={(email)=>{setEmail(email.target.value); setEmailError(false)}}
                    error={emailError}
                    
                        helperText={emailError ? errorEmailMsg : ''}
                        InputProps={{
                            startAdornment: (
                              <InputAdornment position='start'>
                                <EmailRoundedIcon />
                              </InputAdornment>
                            ),
                          }}
                      
                />


<TextField placeholder='Enter New Password' variant="standard"  margin="normal" 
                type={showPassword ? 'text' : 'password'}
                required style={{width:'80%'}}
                  value={password}
                  onChange={(pw)=>{setPassword(pw.target.value); setErrorPW(false)}}
                      error = {errorPW}
                      helperText={errorPW ? errorPWMsg : ''}
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
                <TextField placeholder='Re Enter Password' variant="standard"  margin="normal"
                 type={showPassword2 ? 'text' : 'password'}
                 required style={{width:'80%', marginBottom:'25px'}}
                    value={password2}
                    onChange={(pw2)=>{setPw2(pw2.target.value); setErrorPW2(false)}}
                    error={errorPW2}
                                helperText={errorPW2 ? errorPW2Msg : ''}
                    InputProps={{
                        startAdornment: (
                            <InputAdornment position='start'>
                                <LockRoundedIcon />
                            </InputAdornment>
                        ),
                      
                      endAdornment: password2 ? (
                          <InputAdornment position="end">
                              <IconButton
                                  
                                  onClick={()=>setShowPassword2(!showPassword2)}
                                  
                              >
                                  {showPassword2 ? <VisibilityOff /> : <Visibility />}
                              </IconButton>
                          </InputAdornment>
                      ) : null,
                  }}
                      
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
        </Grid>
    );
};

export default ResetPassword;
