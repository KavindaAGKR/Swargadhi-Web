
import React, {useState} from 'react';
import { Grid, Paper, Button, Typography, TextField, InputAdornment,Stack,Snackbar, Alert, Container, IconButton } from '@mui/material';
import { makeStyles } from '@mui/styles'; 
import { useNavigate } from 'react-router-dom';
import signpng from '../../Images/signupfinal.png';
import signback from '../../Images/signback.png'
import logo from '../../Images/logo.png'
import AccountCircleRoundedIcon from '@mui/icons-material/AccountCircleRounded';
import EmailRoundedIcon from '@mui/icons-material/EmailRounded';
import LockRoundedIcon from '@mui/icons-material/LockRounded';
import CancelIcon from '@mui/icons-material/Cancel';
import axios from 'axios'; 
import { Visibility, VisibilityOff } from '@mui/icons-material';


export const Signup = () => {
    const navigate = useNavigate();


    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [password2, setPw2] = useState('');
    const [snackbarMessage, setSnackMessage] = useState('');
    const [snackBarOpen, setSnackBarOpen] = useState(false);
    const [issignedup, setisSignedup] = useState(false);
    const [emailError, setEmailError] = useState(false);
    const [errorEmailMsg, setEmailErrorMsg] = useState('');
    const [errorPW, setErrorPW] = useState(false)
    const [errorPWMsg, setErrorPWMsg] = useState('')
    const [errorPW2, setErrorPW2] = useState(false)
    const [errorPW2Msg, setErrorPW2Msg] = useState('')
    const [showPassword, setShowPassword] = useState(false);
    const [showPassword2, setShowPassword2] = useState(false);

    const handleSignUp = async () => {

        if (!firstName || !lastName || !email || !password || !password2) {
            setSnackMessage('All the fields are required');
            setSnackBarOpen(true);
            return;
        }

        const emailType = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

    if (!emailType.test(email) || !email) {
        setEmailError(true)
        setEmailErrorMsg('Enter a valid email address!')
        return;
    }
    const passwordType = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).+$/;
    if (!passwordType.test(password)) {
        setErrorPW(true);
        setErrorPWMsg('Password must contain atleast one capital letter, lowercase letter, and a number');
        return;
    }
        if (password !== password2) {
          setErrorPW2(true);
          setErrorPW(true);
            setErrorPW2Msg("Passwords do NOT match")
            setErrorPWMsg("Passwords do NOT match")
            return;
        }

        try {
            const response = await axios.post('http://localhost:5000/api/user/register', {
                firstName,
                lastName,
                email,
                password,
                password2
            });
            console.log(response.data.message);
            setSnackMessage("Successfully Signed Up");
            setisSignedup(true);
            
        } catch (error) {
            console.error(error);
            setSnackMessage("Invalid Inputs");
            
        }
        setSnackBarOpen(true);
    };

    return (

      <div>
        
      <Container justifyContent='center' sx={{display:'flex' ,margin:'20px auto', alignSelf:'center',}} >
      <Paper sx={{
                    borderRadius: '35px', height:'670px'
                }} elevation={20} >
            <Stack direction='row' margin='auto' justifyContent='center' >
            <Stack  sx={{display:{xs:'none', sm:'flex'},position:'relative', width:'50%', height:'670px'}} >
                  <img style={{position:'relative',zIndex:'10', height:'100%', width:'95%', maxHeight:'100%'}} src={signpng} alt="The signup"  />
                  <img style={{position:'absolute', zIndex:'1',height:'100%',width:'100%',  maxHeight:'100%',  }} src={signback} alt="The signup"  />
              </Stack>
            
              <Stack sx={{width:{xs:'100%', sm:'50%'}, position:'relative'}}  justifyContent="start" alignItems="center" direction='column' spacing={2} >
              <Stack  width='100%' justifyContent='end' alignItems='end' sx={{paddingRight:'15px', pt:'15px'}} onClick={()=>navigate('/')}>
                                <IconButton ><CancelIcon/></IconButton>
                            </Stack>      
                <img alt='Swargadhi' src={logo}  style={{width:'70%', margin:'0 0 0 0'}}/>
                <Typography variant='h4' color='success.main'>SignUp</Typography>
                <TextField placeholder='First Name' variant="standard"  margin="normal" required style={{width:'80%', marginTop:'20px'}}
                value={firstName}
                onChange={(e) => {setFirstName(e.target.value); console.log('name: ' + firstName)}}
                    InputProps={{
                        startAdornment: (
                          <InputAdornment position='start'>
                            <AccountCircleRoundedIcon />
                          </InputAdornment>
                        ),
                      }}
                />
                <TextField placeholder='Last Name' variant="standard"  margin="normal" required style={{width:'80%'}}
                value={lastName}
                onChange={(e) => {setLastName(e.target.value); console.log('name: ' + lastName)}}
                    InputProps={{
                        startAdornment: (
                          <InputAdornment position='start'>
                            <AccountCircleRoundedIcon />
                          </InputAdornment>
                        ),
                      }}
                />

                <TextField placeholder='Email' variant="standard"  margin="normal" type='text' required style={{width:'80%'}}
                    value={email}
                    onChange={(email)=>{setEmail(email.target.value); console.log('email: ' + email)}}
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
                <TextField placeholder='Password' variant="standard"  margin="normal" 
                type={showPassword ? 'text' : 'password'}
                required style={{width:'80%'}}
                  value={password}
                  onChange={(pw)=>{setPassword(pw.target.value); console.log('password: '+ password)}}
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
                    onChange={(pw2)=>{setPw2(pw2.target.value); console.log('Re entered password: ' + password2)}}
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

                <Button variant="contained" onClick={() => { handleSignUp()  }} color='success'>Sign up</Button>
                <Typography>Already have an account? <Button variant='text' onClick={()=>{navigate('/login')}}>Login</Button></Typography>
                <Snackbar
                                open={snackBarOpen}
                                autoHideDuration={3000}
                                onClose={() => { setSnackBarOpen(false); if (issignedup) { navigate('/login') } }}
                                // message={snackbarMessage}
                                anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
                                sx={{marginTop:"150px"}}
                                
                            >
                                <Alert
                                onClose={() => { setSnackBarOpen(false); if (issignedup) { navigate('/login') } }}
                                severity={issignedup ? "success" : "error"}
                                variant="filled"
                                >
                                
                                {snackbarMessage}
                                </Alert>

                            </Snackbar>
            
            
            </Stack>
            
            </Stack>
        </Paper>
        </Container>
        </div>
    );
};